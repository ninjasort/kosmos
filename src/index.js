// import 'source-map-support/register'
import { resolve } from 'path'
import http from 'http'
import express from 'express'
import compression from 'compression'
import React from 'react'
import helmet from 'helmet'
import ReactHelmet from 'react-helmet'
import Reloader from './reloader'
import { Router, RouterContext, match, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import bodyParser from 'body-parser'
import cors from 'cors'
// import { serverWaitRender } from 'mobx-server-wait'
// import debug from 'utils/debug'
// import { Provider } from 'mobx-react'
// import omit from 'lodash/omit'
import color from 'cli-color'
import hpp from 'hpp'

import configureStore from './redux/store'

// const history = syncHistoryWithStore(browserHistory, store)

//=========================================================
//  ENVIRONMENT VARS
//---------------------------------------------------------
const NODE_ENV = process.env.NODE_ENV

const ENV_DEVELOPMENT = NODE_ENV === 'development'
const ENV_PRODUCTION = NODE_ENV === 'production'
const ENV_TEST = NODE_ENV === 'test'

const HOST = '0.0.0.0'
const PORT = process.env.PORT || 3000

export default class Kosmos {
  
  constructor(options) {
    this.options = options || {}
    this.app = express()
    this.reloader = options.hotReload ? new Reloader(options.basePath) : null
  }

  async bootstrap() {
    this.store = await configureStore(this.options.basePath)
    
    try {
      const getRoutes = require(resolve(this.options.basePath, './src/index')).default
      this.routes = getRoutes(this.store.getState)
    } catch (e) {
      console.log(e)
    }

    this.headers()
    this.security()
    this.useStatic()
    // this.useRouter()
    this.handleErrors()
  }

  get basePath() {
    return this.options.basePath
  }
  
  /**
   * Set header middleware
   */
  headers() {
    this.app.use(cors())
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}))
  }
  
  /**
   * Set security middleware
   */
  security() {
    // Hide all software information
    this.app.disable('x-powered-by')

    // Prevent HTTP Parameter pollution.
    this.app.use(hpp())

    // Content Security Policy
    this.app.use(helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'"],
        connectSrc: ["'self'", 'ws:'],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'none'"],
        frameSrc: ["'none'"],
      }
    }))
    this.app.use(helmet.xssFilter())
    this.app.use(helmet.frameguard('deny'))
    this.app.use(helmet.ieNoOpen())
    this.app.use(helmet.noSniff())
  }

  /**
   * Serve static assets using express.static middleware
   */
  useStatic() {
    try {
      const assets = resolve(this.options.basePath, './assets')
      this.app.use(compression())
      this.app.use(express.static(assets))
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Uses React Router with express middleware
   */
  useRouter() {
    // Route handler that rules them all!
    this.app.get('*', this.matchReactRouter.bind(this))
  }
  
  /**
   * Match react router
   */
  matchReactRouter(req, res, next) {
    match({ routes: (<Router>{this.routes}</Router>), location: req.url }, (err, redirect, props) => {

      // Sanity checks
      if (err) {
        return res.status(500).send(err.message)
      } else if (redirect) {
        return res.redirect(302, redirect.pathname + redirect.search)
      } else if (props.components.some(component => component === NotFound)) {
        res.status(404)
      }

      const root = (
        <Provider store={this.store.bind(this)}>
          <RouterContext {...props} />
        </Provider>
      )

      // Main render function
      const render = (html, state) => {
        const { meta, title, link } = ReactHelmet.rewind()
        res.send(
          `<!doctype html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              ${ENV_PRODUCTION ? '<link rel="stylesheet" type="text/css" href="/styles.css">' : ''}
              <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=es6"></script>
              <script src="/vendor.js" defer></script>
              <script src="/client.js" defer></script>
              <!-- CHUNK -->
              ${meta} ${title} ${link}
            </head>
            <body>
              <div id="root">${html}</div>
              <script>
                window.__INITIAL_STATE__ = '${state.replace(/\\/g, '\\\\')}'
              </script>
            </body>
          </html>`
        )
      }
    })
  }

  /**
   * Start express app to list on port
   * @param  {number} port
   */
  async listen(port) {

    await this.bootstrap()
  
    if (this.reloader) {
      await this.reloader.start()
    }

    // await new Promise((resolve, reject) => {
    //   this.app.listen(port, (err) => {
    //     if (err) {
    //       return reject(err)
    //     }
    //     resolve()
    //   })
    // })
  }

  handleErrors() {
    this.app.use((err, req, res) => {
      console.error(err.stack)
      res.send(500, { message: err.message })
    })
  }

}


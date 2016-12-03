// import 'source-map-support/register'
import { resolve } from 'path'
import http from 'http'
import express from 'express'
import compression from 'compression'
import React from 'react'
import helmet from 'helmet'
import ReactHelmet from 'react-helmet'
import Reloader from './reloader'
import { Router, RouterContext, match } from 'react-router'
import bodyParser from 'body-parser'
import cors from 'cors'
// import { serverWaitRender } from 'mobx-server-wait'
// import debug from 'utils/debug'
// import { Provider } from 'mobx-react'
// import omit from 'lodash/omit'
import color from 'cli-color'
import hpp from 'hpp'

// Local imports
// import routes, { NotFound } from './routes'
// import Store from './store'

//=========================================================
//  ENVIRONMENT VARS
//---------------------------------------------------------
const NODE_ENV = process.env.NODE_ENV

const ENV_DEVELOPMENT = NODE_ENV === 'development'
const ENV_PRODUCTION = NODE_ENV === 'production'
const ENV_TEST = NODE_ENV === 'test'

const HOST = '0.0.0.0'
const PORT = 3000

// Ground work
// const port = (parseInt(process.env.PORT, 10) || 3000) - !ENV_PRODUCTION
// const debugsw = (...args) => debug(color.yellow('server-wait'), ...args)

export default class Kosmos {
  
  constructor(options) {
    this.options = options || {}
    this.app = express()
    this.reloader = options.hotReload ? new Reloader(options.basePath) : null

    // this.headers()
    // this.security()
    // this.useStatic()
    // this.useRouter()
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
    this.app.get('*', (req, res, next) => {
      res.send('It works!')
      // res.set('content-type', 'text/html')
      // Start writing output
      // res.write(
      // `
      // <!doctype html>
      // <html>
      //   <head>
      //     <meta charset="utf-8">
      //     <meta name="viewport" content="width=device-width, initial-scale=1">
      //     ${ENV_PRODUCTION ? '<link rel="stylesheet" type="text/css" href="/styles.css">' : ''}
      //     <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=es6"></script>
      //     <script src="/vendor.js" defer></script>
      //     <script src="/client.js" defer></script>
      //     <!-- CHUNK -->
      // `)
      // res.flush()
      // Some debugging info
      // debug(color.cyan('http'), '%s - %s %s', req.ip, req.method, req.url)
    })
  }
  
  /**
   * Match react router
   */
  matchReactRouter() {
    // Do a router match
    match({
      routes: (<Router>{routes}</Router>),
      location: req.url,
    },
    (err, redirect, props) => {

      // Sanity checks
      if (err) {
        return res.status(500).send(err.message)
      } else if (redirect) {
        return res.redirect(302, redirect.pathname + redirect.search)
      } else if (props.components.some(component => component === NotFound)) {
        res.status(404)
      }

      // // Setup store and context for provider
      // const store = new Store()

      // // Add env variables
      // store.env = {
      //   NODE_ENV,
      // }

      // Setup the root but don't add $mobx as property to provider.
      // const root = (
      //   <Provider {...omit(store, k => (k !== '$mobx'))}>
      //     <RouterContext {...props} />
      //   </Provider>
      // )

      // Main render function
      // const render = (html, state) => {
      //   const { meta, title, link } = ReactHelmet.rewind()
      //   res.write(`${meta} ${title} ${link}
      //     </head>
      //     <body>
      //       <div id="root">${html}</div>
      //       <script>
      //         window.__INITIAL_STATE__ = '${state.replace(/\\/g, '\\\\')}'
      //       </script>
      //     </body>
      //   </html>`)
      //   res.end()
      // }

      // Render when all actions have completed their promises
      // const cancel = serverWaitRender({
      //   store,
      //   root,
      //   debug: debugsw,
      //   onError: next,
      //   render,
      // })

      // Cancel server rendering
      // req.on('close', cancel)
    })
  }

  /**
   * Start express app to list on port
   * @param  {number} port
   */
  async listen(port) {
  
    if (this.reloader) {
      await this.reloader.start()
    }

    await new Promise((resolve, reject) => {
      this.app.listen(port, (err) => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  }

}

// app.use((err, req, res, next) => {
//   res.end(`</head><body><h1>500 Server Error</h1><p>${err}</p></body></html>`)
//   next(err)
// })

// // Create HTTP Server
// const server = http.createServer(app)

// // Start
// const listener = server.listen(port, err => {
//   if (err) throw err
//   debug(color.cyan('http'), `🚀  started on port ${port}`)
// })

// export default listener
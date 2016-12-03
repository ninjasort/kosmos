import webpack from './webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

export default class Reload {
  constructor() {

  }
  
  async start() {
    await this.startMiddleware()
  }

  async startMiddleware() {
    const compiler = await webpack(this.dir, { hotReload: true, dev: this.dev })
  }

}
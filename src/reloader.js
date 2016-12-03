import webpack from './webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

export default class Reload {
  constructor(basePath) {
    this.basePath = basePath
    this.config = {}
    this.compiler = null
  }
  
  async start() {
    await this.startMiddleware()
  }

  async startMiddleware() {
    const { config, compiler } = await webpack(this.basePath, { hotReload: true, dev: this.dev })
    this.config = config
    this.compiler = compiler
  }

}
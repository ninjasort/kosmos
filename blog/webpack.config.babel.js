import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

var paths = [
  '/',
  '/about/'
];

export default {
  context: __dirname + '/src',
  entry: './index.js',
  output: {
    path: 'dist',
    publicPath: '',
    filename: 'app.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css?$/, loaders: [ 'style', 'raw' ] }
    ]
  },
  resolve: {
    root: ['src'],
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
  plugins: [
    new StaticSiteGeneratorPlugin('app.js', paths)
  ]
}

// ------------------------------------
// Plugins
// ------------------------------------
// webpackConfig.plugins = [
//   new webpack.DefinePlugin(config.globals),
//   new webpack.optimize.OccurrenceOrderPlugin(),
//   new webpack.optimize.DedupePlugin(),
//   new HtmlWebpackPlugin({
//     template: paths.client('index.html'),
//     hash: false,
//     favicon: paths.client('static/favicon.ico'),
//     filename: 'index.html',
//     inject: 'body',
//     minify: {
//       collapseWhitespace: true
//     }
//   })
// ]
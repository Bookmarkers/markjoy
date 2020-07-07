const isDev = process.env.NODE_ENV === 'development'
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
  // plugins: [
  //   new WorkboxWebpackPlugin.GenerateSW({
  //     swDest: './public/sw.js',
  //     modifyURLPrefix: {'./public': '.'},
  //     additionalManifestEntries: [
  //       {
  //         url: './index.html',
  //         revision: null
  //       },
  //       {
  //         url: './style.css',
  //         revision: null
  //       }
  //     ],
  //     clientsClaim: true,
  //     skipWaiting: true
  //   })
  // ]
}

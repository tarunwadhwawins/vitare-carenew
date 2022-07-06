// const webpack = require('webpack')
module.exports = {
  //Setting here public path for deployment
  publicPath: process.env.NODE_ENV === 'production'? '': '/',
  devServer: {
    port: 8081,
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        compilerOptions: {
          // treat any tag that starts with ion- as custom elements
          isCustomElement: tag => tag.startsWith('ion-')
        }
      }))
  },
  // configureWebpack: {
  //   plugins: [
  //     new webpack.optimize.LimitChunkCountPlugin({
  //       maxChunks: 1
  //     })
  //   ],
  // },
  // chainWebpack: 
  //   config => {
  //     config.optimization.delete('splitChunks')
  //   },
  filenameHashing: false,
}
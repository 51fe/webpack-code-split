const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}


// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
const port = process.env.port || process.env.npm_config_port || 8080 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  css: {
    loaderOptions: {
      scss: {
        // additionalData: `@import "~@/styles/variables.scss";`,
        prependData: `@import "~@/styles/variables.scss";`,
      }
    }
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector',
    'vue-baidu-map'
  ],
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: 'enterprise',
    resolve: {
      alias: {
        '@': resolve('src'),
      }
    },
    optimization: {
      splitChunks: {
        maxInitialRequests: 5,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
          },
          echarts: {
            name: 'echarts', // split elementUI into a single package
            priority: 30, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]echarts/, // in order to adapt to cnpm
            chunks: 'all'
          },
          elementUI: {
            name: 'element-ui', // split elementUI into a single package
            priority: 30, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
            chunks: 'all'
          },
          elementCSS: {
            test: resolve('./theme'), // can customize your rules,
            name: 'element-ui',
            chunks: 'all',
            priority: 5,
          }
        }
      }
    }
  }
}

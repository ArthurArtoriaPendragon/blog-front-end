module.exports = {
  css: undefined,
  lintOnSave: undefined,
  publicPath: process.env.NODE_ENV === 'production' ? '/blog-front-end/' : '/',
  outputDir: 'docs',
  assetsDir: undefined,
  runtimeCompiler: true,
  productionSourceMap: undefined,
  parallel: undefined,
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/', //对应自己的接口
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};

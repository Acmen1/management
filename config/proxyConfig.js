module.exports = {
  proxyList: {
    '/api': {
      target: 'http://47.97.110.121:8080',
      changeOrigin: true,
      pathRewrite: {'^/api': '' }
    }
  }
}

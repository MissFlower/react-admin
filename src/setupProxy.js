/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-19 10:28:23
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-23 11:22:36
 */
// https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually
// https://github.com/chimurai/http-proxy-middleware
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(createProxyMiddleware([process.env.REACT_APP_BASE_API], {
    target: 'http://www.web-jshtml.cn/api/react',
    changeOrigin: true,
    pathRewrite: {
      [`^${process.env.REACT_APP_BASE_API}`]: ''
    }
  })
  )
}

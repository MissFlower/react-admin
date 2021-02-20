/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-18 14:59:07
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-19 17:50:32
 */
const {
  override,
  adjustStyleLoaders,
  addWebpackAlias,
  fixBabelImports
} = require('customize-cra')
const path = require('path')

module.exports = {
  webpack: override(
    adjustStyleLoaders(rule => {
      if (rule.test.toString().includes('scss')) {
        rule.use.push({
          loader: require.resolve('sass-resources-loader'),
          options: {
            // 这里是你自己放公共scss变量的路径
            resources: path.resolve(__dirname, './src/styles/common.scss')
          }
        })
      }
    }),
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
      'src': path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
      assets: path.resolve(__dirname, 'src/assets')
    }),
    fixBabelImports('import', {
      libraryName: 'antd',
      style: true
    })
  )
}

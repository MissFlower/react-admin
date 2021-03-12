/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-03-10 10:45:50
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-10 10:45:51
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title || '质量数据平台'
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

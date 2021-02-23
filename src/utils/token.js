/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-23 11:16:22
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-23 11:16:31
 */
import Cookies from 'js-cookie'

export function getToken(name) {
  return Cookies.get(name)
}

export function setToken(name, value) {
  return Cookies.set(name, value)
}

export function removeToken(name) {
  return Cookies.remove(name)
}

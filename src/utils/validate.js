/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-19 13:36:59
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-22 10:46:19
 */
export const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{6,10}$/

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} password
 * @returns {Boolean}
 */
export function validPassword(password) {
  return passwordReg.test(password)
}

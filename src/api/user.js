/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-19 10:44:07
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-23 10:37:03
 */
import request from 'src/utils/request'

/**
 * 登录接口
 */
export function login(params) {
  return request.post('/login/', params)
}

/**
 * 获取验证码
 */
export function getVerifyCode(params) {
  return request.post('/getSms/', params)
}

/**
 * 注册接口
 */
export function register(params) {
  return request.post('/register/', params)
}

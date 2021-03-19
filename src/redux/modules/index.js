/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-03-18 17:43:27
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-19 15:35:08
 */
import { combineReducers } from 'redux-immutable'
import app from './app'
import user from './user'

const rootReducer = combineReducers({
  app,
  user
})

export default rootReducer

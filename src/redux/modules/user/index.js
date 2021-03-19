/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-03-19 14:51:36
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-19 16:35:58
 */
import Immutable from 'immutable'
import * as types from './types'
import { login } from 'src/api/user'
import { getToken, setToken } from 'src/utils/token'
import defaultSettings from 'src/settings'

const initialState = Immutable.fromJS({
  token: getToken(defaultSettings.TOKEN_NAME),
  name: ''
})

// action creators
const _setName = name => ({
  type: types.SET_TOKEN,
  payload: name
})
const _setToken = token => ({
  type: types.SET_TOKEN,
  payload: token
})

export const actions = {
  [types.LOGIN]: params => {
    return dispatch => {
      return new Promise((resolve, reject) => {
        login(params)
          .then(response => {
            const { username, token } = response
            dispatch(_setName(username))
            dispatch(_setToken(username))
            localStorage.setItem('name', username)
            setToken(defaultSettings.TOKEN_NAME, token)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TOKEN:
      return state.merge({
        token: action.payload.token
      })

    case types.SET_NAME:
      return state.merge({
        token: action.payload.name
      })

    default:
      return state
  }
}

export default reducer

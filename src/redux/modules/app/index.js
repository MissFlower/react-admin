/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-03-10 15:57:32
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-19 15:02:12
 */
import Immutable from 'immutable'
import * as types from './types'

const initialState = Immutable.fromJS({
  sideBar: {
    opened: JSON.parse(localStorage.getItem('collapsed')) ?? true
  },
  requestQuantity: 0,
  error: null
})

// action creators
export const actions = {
  [types.TOGGLE_SIDEBAR]: () => ({
    type: types.TOGGLE_SIDEBAR
  })
}

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_SIDEBAR:

      localStorage.setItem('collapsed', !state.getIn(['sideBar', 'opened']))
      return state.merge({
        sideBar: {
          opened: !state.getIn(['sideBar', 'opened'])
        }
      })
      // return state.merge({ requestQuantity: state.get('requestQuantity') + 1 })
    default:
      return state
  }
}

// selectors
export const getSideBarOpened = state => {
  return state.getIn(['app', 'sideBar', 'opened'])
}

// export const getRequestQuantity = state => {
//   return state.getIn(['app', 'requestQuantity'])
// }

export default reducer

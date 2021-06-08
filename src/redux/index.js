/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-03-10 15:56:10
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-19 11:27:21
 */
// applyMiddleware执行中间件
import { createStore, applyMiddleware, compose } from 'redux'
// 异步中间件 用于redux使用异步action
import thunk from 'redux-thunk'
import rootReducer from './modules'

let finalCreateStore

if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  finalCreateStore = compose(
    applyMiddleware(thunk),
    // Required! Enable Redux DevTools with the monitors you chose
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )(createStore)
} else {
  finalCreateStore = applyMiddleware(thunk)(createStore)
}
// console.log(finalCreateStore)

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState)

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./modules', () =>
      store.replaceReducer(require('./modules'))
    )
  }

  return store
}

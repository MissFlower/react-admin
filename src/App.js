/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-10-22 16:10:13
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-23 18:16:35
 */
import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'
// import logo from './logo.svg';

import Home from './views/Home/index'
import Login from './views/Login'

import PrivateRouter from 'src/components/PrivateRouter'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <PrivateRouter
            path="/index"
            exact
          />
        </Switch>
      </HashRouter>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App

/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-10-22 16:10:13
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-20 09:53:57
 */
import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'
// import logo from './logo.svg';

import Home from './views/Home/index'
import Login from './views/Login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route
              component={Home}
              exact
              path="/"
            />
            <Route
              component={Login}
              path="/login"
              exact
            />
          </Switch>
        </HashRouter>
      </div>
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

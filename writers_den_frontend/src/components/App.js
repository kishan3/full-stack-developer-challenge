import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css'
import Login from './Login'
import Signup from './Signup'
import Dashboard from './Dashboard'


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/dashboard" exact component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;

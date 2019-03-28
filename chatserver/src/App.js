import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import Button from './Components/Button/Button';
import UserList from './Components/UserList/UserList'

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/" component={Button} />
            <Route path="/user/:name" component={UserList} />
          </Switch>
        </Router>
    );
  }
}

export default App;

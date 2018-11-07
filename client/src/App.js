import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import AccountsScreen from './components/AccountsScreen';
import AccountScreen from './components/AccountScreen';
import NewAccountScreen from './components/NewAccountScreen';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={AccountsScreen} />
          <Route exact path="/accounts/new" component={NewAccountScreen} />
          <Route exact path="/accounts/:id" component={AccountScreen} />
        </Switch>
      </Router>
    );
  }
}

export default App;

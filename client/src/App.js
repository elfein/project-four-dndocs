import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import AccountsScreen from './components/AccountsScreen';
import AccountScreen from './components/AccountScreen';
import NewAccountScreen from './components/NewAccountScreen';
import NewCharacterScreen from './components/NewCharacterScreen';
import CharacterContainer from './components/CharacterContainer';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={AccountsScreen} />
          <Route exact path="/accounts/new" component={NewAccountScreen} />
          <Route exact path="/accounts/:id" component={AccountScreen} />
          <Route exact path="/accounts/:id/characters/new" component={NewCharacterScreen} />
          <Route exact path="/characters/:id" component={CharacterContainer} />
        </Switch>
      </Router>
    );
  }
}

export default App;

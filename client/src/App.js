import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import AccountsScreen from './components/AccountsScreen';
import AccountScreen from './components/AccountScreen';
import NewAccountScreen from './components/NewAccountScreen';
import NewCharacterScreen from './components/NewCharacterScreen';
import CharacterContainer from './components/CharacterContainer';
import EditAccountScreen from './components/EditAccountScreen';
import EditCharacterScreen from './components/EditCharacterScreen';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={AccountsScreen} />
          <Route exact path="/accounts/new" component={NewAccountScreen} />
          <Route exact path="/accounts/:id" component={AccountScreen} />
          <Route exact path="/accounts/:id/edit" component={EditAccountScreen} />
          <Route exact path="/accounts/:id/characters/new" component={NewCharacterScreen} />
          <Route exact path="/characters/:id" component={CharacterContainer} />
          <Route exact path="/characters/:id/edit" component={EditCharacterScreen} />
        </Switch>
      </Router>
    );
  }
}

export default App;

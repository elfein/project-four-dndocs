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
import styled from 'styled-components'
import HeroImage from './components/HeroImage';

const StyledDiv = styled.div`background: rgba(20,9,24,0.9);
color: rgb(255,255,255);
min-height: 100vh;
height: 100%;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
*:focus {outline:none}
a {
  color: rgb(230,230,230);
  text-decoration: none;
}
button {
  color: rgb(255,255,255);
  background: none;
  border: 1px solid #fff;
  border-radius: 20px;
}
h2 {
  margin: 0;
  text-transform: uppercase;
  font-weight: 800;
}
.container {
  background: rgba(20,9,24,0.9);
  background: linear-gradient(to bottom right, rgba(39,29,44,0.9), rgba(10,3,14,0.9));
  height: 100%;
  min-height: 90vh;
}
`

class App extends Component {
  render() {
    return (
      <StyledDiv>
        <HeroImage />
        <div className="container">
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
        </div>
      </StyledDiv>
    );
  }
}

export default App;

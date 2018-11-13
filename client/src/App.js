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

const StyledDiv = styled.div`
background: rgb(20,39,54);
color: rgb(255,240,210);
min-height: 100vh;
height: 100%;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
*:focus {outline:none}
body {
  cursor: pointer;
}
a {
  color: rgb(230,230,230);
  text-decoration: none;
}
button {
  color: rgba(20,9,24,0.9);
  background: rgb(150,189,114);
  border: none;
  padding: 3px 6px;
&:hover {
  opacity: 0.6;
}
}
h2 {
  margin: 0;
  text-transform: uppercase;
  font-weight: 800;
}
.container {
  background: rgb(40,65,74);
  height: 100%;
  min-height: 80vh;
  padding: 24px 0;
}

@media (min-device-width: 1000px) {
  max-width: 600px;
  margin: 0 auto;
}
`

class App extends Component {
  render() {
    return (
      <StyledDiv>
        <Router>
          <div>
            <HeroImage />
            <div className="container">
              <Switch>
                <Route exact path="/" component={AccountsScreen} />
                <Route exact path="/accounts/new" component={NewAccountScreen} />
                <Route exact path="/accounts/:id" component={AccountScreen} />
                <Route exact path="/accounts/:id/edit" component={EditAccountScreen} />
                <Route exact path="/accounts/:id/characters/new" component={NewCharacterScreen} />
                <Route exact path="/characters/:id" component={CharacterContainer} />
                <Route exact path="/characters/:id/edit" component={EditCharacterScreen} />
              </Switch>
            </div>
          </div>
        </Router>
      </StyledDiv>
    );
  }
}

export default App;

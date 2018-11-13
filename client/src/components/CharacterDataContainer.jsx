import React, { Component } from 'react'
import CharacterStatList from './CharacterStatList';
import CharacterItemContainer from './CharacterItemContainer';
import styled from 'styled-components'
import CharacterSpellContainer from './CharacterSpellContainer';

const StyledDiv = styled.div`
.form {
  background-color: rgba(255,255,255,0.5);
  [type~=text] {
    width: 95vw;
    padding: 12px 2vw;
  }
  textarea {
    width: 96vw;
    height: 100px;
  }
  p {
    padding: 6px 0;
  }
  select {
    background-color: #fff;
    border-radius: 0;
    margin: 0 3px;
    padding: 2px 0;
    border: none;
  }
  .cancel {
  background-color: rgb(215,190,140);
}
#delete-toggle {
  background-color: rgb(215,150,140);
}
button {
  margin: 0 0 3px 0;
}
.submit, .cancel, #delete-toggle {
  width: 100vw;
    text-align: left;
    text-transform: uppercase;
    font-weight: 600;
    padding: 9px 2vw;
    color: rgb(40,65,74);
    i {
      margin: 0;
    }
}
}
.selectors {
  margin: 30px 0 0 0;
  display: flex;
  justify-content: space-between;
  button {
    width: 32vw;
    background-color: rgb(215,190,120);
    text-transform: uppercase;
    font-weight: 600;
    padding: 12px;
  }
  .selected {
    background-color: rgb(185,120,140);
    opacity: 1;
  }
}
@media (min-device-width: 1000px) {
.submit, .cancel, #delete-toggle, select {
  max-width: 600px;
}
input {
  max-width: 540px;
}
textarea {
  max-width: 580px;
}
}
`

export default class CharacterDataContainer extends Component {
  state = {
    showStats: true,
    showItems: false,
    showSpells: false
  }

  showSkills = () => {
    this.setState({ showStats: true, showItems: false, showSpells: false })
  }

  showItems = () => {
    this.setState({ showStats: false, showItems: true, showSpells: false })
  }

  showSpells = () => {
    this.setState({ showStats: false, showItems: false, showSpells: true })
  }

  render() {
    const character = this.props.character
    return (
      <StyledDiv>
        <div className="selectors">
          <button className={this.state.showStats ? 'selected' : ''} onClick={this.showSkills}>Skills</button>
          <button className={this.state.showItems ? 'selected' : ''} onClick={this.showItems}>Inventory</button>
          <button className={this.state.showSpells ? 'selected' : ''} onClick={this.showSpells}>Spells</button>
        </div>

        {this.state.showStats ?
          <CharacterStatList
            getCharacter={this.props.getCharacter}
            character={character} /> : null}

        {this.state.showItems ?
          <CharacterItemContainer
            getCharacter={this.props.getCharacter}
            character={character}
          /> : null}

        {this.state.showSpells ?
          <CharacterSpellContainer
            getCharacter={this.props.getCharacter}
            character={character}
          /> : null}

      </StyledDiv>
    )
  }
}

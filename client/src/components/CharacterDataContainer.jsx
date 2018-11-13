import React, { Component } from 'react'
import CharacterStatList from './CharacterStatList';
import CharacterItemContainer from './CharacterItemContainer';
import styled from 'styled-components'
import CharacterSpellContainer from './CharacterSpellContainer';

const StyledDiv = styled.div`
.form {
  background-color: rgb(255,255,255);
  border: 1px solid black;
  textarea {
    width: 300px;
    height: 100px;
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
    background-color: rgb(185,120,90);
    opacity: 1;
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

import React, { Component } from 'react'
import CharacterStatList from './CharacterStatList';
import CharacterItemContainer from './CharacterItemContainer';
import styled from 'styled-components'

const StyledDiv = styled.div`
.form {
  background-color: rgb(255,255,255);
  border: 1px solid black;
  textarea {
    width: 300px;
    height: 100px;
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
          <button onClick={this.showSkills}>Skills</button>
          <button onClick={this.showItems}>Inventory</button>
          <button onClick={this.showSpells}>Spells</button>
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

        {this.state.showSpells ? 'spells' : null}
      </StyledDiv>
    )
  }
}

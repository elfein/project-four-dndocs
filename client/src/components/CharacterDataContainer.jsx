import React, { Component } from 'react'
import CharacterStatList from './CharacterStatList';
import CharacterItemContainer from './CharacterItemContainer';

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
      <div>
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
      </div>
    )
  }
}

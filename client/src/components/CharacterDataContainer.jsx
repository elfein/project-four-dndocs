import React, { Component } from 'react'
import CharacterStatList from './CharacterStatList';

export default class CharacterDataContainer extends Component {
    state = {
        showStats: true,
        showItems: false,
        showSpells: false
    }
  render() {
      const character = this.props.character
    return (
      <div>
        <div className="selectors">
            <button>Skills</button>
        </div>
        <CharacterStatList 
        getCharacter={this.props.getCharacter}
        character={character} />
      </div>
    )
  }
}

import React, { Component } from 'react'
import WeaponList from './WeaponList';
import ItemList from './ItemList';

export default class CharacterItemContainer extends Component {
  render() {
    return (
      <div>

        <p>Weapons</p>
        <WeaponList
          getCharacter={this.props.getCharacter}
          character={this.props.character}
        />

        <p>Items</p>
        <ItemList
          getCharacter={this.props.getCharacter}
          character={this.props.character}
        />

      </div>
    )
  }
}
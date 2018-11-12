import React, { Component } from 'react'
import WeaponList from './WeaponList';
import ItemList from './ItemList';
import styled from 'styled-components'

const StyledDiv = styled.div`

`

export default class CharacterItemContainer extends Component {
  render() {
    return (
      <StyledDiv>

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

      </StyledDiv>
    )
  }
}
import React, { Component } from 'react'
import WeaponList from './WeaponList';
import ItemList from './ItemList';
import styled from 'styled-components'

const StyledDiv = styled.div`
background-color: rgb(185,120,140);
color: rgb(20,39,54);
p {
  margin: 0;
  padding: 42px 0 3px 0;
  font-size: 27px;
  text-transform: uppercase;
}
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
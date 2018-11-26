import React, { Component } from 'react'
import WeaponList from './WeaponList';
import ItemList from './ItemList';
import styled from 'styled-components'
import Axios from 'axios';

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
  state = {
    apiEquipment: []
  }

  getApiEquipment = async () => {
    const apiEquipment = await Axios.get('http://cors-everywhere.herokuapp.com/http://www.dnd5eapi.co/api/equipment/')
    this.setState({ apiEquipment: apiEquipment.data.results })
  }

  componentDidMount = () => {
    this.getApiEquipment()
  }

  render() {
    return (
      <StyledDiv>

        <p>Weapons</p>
        <WeaponList
          apiEquipment={this.state.apiEquipment}
          getCharacter={this.props.getCharacter}
          character={this.props.character}
        />

        <p>Items</p>
        <ItemList
          apiEquipment={this.state.apiEquipment}
          getCharacter={this.props.getCharacter}
          character={this.props.character}
        />

      </StyledDiv>
    )
  }
}
import React, { Component } from 'react'
import axios from 'axios'
import WeaponInfoItem from './WeaponInfoItem';

export default class WeaponList extends Component {
    state = {
        weapons: []
    }

    getWeapons = async () => {
        const response = await axios.get(`/api/characters/${this.props.character.id}/weapons`)
        this.setState({ weapons: response.data })
    }

    componentDidMount = () => {
        this.getWeapons()
    }

  render() {

    let weaponList = []
    if (this.state.weapons[0]) {
      weaponList = this.state.weapons.map((weapon, i) => {
          return <WeaponInfoItem key={i} weapon={weapon} />
      })
    } else {
        weaponList = 'This character does not have any weapons yet.'
    }

    return (
      <div>
        {weaponList}
        <button>+</button>
      </div>
    )
  }
}

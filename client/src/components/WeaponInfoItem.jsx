import React, { Component } from 'react'

export default class WeaponInfoItem extends Component {
  render() {
      const weapon = this.props.weapon
    return (
      <div>
          <h3>{weapon.name}</h3>
          <div className='weapon-data'>
            <h4>{weapon.die_number}d{weapon.die_type} {weapon.damage_type}</h4>
          </div>
      </div>
    )
  }
}

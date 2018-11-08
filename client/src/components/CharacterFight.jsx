import React, { Component } from 'react'

export default class CharacterFight extends Component {
  render() {
    const character = this.props.character
    return (
      <div>
         <img src={this.props.classImg} alt='classpic' />
                <div>
                    <h3>Encounter #{this.props.encounter.id}</h3>
                    <span><h1>HP: {character.current_hp}</h1> / {character.max_hp} </span>
                </div>
                <button onClick={this.toggleModal}>End Fight</button>
      </div>
    )
  }
}

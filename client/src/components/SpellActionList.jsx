import React, { Component } from 'react'
import axios from 'axios'
import SpellActionItem from './SpellActionItem';

export default class SpellActionList extends Component {
  state = {
    spells: []
  }

  getSpells = async () => {
    const response = await axios.get(`/api/characters/${this.props.character.id}/spells`)
    const spells = response.data.filter((spell) => {
      return spell.attack
    })
    this.setState({ spells })
  }

  componentDidMount = () => {
    this.getSpells()
  }

  render() {
    let spellList = []
    if (this.state.spells[0]) {
      spellList = this.state.spells.map((spell, i) => {
        return <SpellActionItem
          key={i}
          spell={spell}
          character={this.props.character}
          getCharacter={this.props.getCharacter}
          getSpells={this.getSpells}
          encounter={this.props.encounter} />
      })
    } else {
      spellList = 'No spells yet.'
    }

    return (
      <div>
        {spellList}
      </div>
    )
  }
}

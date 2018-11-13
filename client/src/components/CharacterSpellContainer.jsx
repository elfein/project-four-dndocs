import React, { Component } from 'react'
import axios from 'axios'
import AttackSpellList from './AttackSpellList';
import OtherSpellList from './OtherSpellList';
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

export default class CharacterSpellContainer extends Component {
    state = {
        attackSpells: [],
        otherSpells: [],
        apiSpells: []
    }

    getSpells = async () => {
        const spells = await axios.get(`/api/characters/${this.props.character.id}/spells`)
        return spells.data
    }

    getApiSpells = async () => {
        const apiSpells = await axios.get('https://cors-everywhere.herokuapp.com/http://www.dnd5eapi.co/api/spells/')
        this.setState({ apiSpells: apiSpells.data.results })
    }

    sortSpells = (spells) => {
        let attackSpells = []
        let otherSpells = []
        if (spells[0]) {
            attackSpells = spells.filter((spell) => {
                return spell.attack
            })
            otherSpells = spells.filter((spell) => {
                return !spell.attack
            })
        }
        this.setState({ attackSpells, otherSpells })
    }

    setSpells = async () => {
        const spells = await this.getSpells()
        this.sortSpells(spells)
    }

    componentDidMount = () => {
        this.setSpells()
        this.getApiSpells()
    }

    render() {
        return (
            <StyledDiv>
                <p>Attacks</p>
                <AttackSpellList
                    setSpells={this.setSpells}
                    apiSpells={this.state.apiSpells}
                    attackSpells={this.state.attackSpells}
                    getCharacter={this.props.getCharacter}
                    character={this.props.character}
                />

                <p>Other Spells</p>
                <OtherSpellList
                    setSpells={this.setSpells}
                    apiSpells={this.state.apiSpells}
                    otherSpells={this.state.otherSpells}
                    getCharacter={this.props.getCharacter}
                    character={this.props.character}
                />
            </StyledDiv>
        )
    }
}

import React, { Component } from 'react'
import axios from 'axios'
import WeaponActionItem from './WeaponActionItem';


export default class WeaponActionList extends Component {
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
                return <WeaponActionItem 
                key={i}
                weapon={weapon}
                character={this.props.character}
                getCharacter={this.props.getCharacter}
                getWeapons={this.getWeapons}
                encounter={this.props.encounter} />
            })
        } else {
            weaponList = 'No weapons yet.'
        }

        return (
            <div>
                {weaponList}
            </div>
        )
    }
}

import React, { Component } from 'react'
import WeaponActionList from './WeaponActionList';
import SaveActionList from './SaveActionList';
import SpellActionList from './SpellActionList';

export default class ActionsContainer extends Component {
    state = {
        showWeapons: true,
        showSaves: false,
        showSpells: false
    }

    showWeapons = () => {
        this.setState({ showWeapons: true, showSaves: false, showSpells: false })
    }

    showSaves = () => {
        this.setState({ showWeapons: false, showSaves: true, showSpells: false })
    }

    showSpells = () => {
        this.setState({ showWeapons: false, showSaves: false, showSpells: true })
    }

    render() {
        return (
            <div>
                <button onClick={this.showWeapons}>Weapons</button>
                <button onClick={this.showSaves}>Saves</button>
                <button onClick={this.showSpells}>Spells</button>

                {this.state.showWeapons ?
                    <WeaponActionList
                        encounter={this.props.encounter}
                        getCharacter={this.props.getCharacter}
                        character={this.props.character}
                    />
                    : null}

                {this.state.showSaves ?
                    <SaveActionList
                        encounter={this.props.encounter}
                        getCharacter={this.props.getCharacter}
                        character={this.props.character}
                    />
                    : null}

                {this.state.showSpells ?
                    <SpellActionList
                        encounter={this.props.encounter}
                        getCharacter={this.props.getCharacter}
                        character={this.props.character}
                    />
                    : null}
            </div>
        )
    }
}

import React, { Component } from 'react'
import WeaponActionList from './WeaponActionList';
import SaveActionList from './SaveActionList';
import SpellActionList from './SpellActionList';
import styled from 'styled-components'

const StyledDiv = styled.div`
.selectors {
  margin: 30px 0 0 0;
  display: flex;
  justify-content: space-between;
  button {
    width: 32vw;
    background-color: rgb(215,190,120);
    text-transform: uppercase;
    font-weight: 600;
    padding: 12px;
  }
  .selected {
    background-color: rgb(185,120,140);
    opacity: 1;
  }
}
`

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
            <StyledDiv>
                <div className="selectors">
                    <button className={this.state.showWeapons ? 'selected' : ''} onClick={this.showWeapons}>Weapons</button>
                    <button className={this.state.showSaves ? 'selected' : ''} onClick={this.showSaves}>Saves</button>
                    <button className={this.state.showSpells ? 'selected' : ''} onClick={this.showSpells}>Spells</button>
                </div>

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
            </StyledDiv>
        )
    }
}

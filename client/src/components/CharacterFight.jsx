import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const StyledModalGroup = styled.div`
#overlay {
    z-index: 1000;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background-color: rgba(50,50,55,0.5);
  display: flex;
  opacity: 1;
  transform: scale(1) translate(-50%, -50%);
  transition: transform 0.2s ease, opacity 0.2s ease;
  &.hidden {
  opacity: 0;
  z-index: -1000;
  transform: scale(1) translate(-50%, -50%);
} 
}
#modal {
    button {
  margin: 10px 20px;
}
p {
  text-align: center;
}
#fight {
  color: red;
}
position: fixed;
top: 50%;
left: 50%;
transition: transform 0.2s ease, opacity 0.2s ease;
opacity: 100%;
z-index: 1010;
padding: 30px;
border-radius: 3px;
background: #fff;
transform: scale(1) translate(-50%, -50%);
width: 300px;
&.hidden {
  transition: transform 0.3s ease, opacity 0.2s ease;
  opacity: 0;
  z-index: -1000;
  transform: scale(0.96) translate(-50%, -46%);
} 
}
`

export default class CharacterFight extends Component {
    state = {
        showHealModal: false,
        showHitModal: false,
        newHpaction: {
            diff: '',
            diff_type: '',
            source: ''
        }
    }

    setDefaultHeal = () => {
        const newHpaction = { ...this.state.newHpaction }
        newHpaction.source = 'Spell'
        newHpaction.diff_type = 'Healing'
        this.setState({ newHpaction })
    }

    showHealModal = () => {
        this.setState({ showHealModal: !this.state.showHealModal })
        this.setDefaultHeal()
    }

    hideHealModal = () => {
        this.setState({
            showHealModal: false,
            newHpaction: {
                diff: '',
                diff_type: '',
                source: ''
            }
        })
    }

    handleChange = (event) => {
        const newHpaction = { ...this.state.newHpaction }
        newHpaction[event.target.name] = event.target.value
        this.setState({ newHpaction })
    }

    handleHealSubmit = async (event) => {
        event.preventDefault()
        const hpaction = await axios.post(`/api/encounters/${this.props.encounter.id}/hpactions`, this.state.newHpaction)
        await axios.put(`/api/characters/${this.props.character.id}`, {current_hp: (this.props.character.current_hp + hpaction.data.diff)})
        await this.props.getCharacter()
        this.setState({
            newHpaction: {
                diff: '',
                diff_type: '',
                source: ''
            },
            showHealModal: false
        })
    }

    render() {
        const character = this.props.character

        return (
            <div>
                <img src={this.props.classImg} alt='classpic' />
                <div>
                    <h3>Encounter #{this.props.encounter.id}</h3>
                    <button onClick={this.toggleModal}>End Fight</button>
                    <span><h1>HP: {character.current_hp}</h1> / {character.max_hp} </span>
                </div>
                <div>
                    <button onClick={this.showHealModal}>Heal</button>
                    <button onClick={this.showHitModal}>Take Hit</button>
                </div>

                <StyledModalGroup>
                    <div id='modal' className={this.state.showHealModal ? '' : 'hidden'}>
                        <div>
                            <span>+</span>
                            <input type='number' name='diff' value={this.state.newHpaction.diff} onChange={this.handleChange} />
                            <span>HP</span>
                        </div>
                        <div onChange={this.handleChange}>
                            <input type='radio' name='source' id='spellOption' value='Spell' defaultChecked /><label>Spell</label>
                            <input type='radio' name='source' id='potionOption' value='Potion' /><label>Potion</label>
                        </div>
                        <div>
                            <button onClick={this.hideHealModal}>Cancel</button>
                            <input type='submit' id='heal' value='Confirm' onClick={this.handleHealSubmit} />
                        </div>
                    </div>
                    <div id='overlay' onClick={this.hideHealModal} className={this.state.showHealModal ? '' : 'hidden'} ></div>
                </StyledModalGroup>

            </div>
        )
    }
}
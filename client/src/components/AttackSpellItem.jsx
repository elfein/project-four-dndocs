import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const StyledDiv = styled.div`
.hidden {
  display: none;
}
`

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
#delete {
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

export default class AttackSpellItem extends Component {
    state = {
        showMore: false,
        showEditForm: false,
        showDelete: false,
        updatedSpell: {
            name: '',
            description: '',
            damage_type: 'Acid',
            die_number: '',
            die_type: 4,
            prof: true,
            bonus: 0,
            skill: 'wis',
            attack: true
        },
        nameError: false,
        numberError: false
    }

    setSpell = () => {
        this.setState({ updatedSpell: this.props.spell })
    }

    componentDidMount = () => {
        this.setSpell()
    }

    showDelete = () => {
        this.setState({ showDelete: true })
    }

    hideDelete = () => {
        this.setState({ showDelete: false })
    }

    deleteSpell = async () => {
        await axios.delete(`/api/spells/${this.props.spell.id}`)
        this.hideDelete()
        this.hideEditForm()
        this.props.getCharacter()
        this.props.setSpells()
    }

    showEditForm = () => {
        this.setState({ showEditForm: true })
    }

    hideEditForm = () => {
        this.setState({ showEditForm: false })
    }

    handleChange = (event) => {
        const updatedSpell = { ...this.state.updatedSpell }
        updatedSpell[event.target.name] = event.target.value
        this.setState({ updatedSpell })
    }

    handleSubmit = async () => {
        if (this.state.updatedSpell.name
            && this.state.updatedSpell.die_number
            && this.state.updatedSpell.die_type
            && this.state.updatedSpell.damage_type) {
            this.setState({ nameError: false, numberError: false })
            await axios.put(`/api/spells/${this.props.spell.id}`, this.state.updatedSpell)
            await this.props.getCharacter()
            await this.props.setSpells()
            this.hideEditForm()
        } else if (!this.state.updatedSpell.name) {
            this.setState({ nameError: true })
        } else if (!this.state.updatedSpell.die_number) {
            this.setState({ nameError: false, numberError: true })
        }
    }

    toggleMore = () => {
        this.setState({ showMore: !this.state.showMore })
    }

    render() {
        const spell = this.props.spell
        return (
            <StyledDiv>
                <div onClick={this.toggleMore}>
                    <h3>{spell.name}</h3>
                    <span onClick={this.showEditForm}>edit</span>
                    <div className='spell-data'>
                        <h4>{spell.die_number}d{spell.die_type} {spell.damage_type}</h4>
                    </div>
                    <h6>{spell.description.length < 40 || this.state.showMore ? spell.description : spell.description.slice(0, 40) + '...'}</h6>
                </div>
                {this.state.showEditForm ?
                    <div className='form'>
                        <p>Edit {spell.name}</p>

                        <h5>Name</h5>
                        <input type='text'
                            autoFocus
                            name='name'
                            value={this.state.updatedSpell.name}
                            onChange={this.handleChange} />
                        <h6 className={this.state.nameError ? '' : 'hidden'} >Name cannot be empty.</h6>

                        <h5>Damage</h5>
                        <input
                            placeholder='# of dice'
                            type='number'
                            name='die_number'
                            value={this.state.updatedSpell.die_number}
                            onChange={this.handleChange} />
                        <select name='die_type' value={this.state.updatedSpell.die_type} onChange={this.handleChange}>
                            <option value={4} >d4</option>
                            <option value={6} >d6</option>
                            <option value={8} >d8</option>
                            <option value={10} >d10</option>
                            <option value={12} >d12</option>
                        </select>
                        <select name='damage_type' value={this.state.updatedSpell.damage_type} onChange={this.handleChange}>
                            <option value='Acid'>Acid</option>
                            <option value='Cold'>Cold</option>
                            <option value='Fire'>Fire</option>
                            <option value='Force'>Force</option>
                            <option value='Lightning'>Lightning</option>
                            <option value='Necrotic'>Necrotic</option>
                            <option value='Poison'>Poison</option>
                            <option value='Psychic'>Psychic</option>
                            <option value='Radiant'>Radiant</option>
                            <option value='Thunder'>Thunder</option>
                            <option value='Bludgeoning'>Bludgeoning</option>
                            <option value='Piercing'>Piercing</option>
                            <option value='Slashing'>Slashing</option>
                        </select>
                        <h6 className={this.state.numberError ? '' : 'hidden'} >Must have at least one die.</h6>

                        <h5>Skill</h5>
                        <select name='skill' value={this.state.updatedSpell.skill} onChange={this.handleChange}>
                            <option value='wis'>WIS</option>
                            <option value='int'>INT</option>
                            <option value='cha'>CHA</option>
                            <option value='str'>STR</option>
                            <option value='dex'>DEX</option>
                            <option value='con'>CON</option>
                        </select>

                        <h5>Description</h5>
                        <textarea
                            name='description'
                            value={this.state.updatedSpell.description}
                            onChange={this.handleChange} />

                        <div>
                            <button onClick={this.hideEditForm}>Cancel</button>
                            <button onClick={this.handleSubmit}>Save</button>
                        </div>

                        <div>
                            <button onClick={this.showDelete} >
                                Delete spell
                             </button>
                        </div>

                    </div>
                    : null}

                <StyledModalGroup>
                    <div id='modal' className={this.state.showDelete ? '' : 'hidden'}>
                        <p>Are you sure you want to delete this spell?</p>
                        <button onClick={this.hideDelete}>Cancel</button>
                        <button id='delete' onClick={this.deleteSpell} >Delete Spell</button>
                    </div>
                    <div id='overlay' onClick={this.hideDelete} className={this.state.showDelete ? '' : 'hidden'} ></div>
                </StyledModalGroup>
            </StyledDiv>
        )
    }
}

import React, { Component } from 'react'
import axios from 'axios'
import WeaponInfoItem from './WeaponInfoItem';
import styled from 'styled-components'

const StyledDiv = styled.div`
.hidden {
  display: none;
}
.add {
    width: 100vw;
    background: rgb(150,189,114);
    font-size: 18px;
    text-transform: uppercase;
    color: rgb(40,65,74);
    font-weight: 600;
    padding: 6px 0;
    text-align: left;
    border-bottom: 3px solid rgb(40,65,74);
    &:active, &:focus, &:hover {
        opacity: 1;
    }
}
`

export default class WeaponList extends Component {
    state = {
        weapons: [],
        newWeapon: {
            name: '',
            description: '',
            damage_type: 'Bludgeoning',
            die_number: '',
            die_type: 4,
            skill: 'str',
            prof: true,
            bonus: 0
        },
        showNewForm: false,
        nameError: false,
        numberError: false
    }

    getWeapons = async () => {
        const response = await axios.get(`/api/characters/${this.props.character.id}/weapons`)
        this.setState({ weapons: response.data })
    }

    componentDidMount = () => {
        this.getWeapons()
    }

    showNewForm = () => {
        this.setState({ showNewForm: true })
    }

    hideNewForm = () => {
        this.setState({ showNewForm: false })
        this.setState({
            newWeapon: {
                name: '',
                description: '',
                damage_type: 'Bludgeoning',
                die_number: '',
                die_type: 4,
                skill: 'str',
                prof: true,
                bonus: 0
            }
        })
    }

    handleChange = (event) => {
        const newWeapon = { ...this.state.newWeapon }
        newWeapon[event.target.name] = event.target.value
        this.setState({ newWeapon })
    }

    handleSubmit = async () => {
        if (this.state.newWeapon.name
            && this.state.newWeapon.die_number
            && this.state.newWeapon.die_type
            && this.state.newWeapon.damage_type) {
            this.setState({ nameError: false, numberError: false })
            await axios.post(`/api/characters/${this.props.character.id}/weapons`, this.state.newWeapon)
            await this.props.getCharacter()
            await this.getWeapons()
            this.hideNewForm()
        } else if (!this.state.newWeapon.name) {
            this.setState({ nameError: true })
        } else if (!this.state.newWeapon.die_number) {
            this.setState({ nameError: false, numberError: true })
        }
    }

    render() {

        let weaponList = []
        if (this.state.weapons[0]) {
            weaponList = this.state.weapons.map((weapon, i) => {
                return <WeaponInfoItem key={i}
                    weapon={weapon}
                    getCharacter={this.props.getCharacter}
                    getWeapons={this.getWeapons} />
            })
        } else {
            weaponList = 'No weapons yet!'
        }

        return (
            <StyledDiv>
                {weaponList}
                <div>
                    <button className='add' onClick={this.showNewForm}>+ Add Weapon</button>
                </div>
                {this.state.showNewForm ?
                    <div className='form'>
                        <p>Add New Weapon</p>

                        <h5>Name</h5>
                        <input type='text'
                            autoFocus
                            name='name'
                            value={this.state.newWeapon.name}
                            onChange={this.handleChange}
                            autoComplete='off' />
                        <h6 className={this.state.nameError ? '' : 'hidden'} >Name cannot be empty.</h6>

                        <h5>Damage</h5>
                        <input
                            placeholder='# of dice'
                            type='number'
                            name='die_number'
                            value={this.state.newWeapon.die_number}
                            onChange={this.handleChange} />
                        <select name='die_type' onChange={this.handleChange}>
                            <option value={4} >d4</option>
                            <option value={6} >d6</option>
                            <option value={8} >d8</option>
                            <option value={10} >d10</option>
                            <option value={12} >d12</option>
                        </select>
                        <select name='damage_type' onChange={this.handleChange}>
                            <option value='Bludgeoning'>Bludgeoning</option>
                            <option value='Piercing'>Piercing</option>
                            <option value='Slashing'>Slashing</option>
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
                        </select>
                        <h6 className={this.state.numberError ? '' : 'hidden'} >Must have at least one die.</h6>

                        <h5>Skill</h5>
                        <select name='skill' onChange={this.handleChange}>
                            <option value='str'>STR</option>
                            <option value='dex'>DEX</option>
                            <option value='con'>CON</option>
                            <option value='int'>INT</option>
                            <option value='wis'>WIS</option>
                            <option value='cha'>CHA</option>
                        </select>

                        <h5>Description</h5>
                        <input type='text'
                            name='description'
                            value={this.state.newWeapon.description}
                            onChange={this.handleChange} />

                        <div>
                            <button className='cancel' onClick={this.hideNewForm}><i className="fas fa-arrow-left"></i> Cancel</button>
                            <button className='submit' onClick={this.handleSubmit}><i className="far fa-check-square"></i> Add Weapon</button>
                        </div>

                    </div>
                    : null}
            </StyledDiv>
        )
    }
}

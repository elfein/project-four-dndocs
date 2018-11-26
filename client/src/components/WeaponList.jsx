import React, { Component } from 'react'
import axios from 'axios'
import WeaponInfoItem from './WeaponInfoItem';
import styled from 'styled-components'

const StyledDiv = styled.div`
.hidden {
  display: none;
}
#results {
    background-color: rgb(255,255,255);
    border: 1px solid rgba(0,0,0,0.5);
    width: 90%;
    margin: 0 auto;
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
@media (min-device-width: 1000px) {
.add {
  max-width: 600px;
}
}
`

export default class WeaponList extends Component {
    state = {
        possibleWeapons: [],
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
            },
            possibleWeapons: [],
            nameError: false,
            numberError: false
        })
    }

    nameSearch = (string) => {
        if (string) {
            const possibleWeapons = this.props.apiEquipment.filter((equipment) => {
                return equipment['name'].toLowerCase().includes(string.toLowerCase())
            })
            this.setState({ possibleWeapons })
        } else {
            this.setState({ possibleWeapons: [] })
        }
    }

    fillWeapon = async (weapon) => {
        const apiWeaponUrl = weapon['url']
        const apiWeaponData = await axios.get('https://cors-everywhere.herokuapp.com/' + apiWeaponUrl)
        const apiWeapon = apiWeaponData.data
        let desc = ''
        if (apiWeapon['category_range']) {
            desc = apiWeapon['category_range']
        }
        const newWeapon = {
            name: apiWeapon['name'],
            description: desc,
            damage_type: 'Bludgeoning',
            die_number: '',
            die_type: 4,
            skill: 'str',
            prof: true,
            bonus: 0
        }
        this.setState({ newWeapon, possibleWeapons: [] })
    }

    handleChange = (event) => {
        const newWeapon = { ...this.state.newWeapon }
        newWeapon[event.target.name] = event.target.value
        this.setState({ newWeapon })
        if (event.target.name === 'name') {
            this.nameSearch(event.target.value)
        }
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

        let possibleWeaponNames = []
        if (this.state.possibleWeapons[0]) {
            possibleWeaponNames = this.state.possibleWeapons.map((weapon, i) => {
                return <div className='search-result' 
                onClick={() => this.fillWeapon(weapon)}
                key={i}>{weapon['name']}
                </div>
            })
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
                        {this.state.possibleWeapons[0] ? <div id='results'>{possibleWeaponNames.slice(0, 5)}</div> : null}
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

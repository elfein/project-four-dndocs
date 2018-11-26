import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import AttackSpellItem from './AttackSpellItem';

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

export default class AttackSpellList extends Component {
    state = {
        possibleSpells: [],
        newAttackSpell: {
            name: '',
            description: '',
            damage_type: 'Acid',
            die_number: '',
            die_type: 4,
            skill: 'wis',
            prof: true,
            bonus: 0,
            attack: true
        },
        showNewForm: false,
        nameError: false,
        numberError: false
    }

    showNewForm = () => {
        this.setState({ showNewForm: true })
    }

    hideNewForm = () => {
        this.setState({ showNewForm: false })
        this.setState({
            newAttackSpell: {
                name: '',
                description: '',
                damage_type: 'Acid',
                die_number: '',
                die_type: 4,
                skill: 'wis',
                prof: true,
                bonus: 0,
                attack: true
            },
            possibleSpells: [],
            nameError: false, 
            numberError: false
        })
    }

    nameSearch = (string) => {
        if (string) {
            const possibleSpells = this.props.apiSpells.filter((spell) => {
                return spell['name'].toLowerCase().includes(string.toLowerCase())
            })
            this.setState({ possibleSpells })
        } else {
            this.setState({ possibleSpells: [] })
        }
    }

    fillSpell = async (name) => {
        const apiSpellUrl = await axios.get(`https://cors-everywhere.herokuapp.com/http://www.dnd5eapi.co/api/spells/?name=${name}`)
        const apiSpellData = await axios.get('https://cors-everywhere.herokuapp.com/' + apiSpellUrl.data.results[0]['url'])
        const apiSpell = apiSpellData.data
        const newAttackSpell = {
            name: apiSpell['name'],
            description: apiSpell['desc'].join("\n"),
            damage_type: 'Acid',
            die_number: '',
            die_type: 4,
            skill: 'wis',
            prof: true,
            bonus: 0,
            attack: true
        }
        this.setState({ newAttackSpell, possibleSpells: [] })
    }

    handleChange = (event) => {
        const newAttackSpell = { ...this.state.newAttackSpell }
        newAttackSpell[event.target.name] = event.target.value
        this.setState({ newAttackSpell })
        if (event.target.name === 'name') {
            this.nameSearch(event.target.value)
        }
    }

    handleSubmit = async () => {
        if (this.state.newAttackSpell.name
            && this.state.newAttackSpell.die_number
            && this.state.newAttackSpell.die_type
            && this.state.newAttackSpell.damage_type) {
            this.setState({ nameError: false, numberError: false })
            await axios.post(`/api/characters/${this.props.character.id}/spells`, this.state.newAttackSpell)
            await this.props.getCharacter()
            await this.props.setSpells()
            this.hideNewForm()
        } else if (!this.state.newAttackSpell.name) {
            this.setState({ nameError: true })
        } else if (!this.state.newAttackSpell.die_number) {
            this.setState({ nameError: false, numberError: true })
        }
    }

    render() {

        let attackSpellList = []
        if (this.props.attackSpells[0]) {
            attackSpellList = this.props.attackSpells.map((spell, i) => {
                return <AttackSpellItem key={i}
                    spell={spell}
                    getCharacter={this.props.getCharacter}
                    setSpells={this.props.setSpells} />
            })
        } else {
            attackSpellList = 'No spells.'
        }

        let possibleSpellNames = []
        if (this.state.possibleSpells[0]) {
            possibleSpellNames = this.state.possibleSpells.map((spell, i) => {
                    return <div className='search-result' 
                    onClick={() => this.fillSpell(spell['name'])} 
                    key={i}>{spell['name']}
                    </div>        
            })
        }

        return (
            <StyledDiv>
                {attackSpellList}
                <div>
                    <button className='add' onClick={this.showNewForm}>+ Add Spell</button>
                </div>
                {this.state.showNewForm ?
                    <div className='form'>
                        <p>Add New Attack Spell</p>

                        <h5>Name</h5>
                        <input type='text'
                            autoFocus
                            name='name'
                            value={this.state.newAttackSpell.name}
                            onChange={this.handleChange}
                            autoComplete='off' />
                        {this.state.possibleSpells[0] ? <div id='results'>{possibleSpellNames.slice(0, 5)}</div> : null}
                        <h6 className={this.state.nameError ? '' : 'hidden'} >Name cannot be empty.</h6>

                        <h5>Damage</h5>
                        <input
                            placeholder='# of dice'
                            type='number'
                            name='die_number'
                            value={this.state.newAttackSpell.die_number}
                            onChange={this.handleChange} />
                        <select name='die_type' onChange={this.handleChange}>
                            <option value={4} >d4</option>
                            <option value={6} >d6</option>
                            <option value={8} >d8</option>
                            <option value={10} >d10</option>
                            <option value={12} >d12</option>
                        </select>
                        <select name='damage_type' onChange={this.handleChange}>
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
                        <select name='skill' onChange={this.handleChange}>
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
                            value={this.state.newAttackSpell.description}
                            onChange={this.handleChange} />

                        <div>
                            <button className='submit' onClick={this.handleSubmit}><i className="far fa-check-square"></i> Add Spell</button>
                            <button className='cancel' onClick={this.hideNewForm}><i className="fas fa-arrow-left"></i> Cancel</button>
                        </div>

                    </div>
                    : null}
            </StyledDiv>
        )
    }
}

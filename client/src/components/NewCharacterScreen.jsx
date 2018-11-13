import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const StyledDiv = styled.div`
.hidden {
    display: none;
}

p {
    margin: 12px 0 3px 0;
}
input, select {
    padding: 12px 2vw;
    font-size: 18px;
}
input {
    width: 96vw;
}
select {
    background-color: #fff;
    color: #000;
    width: 100vw;
    padding: 12px 2vw;
    border-radius: 0;
}
h5 {
    color: rgb(205,30,30);
    margin: 3px 0;
    font-size: 18px;
}

.skill {
    h6 {
        margin: 3px 0 15px 0;
    }
    input {
        width: 28vw;
    }
    width: 31vw;
}

.skill-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

[type~=submit] {
  background-color: rgb(140,189,134);
  background: rgb(140,189,134);
  border-radius: 0;
  width: 100%;
  border: none;
  margin: 0 0 3px 0;
}
#cancel {
  background-color: rgb(215,190,140);
  width: 100vw;
}
[type~=submit], #cancel {
    text-align: left;
    text-transform: uppercase;
    font-weight: 600;
    padding: 9px 2vw;
    color: rgb(40,65,74);
}
`

export default class NewCharacterScreen extends Component {
    state = {
        newCharacter: {
            name: '',
            race: '',
            class_name: '',
            max_hp: '',
            level: '',
            prof: '',
            str: 10,
            dex: 10,
            con: 10,
            int: 10,
            wis: 10,
            cha: 10
        },
        redirect: false,
        nameError: false,
        classError: false,
        hpError: false,
        levelError: false,
        redirectId: ''
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        if (this.state.newCharacter.name
            && this.state.newCharacter.class_name
            && this.state.newCharacter.max_hp
            && this.state.newCharacter.level) {
            this.setState({ nameError: false, classError: false, hpError: false, levelError: false })
            const response = await axios.post(`/api/accounts/${this.props.match.params.id}/characters`, this.state.newCharacter)
            this.setState({
                newCharacter: {
                    name: '',
                    race: '',
                    class_name: '',
                    max_hp: '',
                    level: '',
                    prof: '',
                    str: 10,
                    dex: 10,
                    con: 10,
                    int: 10,
                    wis: 10,
                    cha: 10
                }
            })
            this.setState({ redirectId: response.data.id })
            this.setState({ redirect: true })
            // checking for errors below
        } else if (!this.state.newCharacter.name) {
            this.setState({ nameError: true })
        } else if (!this.state.newCharacter.class_name) {
            this.setState({ nameError: false, classError: true })
        } else if (!this.state.newCharacter.max_hp) {
            this.setState({ nameError: false, classError: false, hpError: true })
        } else if (!this.state.newCharacter.level) {
            this.setState({ nameError: false, classError: false, hpError: false, levelError: true })
        }
    }

    handleChange = (event) => {
        const newCharacter = { ...this.state.newCharacter }
        newCharacter[event.target.name] = event.target.value
        if (newCharacter.level) {
            if (newCharacter.level > 0 && newCharacter.level < 5) {
                newCharacter.prof = 2
            } else if (newCharacter.level < 9) {
                newCharacter.prof = 3
            } else if (newCharacter.level < 13) {
                newCharacter.prof = 4
            } else if (newCharacter.level < 17) {
                newCharacter.prof = 5
            } else {
                newCharacter.prof = 6
            }
        } else {
            newCharacter.prof = ''
        }
        if (newCharacter.max_hp) {
            newCharacter.current_hp = newCharacter.max_hp
        } else {
            newCharacter.current_hp = ''
        }
        this.setState({ newCharacter })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={`/characters/${this.state.redirectId}`} />
        }

        return (
            <StyledDiv>
                <form onSubmit={this.handleSubmit} >
                    <h2>New Character</h2>
                    <p>Name</p>
                    <input placeholder='Name'
                        type='text'
                        name='name'
                        value={this.state.newCharacter.name}
                        onChange={this.handleChange}
                    />
                    <h5 className={this.state.nameError ? '' : 'hidden'} >Name cannot be empty.</h5>

                    <p>Race</p>
                    <input placeholder='Race'
                        type='text'
                        name='race'
                        value={this.state.newCharacter.race}
                        onChange={this.handleChange}
                    />

                    <p>Class</p>
                    <select name='class_name' onChange={this.handleChange}>
                        <option value=''></option>
                        <option value='Barbarian'>Barbarian</option>
                        <option value='Bard'>Bard</option>
                        <option value='Cleric'>Cleric</option>
                        <option value='Druid'>Druid</option>
                        <option value='Fighter'>Fighter</option>
                        <option value='Monk'>Monk</option>
                        <option value='Paladin'>Paladin</option>
                        <option value='Ranger'>Ranger</option>
                        <option value='Rogue'>Rogue</option>
                        <option value='Sorcerer'>Sorcerer</option>
                        <option value='Warlock'>Warlock</option>
                        <option value='Wizard'>Wizard</option>
                    </select>
                    <h5 className={this.state.classError ? '' : 'hidden'} >Class cannot be empty.</h5>

                    <p>Hit Points</p>
                    <input placeholder='HP'
                        type='number'
                        name='max_hp'
                        value={this.state.newCharacter.max_hp}
                        onChange={this.handleChange}
                    />
                    <h5 className={this.state.hpError ? '' : 'hidden'} >Hit Points cannot be empty.</h5>

                    <p>Level</p>
                    <input placeholder='Level'
                        type='number'
                        name='level'
                        value={this.state.newCharacter.level}
                        onChange={this.handleChange}
                    />
                    <h5 className={this.state.levelError ? '' : 'hidden'} >Level cannot be empty.</h5>

                    <p>Skills</p>
                    <div className='skill-group'>
                        <div className='skill'>
                            <input placeholder='Strength'
                                type='number'
                                name='str'
                                value={this.state.newCharacter.str}
                                onChange={this.handleChange}
                            />
                            <h6>Strength</h6>
                        </div>
                        <div className='skill'>
                            <input placeholder='Dexterity'
                                type='number'
                                name='dex'
                                value={this.state.newCharacter.dex}
                                onChange={this.handleChange}
                            />
                            <h6>Dexterity</h6>
                        </div>
                        <div className='skill'>
                            <input placeholder='Constitution'
                                type='number'
                                name='con'
                                value={this.state.newCharacter.con}
                                onChange={this.handleChange}
                            />
                            <h6>Constitution</h6>
                        </div>
                        <div className='skill'>
                            <input placeholder='Intelligence'
                                type='number'
                                name='int'
                                value={this.state.newCharacter.int}
                                onChange={this.handleChange}
                            />
                            <h6>Intelligence</h6>
                        </div>
                        <div className='skill'>
                            <input placeholder='Wisdom'
                                type='number'
                                name='wis'
                                value={this.state.newCharacter.wis}
                                onChange={this.handleChange}
                            />
                            <h6>Wisdom</h6>
                        </div>
                        <div className='skill'>
                            <input placeholder='Charisma'
                                type='number'
                                name='cha'
                                value={this.state.newCharacter.cha}
                                onChange={this.handleChange}
                            />
                            <h6>Charisma</h6>
                        </div>
                    </div>

                    <div>
                        <input type='submit' value='Create' />
                    </div>
                </form>
                <div>
                    <Link to={`/accounts/${this.props.match.params.id}`}><button id='cancel'>Cancel</button></Link>
                </div>
            </StyledDiv>
        )
    }
}

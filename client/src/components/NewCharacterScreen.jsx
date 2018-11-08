import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const StyledDiv = styled.div`
.hidden {
    display: none;
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
            prof: ''
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
                    prof: ''
                }
            })
            this.setState({ redirectId: response.data.id })
            this.setState({ redirect: true })
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
                    <h1>New Character</h1>
                    <p>Name</p>
                    <input placeholder='Name'
                        type='text'
                        name='name'
                        value={this.state.newCharacter.name}
                        onChange={this.handleChange}
                    />
                    <h6 className={this.state.nameError ? '' : 'hidden'} >Character Name cannot be empty.</h6>

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
                    <h6 className={this.state.classError ? '' : 'hidden'} >Class cannot be empty.</h6>

                    <p>Hit Points</p>
                    <input placeholder='HP'
                        type='number'
                        name='max_hp'
                        value={this.state.newCharacter.max_hp}
                        onChange={this.handleChange}
                    />
                    <h6 className={this.state.hpError ? '' : 'hidden'} >Hit Points cannot be empty.</h6>

                    <p>Level</p>
                    <input placeholder='Level'
                        type='number'
                        name='level'
                        value={this.state.newCharacter.level}
                        onChange={this.handleChange}
                    />
                    <h6 className={this.state.levelError ? '' : 'hidden'} >Level cannot be empty.</h6>

                    <div>
                        <input type='submit' value='Create' />
                    </div>
                </form>
                <div>
                    <Link to={`/accounts/${this.props.match.params.id}`}><button>Cancel</button></Link>
                </div>
            </StyledDiv>
        )
    }
}

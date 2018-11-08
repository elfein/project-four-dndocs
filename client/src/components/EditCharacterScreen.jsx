import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const StyledDiv = styled.div`
.hidden {
    display: none;
}
`

const StyledOverlay = styled.div`
#modal-overlay {
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
`

const StyledModal = styled.div`
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
`

export default class EditCharacterScreen extends Component {
    state = {
        updatedCharacter: {
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
        redirectId: '',
        accRedirect: false,
        accRedirectId: '',
        showDelete: false
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        if (this.state.updatedCharacter.name
            && this.state.updatedCharacter.class_name
            && this.state.updatedCharacter.max_hp
            && this.state.updatedCharacter.level) {
            this.setState({ nameError: false, classError: false, hpError: false, levelError: false })
            const response = await axios.put(`/api/characters/${this.props.match.params.id}`, this.state.updatedCharacter)
            this.setState({
                updatedCharacter: {
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
        } else if (!this.state.updatedCharacter.name) {
            this.setState({ nameError: true })
        } else if (!this.state.updatedCharacter.class_name) {
            this.setState({ nameError: false, classError: true })
        } else if (!this.state.updatedCharacter.max_hp) {
            this.setState({ nameError: false, classError: false, hpError: true })
        } else if (!this.state.updatedCharacter.level) {
            this.setState({ nameError: false, classError: false, hpError: false, levelError: true })
        }
    }

    handleChange = (event) => {
        const updatedCharacter = { ...this.state.updatedCharacter }
        updatedCharacter[event.target.name] = event.target.value
        if (updatedCharacter.level) {
            if (updatedCharacter.level > 0 && updatedCharacter.level < 5) {
                updatedCharacter.prof = 2
            } else if (updatedCharacter.level < 9) {
                updatedCharacter.prof = 3
            } else if (updatedCharacter.level < 13) {
                updatedCharacter.prof = 4
            } else if (updatedCharacter.level < 17) {
                updatedCharacter.prof = 5
            } else {
                updatedCharacter.prof = 6
            }
        } else {
            updatedCharacter.prof = ''
        }
        if (updatedCharacter.max_hp) {
            updatedCharacter.current_hp = updatedCharacter.max_hp
        } else {
            updatedCharacter.current_hp = ''
        }
        this.setState({ updatedCharacter })
    }

    getCharacter = async () => {
        const response = await axios.get(`/api/characters/${this.props.match.params.id}`)
        this.setState({ updatedCharacter: response.data, redirectId: response.data.id, accRedirectId: response.data.account_id })
    }

    componentDidMount = async () => {
        await this.getCharacter()
    }

    showDelete = () => {
        this.setState({ showDelete: !this.state.showDelete })
    }

    deleteCharacter = async () => {
        await axios.delete(`/api/characters/${this.props.match.params.id}`)
        this.setState({ accRedirect: true })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={`/characters/${this.state.redirectId}`} />
        }
        if (this.state.accRedirect) {
            return <Redirect to={`/accounts/${this.state.accRedirectId}`} />
        }
        return (
            <StyledDiv>
                <form onSubmit={this.handleSubmit} >
                    <h1>Update Character</h1>
                    <p>Name</p>
                    <input placeholder='Name'
                        type='text'
                        name='name'
                        value={this.state.updatedCharacter.name}
                        onChange={this.handleChange}
                    />
                    <h6 className={this.state.nameError ? '' : 'hidden'} >Character Name cannot be empty.</h6>

                    <p>Race</p>
                    <input placeholder='Race'
                        type='text'
                        name='race'
                        value={this.state.updatedCharacter.race}
                        onChange={this.handleChange}
                    />

                    <p>Class</p>
                    <select name='class_name' value={this.state.updatedCharacter.class_name} onChange={this.handleChange}>
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
                        value={this.state.updatedCharacter.max_hp}
                        onChange={this.handleChange}
                    />
                    <h6 className={this.state.hpError ? '' : 'hidden'} >Hit Points cannot be empty.</h6>

                    <p>Level</p>
                    <input placeholder='Level'
                        type='number'
                        name='level'
                        value={this.state.updatedCharacter.level}
                        onChange={this.handleChange}
                    />
                    <h6 className={this.state.levelError ? '' : 'hidden'} >Level cannot be empty.</h6>

                    <div>
                        <input type='submit' value='Update' />
                    </div>
                </form>

                <div>
                    <Link to={`/characters/${this.props.match.params.id}`}><button>Cancel</button></Link>
                </div>

                <button onClick={this.showDelete}>Delete Character</button>

                <StyledOverlay>
                    <StyledModal className={this.state.showDelete ? '' : "hidden"}>
                        <p>Are you sure you want to delete this character?</p>
                        <button onClick={this.showDelete}>Cancel</button>
                        <button id='delete' onClick={this.deleteCharacter} >Delete Character</button>
                    </StyledModal>
                    <div id='modal-overlay' onClick={this.showDelete} className={this.state.showDelete ? '' : 'hidden'}></div>
                </StyledOverlay>

            </StyledDiv>
        )
    }
}

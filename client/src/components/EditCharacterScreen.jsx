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
    width: 95vw;
    margin: 0 0 3px 0;
}
select {
    background-color: #fff;
    color: #000;
    width: 100vw;
    padding: 12px 2vw;
    border-radius: 0;
}
[type~=submit] {
  background-color: rgb(140,189,134);
  background: rgb(140,189,134);
  border-radius: 0;
  width: 100%;
  border: none;
  &:hover {
  opacity: 0.6;
}
}
#cancel {
  background-color: rgb(215,190,140);
  width: 100vw;
}
#delete-toggle {
  background-color: rgb(215,150,140);
  width: 100vw;
}
button {
  margin: 0 0 3px 0;
}
[type~=submit], #cancel, #delete-toggle {
    text-align: left;
    text-transform: uppercase;
    font-weight: 600;
    padding: 9px 2vw;
    color: rgb(40,65,74);
}

.skill {
    h6 {
        margin: 3px 0 15px 0;
    }
    input {
        width: 24vw;
    }
    width: 31vw;
}

.skill-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
@media (min-device-width: 1000px) {
button {
  max-width: 600px;
}
input, select {
    max-width: 572px;
    padding: 12px;
}
[type~=submit]{
    max-width: 600px;
}
.skill {
    input {
        max-width: 140px;
    }
    max-width: 190px;
}
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
color: rgb(40,65,74);
button {
  margin: 10px 20px;
}
text-align: center;
position: fixed;
top: 50%;
left: 50%;
transition: transform 0.2s ease, opacity 0.2s ease;
opacity: 1;
z-index: 1010;
border-radius: 3px;
background: #fff;
transform: scale(1) translate(-50%, -50%);
width: 360px;
p {
    padding: 24px 0;
}
&.hidden {
  transition: transform 0.3s ease, opacity 0.2s ease;
  opacity: 0;
  z-index: -1000;
  transform: scale(0.96) translate(-50%, -46%);
}
#modal-cancel, #modal-delete {
    margin: 0;
    width: 50%;
    height: 36px;
    text-transform: uppercase;
}
#modal-cancel {
 border-radius: 0 0 0 3px;
 background-color: rgb(215,190,140);
}
#modal-delete {
 border-radius: 0 0 3px 0;
 background-color: rgb(215,150,140);
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
        this.setState({ showDelete: true })
    }

    hideDelete = () => {
        this.setState({ showDelete: false })
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

                    <p>Skills</p>
                    <div className='skill-group'>
                        <div className='skill'>
                            <input placeholder='Strength'
                                type='number'
                                name='str'
                                value={this.state.updatedCharacter.str}
                                onChange={this.handleChange}
                            />
                            <h6>Strength</h6>
                        </div>
                        <div className='skill'>
                            <input placeholder='Dexterity'
                                type='number'
                                name='dex'
                                value={this.state.updatedCharacter.dex}
                                onChange={this.handleChange}
                            />
                            <h6>Dexterity</h6>
                        </div>
                        <div className='skill'>
                            <input placeholder='Constitution'
                                type='number'
                                name='con'
                                value={this.state.updatedCharacter.con}
                                onChange={this.handleChange}
                            />
                            <h6>Constitution</h6>
                        </div>
                        <div className='skill'>
                            <input placeholder='Intelligence'
                                type='number'
                                name='int'
                                value={this.state.updatedCharacter.int}
                                onChange={this.handleChange}
                            />
                            <h6>Intelligence</h6>
                        </div>
                        <div className='skill'>
                            <input placeholder='Wisdom'
                                type='number'
                                name='wis'
                                value={this.state.updatedCharacter.wis}
                                onChange={this.handleChange}
                            />
                            <h6>Wisdom</h6>
                        </div>
                        <div className='skill'>
                            <input placeholder='Charisma'
                                type='number'
                                name='cha'
                                value={this.state.updatedCharacter.cha}
                                onChange={this.handleChange}
                            />
                            <h6>Charisma</h6>
                        </div>
                    </div>

                    <div>
                        <input type='submit' value='Update' />
                    </div>
                </form>

                <div>
                    <Link to={`/characters/${this.props.match.params.id}`}><button id='cancel'><i className="fas fa-arrow-left"></i> Cancel</button></Link>
                </div>

                <button onClick={this.showDelete} id='delete-toggle'><i className="far fa-trash-alt"></i> Delete Character</button>

                <StyledOverlay>
                    <StyledModal className={this.state.showDelete ? '' : "hidden"}>
                        <p>Are you sure you want to delete this character?</p>
                        <button id='modal-cancel' onClick={this.hideDelete}>Cancel</button>
                        <button id='modal-delete' onClick={this.deleteCharacter} >Delete Character</button>
                    </StyledModal>
                    <div id='modal-overlay' onClick={this.hideDelete} className={this.state.showDelete ? '' : 'hidden'}></div>
                </StyledOverlay>

            </StyledDiv>
        )
    }
}

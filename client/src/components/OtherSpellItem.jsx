import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const StyledDiv = styled.div`
.hidden {
  display: none;
}


margin: 0 0 12px 0;
background-color: rgb(235,170,170);
color: rgb(40,65,74);
h3 {
  display: inline;
}
i {
  margin: 9px;
}
.spell-data{
  background-color: rgb(255,240,210);
  margin: 0;
  padding: 3px 0;
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
    text-transform: none;
    font-size: 16px;
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
}
`

export default class OtherSpellItem extends Component {
    state = {
        showMore: false,
        showEditForm: false,
        showDelete: false,
        updatedSpell: {
            name: '',
            description: '',
            prof: true,
            attack: false
        },
        nameError: false
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
        if (this.state.updatedSpell.name) {
            this.setState({ nameError: false })
            await axios.put(`/api/spells/${this.props.spell.id}`, this.state.updatedSpell)
            await this.props.getCharacter()
            await this.props.setSpells()
            this.hideEditForm()
        } else if (!this.state.updatedSpell.name) {
            this.setState({ nameError: true })
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
                    <span onClick={this.showEditForm}><i className="fas fa-edit"></i></span>
                    <h6 className='spell-data' >{spell.description.length < 66 || this.state.showMore ? spell.description : spell.description.slice(0, 66) + '...'}</h6>
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

                        <h5>Description</h5>
                        <textarea
                            name='description'
                            value={this.state.updatedSpell.description}
                            onChange={this.handleChange} />

                        <div>
                            <button className='submit' onClick={this.handleSubmit}><i className="far fa-check-square"></i> Save</button>
                            <button className='cancel' onClick={this.hideEditForm}><i className="fas fa-arrow-left"></i> Cancel</button>
                        </div>

                        <div>
                            <button id='delete-toggle' onClick={this.showDelete} >
                                <i className="far fa-trash-alt"></i> Delete spell
                             </button>
                        </div>

                    </div>
                    : null}

                <StyledModalGroup>
                    <div id='modal' className={this.state.showDelete ? '' : 'hidden'}>
                        <p>Are you sure you want to delete this spell?</p>
                        <button id='modal-cancel' onClick={this.hideDelete}>Cancel</button>
                        <button id='modal-delete' onClick={this.deleteSpell} >Delete Spell</button>
                    </div>
                    <div id='overlay' onClick={this.hideDelete} className={this.state.showDelete ? '' : 'hidden'} ></div>
                </StyledModalGroup>
            </StyledDiv>
        )
    }
}

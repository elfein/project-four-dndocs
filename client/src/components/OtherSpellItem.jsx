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

export default class OtherSpellItem extends Component {
    state = {
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

    render() {
        const spell = this.props.spell
        return (
<StyledDiv>
                <h3>{spell.name}</h3>
                <span onClick={this.showEditForm}>edit</span>
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

import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import OtherSpellItem from './OtherSpellItem';

const StyledDiv = styled.div`
.hidden {
  display: none;
}
`

export default class OtherSpellList extends Component {
    state = {
        newSpell: {
            name: '',
            description: '',
            prof: true,
            attack: false
        },
        showNewForm: false,
        nameError: false
    }

    showNewForm = () => {
        this.setState({ showNewForm: true })
    }

    hideNewForm = () => {
        this.setState({ showNewForm: false })
        this.setState({
            newSpell: {
                name: '',
                description: '',
                prof: true,
                attack: false
            }
        })
    }

    handleChange = (event) => {
        const newSpell = { ...this.state.newSpell }
        newSpell[event.target.name] = event.target.value
        this.setState({ newSpell })
    }

    handleSubmit = async () => {
        if (this.state.newSpell.name) {
            this.setState({ nameError: false })
            await axios.post(`/api/characters/${this.props.character.id}/spells`, this.state.newSpell)
            await this.props.getCharacter()
            await this.props.setSpells()
            this.hideNewForm()
        } else if (!this.state.newSpell.name) {
            this.setState({ nameError: true })
        }
    }

    render() {

        let otherSpellList = []
        if (this.props.otherSpells[0]) {
            otherSpellList = this.props.otherSpells.map((spell, i) => {
                return <OtherSpellItem key={i}
                    spell={spell}
                    getCharacter={this.props.getCharacter}
                    setSpells={this.props.setSpells} />
            })
        } else {
            otherSpellList = 'No spells.'
        }

        return (
            <StyledDiv>
                {otherSpellList}
                <div>
                    <button onClick={this.showNewForm}>+</button>
                </div>
                {this.state.showNewForm ?
                    <div className='form'>
                        <p>Add New Spell</p>

                        <h5>Name</h5>
                        <input type='text'
                            autoFocus
                            name='name'
                            value={this.state.newSpell.name}
                            onChange={this.handleChange} />
                        <h6 className={this.state.nameError ? '' : 'hidden'} >Name cannot be empty.</h6>

                        <h5>Description</h5>
                        <input type='text'
                            name='description'
                            value={this.state.newSpell.description}
                            onChange={this.handleChange} />

                        <div>
                            <button onClick={this.hideNewForm}>Cancel</button>
                            <button onClick={this.handleSubmit}>Add Spell</button>
                        </div>

                    </div>
                    : null}
            </StyledDiv>
        )
    }
}

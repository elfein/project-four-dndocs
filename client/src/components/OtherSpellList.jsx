import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import OtherSpellItem from './OtherSpellItem';

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
`

export default class OtherSpellList extends Component {
    state = {
        possibleSpells: [],
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
            },
            possibleSpells: []
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
        const apiSpellUrl = await axios.get(`http://www.dnd5eapi.co/api/spells/?name=${name}`)
        const apiSpellData = await axios.get(apiSpellUrl.data.results[0]['url'])
        const apiSpell = apiSpellData.data
        const newSpell = {
            name: apiSpell['name'],
            description: apiSpell['desc'][0],
            prof: true,
            attack: false
        }
        this.setState({ newSpell, possibleSpells: [] })
    }


    handleChange = (event) => {
        const newSpell = { ...this.state.newSpell }
        newSpell[event.target.name] = event.target.value
        this.setState({ newSpell })
        if (event.target.name === 'name') {
            this.nameSearch(event.target.value)
        }
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

        let possibleSpellNames = []
        if (this.state.possibleSpells[0]) {
            possibleSpellNames = this.state.possibleSpells.map((spell, i) => {
                    return <li className='search-result' onClick={() => this.fillSpell(spell['name'])} key={i}>{spell['name']}</li>
            })
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
                            onChange={this.handleChange}
                            autoComplete='off' />
                        {this.state.possibleSpells[0] ? <div id='results'>{possibleSpellNames.slice(0, 5)}</div> : null}
                        <h6 className={this.state.nameError ? '' : 'hidden'} >Name cannot be empty.</h6>

                        <h5>Description</h5>
                        <textarea
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

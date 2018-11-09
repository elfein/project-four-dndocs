import React, { Component } from 'react'
import axios from 'axios'
import InfoItem from './InfoItem'
import styled from 'styled-components'

const StyledDiv = styled.div`
.hidden {
  display: none;
}
`

export default class ItemList extends Component {
    state = {
        items: [],
        newItem: {
            name: '',
            description: ''
        },
        showNewForm: false,
        nameError: false
    }

    getItems = async () => {
        const response = await axios.get(`/api/characters/${this.props.character.id}/items`)
        this.setState({ items: response.data })
    }

    componentDidMount = () => {
        this.getItems()
    }

    showNewForm = () => {
        this.setState({ showNewForm: true })
    }

    hideNewForm = () => {
        this.setState({ showNewForm: false })
        this.setState({
            newItem: {
                name: '',
                description: ''
            }
        })
    }

    handleChange = (event) => {
        const newItem = { ...this.state.newItem }
        newItem[event.target.name] = event.target.value
        this.setState({ newItem })
    }

    handleSubmit = async () => {
        if (this.state.newItem.name) {
            this.setState({ nameError: false })
            await axios.post(`/api/characters/${this.props.character.id}/items`, this.state.newItem)
            await this.props.getCharacter()
            await this.getItems()
            this.hideNewForm()
        } else if (!this.state.newItem.name) {
            this.setState({ nameError: true })
        }
    }

    render() {

        let itemList = []
        if (this.state.items[0]) {
            itemList = this.state.items.map((item, i) => {
                return <InfoItem key={i}
                    item={item}
                    getCharacter={this.props.getCharacter}
                    getItems={this.getItems} />
            })
        } else {
            itemList = 'This character does not have any items yet.'
        }

        return (
            <StyledDiv>
                {itemList}
                <div>
                    <button onClick={this.showNewForm}>+</button>
                </div>
                {this.state.showNewForm ?
                    <div className='form'>
                        <p>Add New Item</p>
                        <h5>Name</h5>
                        <input type='text'
                            autoFocus
                            name='name'
                            value={this.state.newItem.name}
                            onChange={this.handleChange} />
                        <h6 className={this.state.nameError ? '' : 'hidden'} >Name cannot be empty.</h6>

                        <h5>Description</h5>
                        <input type='text'
                            name='description'
                            value={this.state.newItem.description}
                            onChange={this.handleChange} />

                        <div>
                            <button onClick={this.hideNewForm}>Cancel</button>
                            <button onClick={this.handleSubmit}>Add Item</button>
                        </div>
                    </div>
                    : null}
            </StyledDiv>
        )
    }
}

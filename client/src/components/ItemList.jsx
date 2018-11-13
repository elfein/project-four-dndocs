import React, { Component } from 'react'
import axios from 'axios'
import InfoItem from './InfoItem'
import styled from 'styled-components'

const StyledDiv = styled.div`
.hidden {
  display: none;
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
}
@media (min-device-width: 1000px) {
.add {
  max-width: 600px;
}
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
            itemList = 'No items yet.'
        }

        return (
            <StyledDiv>
                {itemList}
                <div>
                    <button className='add' onClick={this.showNewForm}>+ Add Item</button>
                </div>
                {this.state.showNewForm ?
                    <div className='form'>
                        <p>Add New Item</p>
                        <h5>Name</h5>
                        <input type='text'
                            autoFocus
                            name='name'
                            value={this.state.newItem.name}
                            onChange={this.handleChange}
                            autoComplete='off' />
                        <h6 className={this.state.nameError ? '' : 'hidden'} >Name cannot be empty.</h6>

                        <h5>Description</h5>
                        <input type='text'
                            name='description'
                            value={this.state.newItem.description}
                            onChange={this.handleChange} />

                        <div>
                            <button className='cancel' onClick={this.hideNewForm}><i className="fas fa-arrow-left"></i> Cancel</button>
                            <button className='submit' onClick={this.handleSubmit}><i className="far fa-check-square"></i> Add Item</button>
                        </div>
                    </div>
                    : null}
            </StyledDiv>
        )
    }
}

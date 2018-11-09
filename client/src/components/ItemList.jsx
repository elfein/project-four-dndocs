import React, { Component } from 'react'
import axios from 'axios'
import InfoItem from './InfoItem'

export default class ItemList extends Component {
    state = {
        items: [],
        newItem: {
            name: '',
            description: ''
        },
        showNewForm: false
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
    }

    handleChange = (event) => {
        const newItem = { ...this.state.newItem }
        newItem[event.target.name] = event.target.value
        this.setState({ newItem })
    }

    handleSubmit = async () => {
        if (this.state.newItem.name) {
            await axios.post(`/api/characters/${this.props.character.id}/items`, this.state.newItem)
            await this.props.getCharacter()
            await this.getItems()
            this.setState({
                newItem: {
                    name: '',
                    description: ''
                }
            })
            this.hideNewForm()
        }
    }

    render() {

        let itemList = []
        if (this.state.items[0]) {
            itemList = this.state.items.map((item, i) => {
                return <InfoItem key={i} item={item} />
            })
        } else {
            itemList = 'This character does not have any items yet.'
        }

        return (
            <div>
                {itemList}
                <button onClick={this.showNewForm}>+</button>
                {this.state.showNewForm ?
                    <div>
                        <p>Add New Item</p>
                        <h5>Name</h5>
                        <input type='text'
                            name='name'
                            value={this.state.newItem.name}
                            onChange={this.handleChange} />

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
            </div>
        )
    }
}

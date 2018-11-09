import React, { Component } from 'react'
import axios from 'axios'

export default class InfoItem extends Component {
  state = {
    showEditform: false,
    updatedItem: {
      name: '',
      description: ''
    }
  }

  setItem = () => {
    this.setState({ updatedItem: this.props.item })
  }

  componentDidMount = () => {
    this.setItem()
  }

  showEditform = () => {
    this.setState({ showEditform: true })
  }

  hideEditForm = () => {
    this.setState({ showEditform: false })
  }

  handleChange = (event) => {
    const updatedItem = { ...this.state.updatedItem }
    updatedItem[event.target.name] = event.target.value
    this.setState({ updatedItem })
  }

  handleSubmit = async () => {
    if (this.state.updatedItem.name) {
      await axios.put(`/api/items/${this.props.weapon.id}`, this.state.updatedItem)
      await this.props.getCharacter()
      await this.props.getItems()
      this.hideEditForm()
    }
  }

  render() {
    const item = this.props.item
    return (
      <div>
        <h3>{item.name}</h3>
        <span onClick={this.showEditform}>edit</span>
        {this.state.showEditform ?
          <div className='form'>
            <p>Edit {item.name}</p>

            <h5>Name</h5>
            <input type='text'
              autoFocus
              name='name'
              value={this.state.updatedItem.name}
              onChange={this.handleChange} />

            <h5>Description</h5>
            <textarea
              name='description'
              value={this.state.updatedItem.description}
              onChange={this.handleChange} />

            <div>
              <button onClick={this.hideEditForm}>Cancel</button>
              <button onClick={this.handleSubmit}>Save</button>
            </div>

          </div>
          : null}
      </div>
    )
  }
}

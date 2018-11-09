import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

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

export default class InfoItem extends Component {
  state = {
    showEditform: false,
    showDelete: false,
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

  showDelete = () => {
    this.setState({ showDelete: true })
  }

  hideDelete = () => {
    this.setState({ showDelete: false })
  }

  deleteItem = async () => {
    await axios.delete(`/api/items/${this.props.item.id}`)
    this.hideDelete()
    this.hideEditForm()
    this.props.getCharacter()
    this.props.getItems()
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
      await axios.put(`/api/items/${this.props.item.id}`, this.state.updatedItem)
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

            <div>
              <button onClick={this.showDelete} >
                Delete Item
              </button>
            </div>

          </div>
          : null}

           <StyledModalGroup>
          <div id='modal' className={this.state.showDelete ? '' : 'hidden'}>
            <p>Are you sure you want to delete this item?</p>
            <button onClick={this.hideDelete}>Cancel</button>
            <button id='delete' onClick={this.deleteItem} >Delete Item</button>
          </div>
          <div id='overlay' onClick={this.hideDelete} className={this.state.showDelete ? '' : 'hidden'} ></div>
        </StyledModalGroup>
      </div>
    )
  }
}

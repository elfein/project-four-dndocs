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
.item-data{
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

export default class InfoItem extends Component {
  state = {
    showMore: false,
    showEditform: false,
    showDelete: false,
    updatedItem: {
      name: '',
      description: ''
    },
    nameError: false
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
      this.setState({ nameError: false })
      await axios.put(`/api/items/${this.props.item.id}`, this.state.updatedItem)
      await this.props.getCharacter()
      await this.props.getItems()
      this.hideEditForm()
    } else if (!this.state.updatedItem.name) {
      this.setState({ nameError: true })
    }
  }

  toggleMore = () => {
    this.setState({ showMore: !this.state.showMore })
  }

  render() {
    const item = this.props.item
    return (
      <StyledDiv>
        <div onClick={this.toggleMore}>
          <h3>{item.name}</h3>
          <span onClick={this.showEditform}><i className="fas fa-edit"></i></span>
          <h6 className='item-data'>{item.description.length < 66 || this.state.showMore ? item.description : item.description.slice(0, 66) + '...'}</h6>
        </div>
        {this.state.showEditform ?
          <div className='form'>
            <p>Edit {item.name}</p>

            <h5>Name</h5>
            <input type='text'
              autoFocus
              name='name'
              value={this.state.updatedItem.name}
              onChange={this.handleChange}
               />
            <h6 className={this.state.nameError ? '' : 'hidden'} >Name cannot be empty.</h6>

            <h5>Description</h5>
            <textarea
              name='description'
              value={this.state.updatedItem.description}
              onChange={this.handleChange} />

            <div>
              <button className='submit' onClick={this.handleSubmit}><i className="far fa-check-square"></i> Save</button>
              <button className='cancel' onClick={this.hideEditForm}><i className="fas fa-arrow-left"></i> Cancel</button>
            </div>

            <div>
              <button id='delete-toggle' onClick={this.showDelete} >
              <i className="far fa-trash-alt"></i> Delete Item
              </button>
            </div>

          </div>
          : null}

        <StyledModalGroup>
          <div id='modal' className={this.state.showDelete ? '' : 'hidden'}>
            <p>Are you sure you want to delete this item?</p>
            <button id='modal-cancel' onClick={this.hideDelete}>Cancel</button>
            <button id='modal-delete' onClick={this.deleteItem} >Delete Item</button>
          </div>
          <div id='overlay' onClick={this.hideDelete} className={this.state.showDelete ? '' : 'hidden'} ></div>
        </StyledModalGroup>
      </StyledDiv>
    )
  }
}

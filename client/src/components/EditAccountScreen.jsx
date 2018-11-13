import React, { Component } from 'react'
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledDiv = styled.div`
.hidden {
    display: none;
}
p {
   margin: 12px 0 3px 0; 
}
input {
  width: 96vw;
  border: none;
  padding: 9px 2vw;
  margin: 0 0 3px 0;
  font-size: 18px;
}
[type~=submit] {
  background-color: rgb(140,189,134);
  background: rgb(140,189,134);
  border-radius: 0;
  width: 100%;
  &:hover {
  opacity: 0.6;
}
}
#cancel {
  background-color: rgb(215,190,140);
  width: 100vw;
}
#delete-toggle {
  background-color: rgb(215,150,140);
  width: 100vw;
}
button {
  margin: 0 0 3px 0;
}
[type~=submit], #cancel, #delete-toggle {
    text-align: left;
    text-transform: uppercase;
    font-weight: 600;
    padding: 9px 2vw;
    color: rgb(40,65,74);
}
@media (min-device-width: 1000px) {
input, button {
  max-width: 600px;
}
[type~=text]{
    max-width: 576px;
    padding: 12px;
}
}
`

const StyledOverlay = styled.div`
#modal-overlay {
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
`

const StyledModal = styled.div`
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
`

export default class EditAccountScreen extends Component {
    state = {
        updatedAccount: {
            name: ''
        },
        account: {
            name: ''
        },
        redirectId: '',
        redirect: false,
        accRedirect: false,
        nameError: false,
        showDelete: false
    }

    getAccount = async () => {
        const response = await axios.get(`/api/accounts/${this.props.match.params.id}`)
        this.setState({ updatedAccount: response.data, account: response.data })
    }

    componentDidMount = async () => {
        await this.getAccount()
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        if (this.state.updatedAccount.name) {
            this.setState({ nameError: false })
            await axios.put(`/api/accounts/${this.props.match.params.id}`, this.state.updatedAccount)
            this.setState({ updatedAccount: this.state.account })
            this.setState({ redirectId: this.props.match.params.id })
            this.setState({ accRedirect: true })
        } else {
            this.setState({ nameError: true })
        }
    }

    handleChange = (event) => {
        const updatedAccount = { ...this.state.updatedAccount }
        updatedAccount[event.target.name] = event.target.value
        this.setState({ updatedAccount })
    }

    showDelete = () => {
        this.setState({ showDelete: !this.state.showDelete })
    }

    hideDelete = () => {
        this.setState({ showDelete: false })
    }

    deleteAccount = async () => {
        await axios.delete(`/api/accounts/${this.props.match.params.id}`)
        this.setState({ redirect: true })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={'/'} />
        }
        if (this.state.accRedirect) {
            return <Redirect to={`/accounts/${this.state.redirectId}`} />
        }
        return (
            <StyledDiv>
                <form onSubmit={this.handleSubmit} >
                    <h2>Account Settings</h2>

                    <p>Name</p>
                    <input placeholder='Account Name'
                        type='text'
                        name='name'
                        value={this.state.updatedAccount.name}
                        onChange={this.handleChange}
                    />
                    <h6 className={this.state.nameError ? '' : 'hidden'} >Account Name cannot be empty.</h6>

                    <div>
                        <input type='submit' value='Update' />
                    </div>

                </form>

                <div>
                    <Link to={`/accounts/${this.props.match.params.id}`}><button id='cancel'><i className="fas fa-arrow-left"></i> Cancel</button></Link>
                </div>

                <button id='delete-toggle' onClick={this.showDelete}><i className="far fa-trash-alt"></i> Delete Account</button>

                <StyledOverlay>
                    <StyledModal className={this.state.showDelete ? '' : "hidden"}>
                        <p>Are you sure you want to delete this account?</p>
                        <button id='modal-cancel' onClick={this.hideDelete}>Cancel</button>
                        <button id='modal-delete' onClick={this.deleteAccount} >Delete Account</button>
                    </StyledModal>
                    <div id='modal-overlay' onClick={this.hideDelete} className={this.state.showDelete ? '' : 'hidden'}></div>
                </StyledOverlay>

            </StyledDiv>
        )
    }
}

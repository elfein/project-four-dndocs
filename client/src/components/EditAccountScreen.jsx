import React, { Component } from 'react'
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledDiv = styled.div`
.hidden {
    display: none;
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
                    <Link to={`/accounts/${this.props.match.params.id}`}><button>Cancel</button></Link>
                </div>

                <button onClick={this.showDelete}>Delete Account</button>

                <StyledOverlay>
                    <StyledModal className={this.state.showDelete ? '' : "hidden"}>
                        <p>Are you sure you want to delete this account?</p>
                        <button onClick={this.showDelete}>Cancel</button>
                        <button id='delete' onClick={this.deleteAccount} >Delete Account</button>
                    </StyledModal>
                    <div id='modal-overlay' onClick={this.showDelete} className={this.state.showDelete ? '' : 'hidden'}></div>
                </StyledOverlay>

            </StyledDiv>
        )
    }
}

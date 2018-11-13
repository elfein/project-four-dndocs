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
  width: 100%;
  border-radius: 0;
}
#cancel {
  background-color: rgb(215,190,140);
  width: 100vw;
}
[type~=submit], #cancel {
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

export default class NewAccountScreen extends Component {
    state = {
        newAccount: {
            name: ''
        },
        redirectId: '',
        redirect: false,
        nameError: false
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        if (this.state.newAccount.name) {
            this.setState({ nameError: false })
            const response = await axios.post('/api/accounts', this.state.newAccount)
            this.setState({
                newAccount: {
                    name: ''
                }
            })
            this.setState({ redirectId: response.data.id })
            this.setState({ redirect: true })
        } else {
            this.setState({ nameError: true })
        }
    }

    handleChange = (event) => {
        const newAccount = { ...this.state.newAccount }
        newAccount[event.target.name] = event.target.value
        this.setState({ newAccount })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={`/accounts/${this.state.redirectId}`} />
        }
        return (
            <StyledDiv>
                <form onSubmit={this.handleSubmit} >
                    <h2>New Account</h2>

                    <p>Name</p>
                    <input placeholder='Account Name'
                        type='text'
                        name='name'
                        value={this.state.newAccount.name}
                        onChange={this.handleChange}
                    />
                    <h6 className={this.state.nameError ? '' : 'hidden'} >Account Name cannot be empty.</h6>

                    <div>
                        <input type='submit' value='Create' />
                    </div>

                </form>

                <div>
                    <Link to='/'><button id='cancel'>Cancel</button></Link>
                </div>
            </StyledDiv>
        )
    }
}

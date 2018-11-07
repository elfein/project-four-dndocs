import React, { Component } from 'react'
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledDiv = styled.div`
.hidden {
    display: none;
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
                    <Link to='/'><button>Cancel</button></Link>
                </div>
            </StyledDiv>
        )
    }
}

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CharacterList from './CharacterList';
import styled from 'styled-components'

const StyledDiv = styled.div`
padding: 24px;
.account-name {
    display: flex;
    align-items: baseline;
    img {
        width: 15px;
        margin: 2px 5px;
    }
}
`

export default class AccountScreen extends Component {
    state = {
        account: {
            id: ''
        }
    }

    getAccount = async () => {
        const response = await axios.get(`/api/accounts/${this.props.match.params.id}`)
        return response.data
    }

    componentDidMount = async () => {
        const account = await this.getAccount()
        this.setState({ account })
    }

    render() {
        return (
            <StyledDiv>
                <Link to='/' >Sign Out</Link>
                <div className="account-name">
                    <h2>{this.state.account.name}</h2>
                    <Link to={`/accounts/${this.props.match.params.id}/edit`}><img src='https://66.media.tumblr.com/d33c851c69aa1bbe6cdd1d379528bcf2/tumblr_pi3cflCkjk1uj0ljmo4_r1_1280.png' alt='settings' /></Link>
                </div>
                <CharacterList id={this.props.match.params.id} />
                <Link to={`/accounts/${this.props.match.params.id}/characters/new`} ><button>New Character</button></Link>
            </StyledDiv>
        )
    }
}

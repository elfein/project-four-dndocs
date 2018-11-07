import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CharacterList from './CharacterList';

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
            <div>
                <Link to='/' >Sign Out</Link>
                <h2>{this.state.account.name}</h2>
                <Link to={`/accounts/${this.props.match.params.id}/edit`}>Edit</Link>
                <CharacterList id={this.props.match.params.id} />
                <Link to={`/accounts/${this.props.match.params.id}/characters/new`} ><button>New Character</button></Link>
            </div>
        )
    }
}

import React, { Component } from 'react'
import axios from 'axios'
import AccountItem from './AccountItem';

export default class AccountList extends Component {
    state = {
        accounts: []
    }

    getAccounts = async () => {
        const response = await axios.get('/api/accounts')
        return response.data
    }

    componentDidMount = async () => {
        const accounts = await this.getAccounts()
        this.setState({ accounts })
    }

  render() {

    const accountList = this.state.accounts.map((account, i) => {
        return <AccountItem key={i} account={account} />
    })

    return (
      <div>
        {accountList}
      </div>
    )
  }
}

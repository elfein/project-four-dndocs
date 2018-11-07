import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AccountList from './AccountList';

export default class AccountsScreen extends Component {
  render() {
    return (
      <div>
        <h2>Select Account</h2>
        <AccountList />
        <Link to='/accounts/new' ><button>New Account</button></Link>
      </div>
    )
  }
}

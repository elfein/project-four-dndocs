import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class AccountItem extends Component {
  render() {
      const account = this.props.account
    return (
      <div>
        <Link to={`/accounts/${account.id}`} >{account.name}</Link>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AccountList from './AccountList';
import styled from 'styled-components'

const StyledDiv = styled.div`
padding: 24px;
`

export default class AccountsScreen extends Component {
  render() {
    return (
      <StyledDiv>
        <h2>Select Account</h2>
        <AccountList />
        <Link to='/accounts/new' ><button>New Account</button></Link>
      </StyledDiv>
    )
  }
}

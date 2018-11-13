import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AccountList from './AccountList';
import styled from 'styled-components'

const StyledDiv = styled.div`
.new {
  width: 100vw;
  text-align: left;
  height: 60px;
  font-size: 20px;
  text-transform: uppercase;
  color: rgb(40,65,74);
  font-weight: 600;
  padding:12px;
}
`

export default class AccountsScreen extends Component {
  render() {
    return (
      <StyledDiv>
        <h2>Select Account</h2>
        <AccountList />
        <Link to='/accounts/new' ><button className="new">New Account</button></Link>
      </StyledDiv>
    )
  }
}

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledDiv = styled.div`
margin: 3px 0;
padding: 6px;
text-transform: uppercase;
color: rgb(20,39,54);
background-color: rgb(255,240,210);
span {
  opacity: 0.4;
  margin: 0 6px;
}
&:active, &:focus {
  opacity: 0.3;
}
&:hover {
  opacity: 0.6;
}
h3 {
  margin: 3px;
}
`

export default class AccountItem extends Component {
  render() {
    const account = this.props.account
    return (
      <Link to={`/accounts/${account.id}`} >
        <StyledDiv>
          <h3>{account.name}<span>Last Played: {account.updated_at.slice(5,10)}</span></h3>
        </StyledDiv>
      </Link >
    )
  }
}

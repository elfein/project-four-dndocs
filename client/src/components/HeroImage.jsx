import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledDiv = styled.div`
height: 10vh;
display: flex;
align-items: center;
img {
  height: 6vh;
}
`

export default class HeroImage extends Component {
  render() {
    return (
      <StyledDiv>
        <Link to='/' ><img src='https://66.media.tumblr.com/790048e7e18442397e3228fe0b363082/tumblr_pi3q0dErPm1uj0ljmo1_500.png' alt="logo"/></Link>
      </StyledDiv>
    )
  }
}

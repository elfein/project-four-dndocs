import React, { Component } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
display: flex;
margin: 1px 0 0 0;
.source {
    width: 30vw;
    height: 30px;
    background-color: rgb(255,240,210);
    color: rgb(40,65,74);
    display: flex;
    align-items: center;
    h5 {
        margin: 0;
    }
}
.bar {
    height: 30px;
}
.hit {
    background-color: rgb(190,129,84);
}
.attack {
   background-color: rgb(80,175,164);
}
.heal {
    background-color: rgb(150,189,114);
}
`

export default class RollItem extends Component {
    state = {
        showNum: false
    }

  render() {
      let classType = ''
    
      if (this.props.roll.diff < 0) {
          classType = 'hit'
      } else if (this.props.roll.diff_type === 'Healing') {
          classType = 'heal'
      } else {
          classType = 'attack'
      }

      let abolsuteWidth = Math.abs(this.props.roll.diff)

      let width = parseInt(70 * (abolsuteWidth) / this.props.maxVal)

      console.log(width)

    return (
      <StyledDiv>
        <div className='source' onClick={this.toggleNum}>
            <h5>{this.props.roll.source}</h5>
        </div>
        <div className={`${classType} bar`} style={{width:`${width}vw`}}></div>
      </StyledDiv>
    )
  }
}

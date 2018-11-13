import React, { Component } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
text-align: center;
width: 110px;
height: 60px;
h6 {
    margin: 4px 0 10px 0;
}
`

const StyledModalGroup = styled.div`
#overlay {
    z-index: 1000;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background-color: rgba(50,50,55,0.5);
  display: flex;
  opacity: 1;
  transform: scale(1) translate(-50%, -50%);
  transition: transform 0.2s ease, opacity 0.2s ease;
  &.hidden {
  opacity: 0;
  z-index: -1000;
  transform: scale(1) translate(-50%, -50%);
} 
}
#modal {
    color: rgb(40,65,74);
button {
  margin: 10px 20px;
}
text-align: center;
position: fixed;
top: 50%;
left: 50%;
transition: transform 0.2s ease, opacity 0.2s ease;
opacity: 1;
z-index: 1010;
border-radius: 3px;
background: #fff;
transform: scale(1) translate(-50%, -50%);
width: 360px;
input {
    border: 1px solid rgb(100,100,100);
    margin: 24px 3px;
}
p {
    padding: 24px 0;
    text-transform: none;
    font-size: 16px;
}
.save-p {
    margin: 6px;
    padding: 0;
}
h1 {
    margin: 6px;
}
&.hidden {
  transition: transform 0.3s ease, opacity 0.2s ease;
  opacity: 0;
  z-index: -1000;
  transform: scale(0.96) translate(-50%, -46%);
}
#modal-cancel, #modal-fight {
    margin: 0;
    width: 50%;
    height: 36px;
    text-transform: uppercase;
    font-size: 18px;
}
#single-option {
    border-radius: 0 0 3px 3px;
    margin: 0;
    width: 100%;
    height: 36px;
    font-size: 18px;
    background-color: rgb(185,210,140);
}
}
`

export default class SaveActionItem extends Component {
    state = {
        roll: '',
        bonus: '',
        showRoll: false
    }

    showRoll = () => {
        this.setState({ showRoll: true })
    }

    hideRoll = () => {
        this.setState({ showRoll: false })
    }

    rollSave = () => {
        this.showRoll()
        const amount = this.determineRoll()
        this.setState({ roll: amount })
    }

    determineRoll = () => {
        let amount = (Math.ceil(Math.random() * 20))
        // add bonus
        amount += this.state.bonus
        return amount
    }

    componentDidMount = () => {
        const bonus = Math.floor((this.props.stat[1] - 10) * 0.5)
        this.setState({ bonus })
    }

    render() {

        return (
            <div>
                <StyledDiv onClick={this.rollSave}>
                    <p>{this.state.bonus > 0 ? '+' : null}{this.state.bonus}</p>
                    <h6>{this.props.stat[0]}</h6>
                </StyledDiv>
                <StyledModalGroup>
                    <div id='modal' className={this.state.showRoll ? '' : 'hidden'}>
                        <p className='save-p'>You rolled</p>
                        <h1>{this.state.roll}</h1>
                        <p className='save-p'>on your {this.props.stat[0].toUpperCase()} save!</p>
                        <button id='single-option' onClick={this.hideRoll}>Nice</button>
                    </div>
                    <div id='overlay' onClick={this.hideRoll} className={this.state.showRoll ? '' : 'hidden'} ></div>
                </StyledModalGroup>
            </div>
        )
    }
}

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
    button {
  margin: 10px 20px;
}
p, h1 {
  text-align: center;
}
#delete {
  color: red;
}
position: fixed;
top: 50%;
left: 50%;
transition: transform 0.2s ease, opacity 0.2s ease;
opacity: 100%;
z-index: 1010;
padding: 30px;
border-radius: 3px;
background: #fff;
transform: scale(1) translate(-50%, -50%);
width: 300px;
&.hidden {
  transition: transform 0.3s ease, opacity 0.2s ease;
  opacity: 0;
  z-index: -1000;
  transform: scale(0.96) translate(-50%, -46%);
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
                    {this.state.bonus > 0 ? '+' : null}{this.state.bonus}
                    <h6>{this.props.stat[0]}</h6>
                </StyledDiv>
                <StyledModalGroup>
                    <div id='modal' className={this.state.showRoll ? '' : 'hidden'}>
                        <p>You rolled</p>
                        <h1>{this.state.roll}</h1>
                        <p>on your {this.props.stat[0].toUpperCase()} save!</p>
                        <button onClick={this.hideRoll}>Nice</button>
                    </div>
                    <div id='overlay' onClick={this.hideRoll} className={this.state.showRoll ? '' : 'hidden'} ></div>
                </StyledModalGroup>
            </div>
        )
    }
}

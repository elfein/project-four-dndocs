import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const StyledDiv = styled.div`
margin: 0 0 30px 0;
background-color: rgb(235,170,170);
color: rgb(40,65,74);
h3 {
  display: inline;
}
i {
  margin: 9px;
}
.weapon-data{
  background-color: rgb(255,240,210);
  h4 {
    margin: 3px 0;
    padding: 9px 0;
  }
  h6 {
    margin: 0;
    padding: 3px 0;
  }
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
p {
    padding: 24px 0;
    text-transform: none;
    font-size: 16px;
}
&.hidden {
  transition: transform 0.3s ease, opacity 0.2s ease;
  opacity: 0;
  z-index: -1000;
  transform: scale(0.96) translate(-50%, -46%);
}
#modal-cancel, #modal-confirm {
    margin: 0;
    width: 50%;
    height: 36px;
    text-transform: uppercase;
}
#modal-cancel {
 border-radius: 0 0 0 3px;
 background-color: rgb(215,190,140);
}
#modal-confirm {
 border-radius: 0 0 3px 0;
 background-color: rgb(185,210,140);
}
}
`

export default class WeaponActionItem extends Component {
    state = {
        diff: '',
        damage_type: '',
        showAttack: false
    }

    showAttack = () => {
        this.setState({ showAttack: true })
    }

    hideAttack = () => {
        this.setState({ showAttack: false })
    }

    rollAttack = () => {
        this.showAttack()
        const amount = this.determineAttack()
        this.setState({ diff: amount, damage_type: this.props.weapon.damage_type })
    }

    determineAttack = () => {
        let amount = 0
        for (let i = 0; i < (this.props.weapon.die_number); i++) {
            amount += (Math.ceil(Math.random() * this.props.weapon.die_type))
        }
        // add weapon bonus
        amount += this.props.weapon.bonus
        // add proficiency bonus
        amount += this.props.character.prof
        // add skill
        amount += Math.floor((this.props.character[this.props.weapon.skill] - 10) * .5)
        return amount
    }

    confirmAttack = async () => {
        const attack = {
            diff: this.state.diff,
            diff_type: this.state.damage_type,
            source: this.props.weapon.name,
            diff_2_type: 'Attack'
        }
        await axios.post(`/api/encounters/${this.props.encounter.id}/hpactions`, attack)
        this.hideAttack()
        this.setState({
            diff: '',
            damage_type: ''
        })
        this.props.getCharacter()
    }

    render() {
        const weapon = this.props.weapon
        return (
            <div>
                <StyledDiv onClick={this.rollAttack}>
                    <h3>{weapon.name}</h3>
                    <div className='weapon-data'>
                        <h4>{weapon.die_number}d{weapon.die_type} {weapon.damage_type}</h4>
                    </div>
                </StyledDiv>
                <StyledModalGroup>
                    <div id='modal' className={this.state.showAttack ? '' : 'hidden'}>
                        <p>You dealt {this.state.diff} points of {this.state.damage_type} damage!</p>
                        <button id='modal-cancel' onClick={this.hideAttack}>Undo</button>
                        <button id='modal-confirm' onClick={this.confirmAttack} >Alright!</button>
                    </div>
                    <div id='overlay' onClick={this.hideAttack} className={this.state.showAttack ? '' : 'hidden'} ></div>
                </StyledModalGroup>
            </div>
        )
    }
}

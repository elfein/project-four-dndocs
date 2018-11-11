import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

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
p {
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

export default class SpellActionItem extends Component {
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
        this.setState({ diff: amount, damage_type: this.props.spell.damage_type })
    }

    determineAttack = () => {
        let amount = 0
        for (let i = 0; i < (this.props.spell.die_number); i++) {
            amount += (Math.ceil(Math.random() * this.props.spell.die_type))
        }
        // add weapon bonus
        amount += this.props.spell.bonus
        return amount
    }

    confirmAttack = async () => {
        const attack = {
            diff: this.state.diff,
            diff_type: this.state.damage_type,
            source: this.props.spell.name,
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
        const spell = this.props.spell
        return (
            <div>
                <div onClick={this.rollAttack}>
                    <h3>{spell.name}</h3>
                    <div className='spell-data'>
                        <h4>{spell.die_number}d{spell.die_type} {spell.damage_type}</h4>
                    </div>
                </div>
                <StyledModalGroup>
                    <div id='modal' className={this.state.showAttack ? '' : 'hidden'}>
                        <p>You dealt {this.state.diff} points of {this.state.damage_type} damage!</p>
                        <button onClick={this.hideAttack}>Undo</button>
                        <button id='delete' onClick={this.confirmAttack} >Alright!</button>
                    </div>
                    <div id='overlay' onClick={this.hideAttack} className={this.state.showAttack ? '' : 'hidden'} ></div>
                </StyledModalGroup>
            </div>
        )
    }
}

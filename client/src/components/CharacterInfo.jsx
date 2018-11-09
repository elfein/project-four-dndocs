import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import CharacterDataContainer from './CharacterDataContainer';

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
#fight {
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

export default class CharacterInfo extends Component {
    state = {
        showFightModal: false
    }

    showFightModal = () => {
        this.setState({ showFightModal: !this.state.showFightModal })
    }

    hideFightModal = () => {
        this.setState({ showFightModal: false })
    }

    render() {
        const character = this.props.character
        return (
            <div>
                <img src={this.props.classImg} alt='classpic' />
                <div>
                    <h3>{character.race} {character.class_name}</h3>
                    <span><h1>HP: {character.current_hp}</h1> / {character.max_hp} </span>
                </div>
                <div><Link to={`/characters/${character.id}/edit`}><button>Edit</button></Link></div>
                <button onClick={this.showFightModal}>Fight</button>
                <button onClick={this.props.takeLongRest}>Long Rest</button>

                <CharacterDataContainer
                    getCharacter={this.props.getCharacter}
                    character={character}
                />

                <StyledModalGroup>
                    <div id='modal' className={this.state.showFightModal ? '' : 'hidden'}>
                        <p>Ready?</p>
                        <button onClick={this.hideFightModal}>Wait...</button>
                        <button id='fight' onClick={this.props.startFight} >Bring it on!</button>
                    </div>
                    <div id='overlay' onClick={this.hideFightModal} className={this.state.showFightModal ? '' : 'hidden'} ></div>
                </StyledModalGroup>
            </div>
        )
    }
}

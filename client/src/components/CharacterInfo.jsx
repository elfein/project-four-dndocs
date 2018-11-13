import React, { Component } from 'react'
import styled from 'styled-components'
import CharacterDataContainer from './CharacterDataContainer';

const StyledDiv = styled.div`
img {
    background-color: rgb(40,65,74);
    padding: 6px;
}
.top {
background-color: rgb(255,240,210);
color: rgb(40,65,74);
padding: 3px;
display: flex;
h3 {
    margin: 5px;
}
}
.hp {
    display: flex;
    margin: 3px 0;
    button {
        text-transform: uppercase;
        font-weight: 600;
        background: rgb(140,169,84);
        margin: 0 3px 0 0;
        i {
            display: block;
        }
    }
}
span {
    display: flex;
    justify-content: center;
    align-items: baseline;
    background-color: rgb(80,175,164);
    width: 100%;
}
#fight {
    width: 100%;
    padding: 12px;
    background-color: rgb(230,180,40);
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 600;
    color: rgb(40,65,74);
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
  background-color: rgba(50,50,55,0.7);
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
#modal-cancel, #modal-fight {
    margin: 0;
    width: 50%;
    height: 36px;
    text-transform: uppercase;
    font-size: 18px;
}
#modal-cancel {
 border-radius: 0 0 0 3px;
 background-color: rgb(215,190,110);
}
#modal-fight {
 border-radius: 0 0 3px 0;
 background-color: rgb(185,210,140);
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
                <StyledDiv>
                    <div className='top' >
                        <img src={this.props.classImg} alt='classpic' />
                        <div>
                            <h3>Level {character.level}</h3>
                            <h3>{character.race} {character.class_name}</h3>
                        </div>
                    </div>
                    <div className='hp'>
                        <button onClick={this.props.takeLongRest}><i className="fas fa-bed"></i>Long Rest</button>
                        <span><h1>HP: {character.current_hp} </h1> /{character.max_hp} </span>
                    </div>
                    <button id='fight' onClick={this.showFightModal}>* Fight *</button>
                </StyledDiv>

                <CharacterDataContainer
                    getCharacter={this.props.getCharacter}
                    character={character}
                />

                <StyledModalGroup>
                    <div id='modal' className={this.state.showFightModal ? '' : 'hidden'}>
                        <p>Ready?</p>
                        <button id='modal-cancel' onClick={this.hideFightModal}>Wait...</button>
                        <button id='modal-fight' onClick={this.props.startFight} >Bring it on!</button>
                    </div>
                    <div id='overlay' onClick={this.hideFightModal} className={this.state.showFightModal ? '' : 'hidden'} ></div>
                </StyledModalGroup>
            </div>
        )
    }
}

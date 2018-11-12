import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import CharacterInfo from './CharacterInfo';
import CharacterFight from './CharacterFight';
import CharacterLog from './CharacterLog';

const StyledDiv = styled.div`
margin: 0 0 50px 0;

footer {
  text-align: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2000;
  background-color: rgba(255,255,255,0.8);
  button {
    width: 30vw;
  }
}

img {
    height: 50px;
}
`

export default class CharacterContainer extends Component {
  state = {
    character: {
      name: '',
      class_name: ''
    },
    lastEncounter: {
      id: ''
    },
    classImg: '',
    showInfo: true,
    showFight: false,
    showLog: false,
    fightMode: false
  }

  // --------------- Getting initial data for all screens ---------------

  setClassImg = () => {
    switch (this.state.character.class_name) {
      case 'Barbarian':
        this.setState({ classImg: 'https://66.media.tumblr.com/bc443afb49fbfc099e2222b96fee1140/tumblr_pi3cbuiQra1uj0ljmo9_1280.png' })
        break
      case 'Bard':
        this.setState({ classImg: 'https://66.media.tumblr.com/ac4c45b41d74ed85cf58a2c62e4658b7/tumblr_pi3cbuiQra1uj0ljmo8_1280.png' })
        break
      case 'Cleric':
        this.setState({ classImg: 'https://66.media.tumblr.com/a85f7a8d503126fa2ba3dcaa750ee346/tumblr_pi3cbuiQra1uj0ljmo7_1280.png' })
        break
      case 'Druid':
        this.setState({ classImg: 'https://66.media.tumblr.com/c8bb9fd92bd2c4e374d37f65482794f0/tumblr_pi3cbuiQra1uj0ljmo6_1280.png' })
        break
      case 'Fighter':
        this.setState({ classImg: 'https://66.media.tumblr.com/7bb943a7e4355f6c4dfba2d351d975c6/tumblr_pi3cbuiQra1uj0ljmo4_1280.png' })
        break
      case 'Monk':
        this.setState({ classImg: 'https://66.media.tumblr.com/d85a5e62f76672f9726ad11477b66708/tumblr_pi3cbuiQra1uj0ljmo3_1280.png' })
        break
      case 'Paladin':
        this.setState({ classImg: 'https://66.media.tumblr.com/338f5b086366c3257076724a90cb7cc5/tumblr_pi3cbuiQra1uj0ljmo2_1280.png' })
        break
      case 'Ranger':
        this.setState({ classImg: 'https://66.media.tumblr.com/a40282433e8a67476678bf1df43d5149/tumblr_pi3cbuiQra1uj0ljmo5_1280.png' })
        break
      case 'Rogue':
        this.setState({ classImg: 'https://66.media.tumblr.com/0d334eaa2d3baae7b3bd062ca60c0464/tumblr_pi3cbuiQra1uj0ljmo1_1280.png' })
        break
      case 'Sorcerer':
        this.setState({ classImg: 'https://66.media.tumblr.com/686f8c129188b3582d5690322bb7e282/tumblr_pi3cflCkjk1uj0ljmo2_1280.png' })
        break
      case 'Warlock':
        this.setState({ classImg: 'https://66.media.tumblr.com/7841bc93457d07c20e5e2b599eae5647/tumblr_pi3cflCkjk1uj0ljmo1_1280.png' })
        break
      case 'Wizard':
        this.setState({ classImg: 'https://66.media.tumblr.com/dae940cdc2f70ad83360f49a35d87269/tumblr_pi3cflCkjk1uj0ljmo3_1280.png' })
        break
      default:
        this.setState({ classImg: 'https://66.media.tumblr.com/dae940cdc2f70ad83360f49a35d87269/tumblr_pi3cflCkjk1uj0ljmo3_1280.png' })
        break
    }
  }

  getCharacter = async () => {
    const response = await axios.get(`/api/characters/${this.props.match.params.id}`)
    this.setState({ character: response.data })
  }

  componentDidMount = async () => {
    await this.getCharacter()
    this.setClassImg()
  }

  // --------------- Toggling between major tabs ---------------

  toggleInfo = () => {
    this.setState({ showInfo: true, showFight: false, showLog: false })
  }

  toggleFight = () => {
    this.checkForFight()
    this.setState({ showInfo: false, showFight: true, showLog: false })
  }

  toggleLog = () => {
    this.setState({ showInfo: false, showFight: false, showLog: true })
  }

  // --------------- Encounter Creation ---------------

  startFight = async () => {
    const fight = await axios.post(`/api/characters/${this.props.match.params.id}/encounters`, { encounter_type: 'Fight' })
    this.setState({ lastEncounter: fight.data })
    this.toggleFight()
  }

  resetEncounter = async () => {
    this.setState({
      lastEncounter: {
        id: ''
      }
    })
  }

  checkForFight = () => {
    if (this.state.lastEncounter.encounter_type === "Fight") {
      this.setState({ fightMode: true })
    } else {
      this.setState({ fightMode: false })
    }
  }

  takeLongRest = async () => {
    // check if healing is necessary
    if (this.state.character.current_hp !== this.state.character.max_hp) {
      // create a new encounter for the long rest action to nest within
      const restEncounter = await axios.post(`/api/characters/${this.props.match.params.id}/encounters`, { encounter_type: 'Long Rest' })
      await axios.post(`/api/encounters/${restEncounter.data.id}/hpactions`, {
        diff: (this.state.character.max_hp - this.state.character.current_hp),
        diff_type: 'Healing',
        source: 'Long Rest'
      })
      const character = { ...this.state.character }
      character.current_hp = this.state.character.max_hp
      this.setState({ character, lastEncounter: restEncounter.data })
    }
  }

  // --------------- End functions ---------------

  render() {
    const character = this.state.character
    return (
      <StyledDiv>
        <Link to={`/accounts/${this.state.character.account_id}`}>To Account</Link>
        <h2>{character.name}</h2>

        {this.state.showInfo ?
          <CharacterInfo
            character={character}
            classImg={this.state.classImg}
            startFight={this.startFight}
            takeLongRest={this.takeLongRest}
            getCharacter={this.getCharacter}
          /> : null}

        {this.state.showFight ?
          <CharacterFight
            encounter={this.state.lastEncounter}
            character={character}
            classImg={this.state.classImg}
            toggleInfo={this.toggleInfo}
            getCharacter={this.getCharacter}
            resetEncounter={this.resetEncounter}
            fightMode={this.state.fightMode}
          /> : null}

        {this.state.showLog ?
          <CharacterLog
            getCharacter={this.getCharacter}
            character={character}
            classImg={this.state.classImg} />
          : null}

        <footer>
          <button onClick={this.toggleInfo}>Info</button>
          <button onClick={this.toggleFight}>Fight</button>
          <button onClick={this.toggleLog}>Log</button>
        </footer>
      </StyledDiv>
    )
  }
}

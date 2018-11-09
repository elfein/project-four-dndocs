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
        this.setState({ classImg: 'https://66.media.tumblr.com/4d3f2fbd3aecadc6edae3ea5b9ad2ff1/tumblr_phuahjz6Yo1uj0ljmo1_1280.jpg' })
        break
      case 'Bard':
        this.setState({ classImg: 'https://66.media.tumblr.com/3001019d16aecf3e37bdce0e6c533224/tumblr_phubmixpkE1uj0ljmo1_1280.jpg' })
        break
      case 'Cleric':
        this.setState({ classImg: 'https://66.media.tumblr.com/452f6553822dd63a3eaf502f76a0eef3/tumblr_phubmixpkE1uj0ljmo4_1280.jpg' })
        break
      case 'Druid':
        this.setState({ classImg: 'https://66.media.tumblr.com/6b08452ddf4ecd152d83302e5db133ee/tumblr_phubmixpkE1uj0ljmo3_640.jpg' })
        break
      case 'Fighter':
        this.setState({ classImg: 'https://66.media.tumblr.com/1eb7502b753adb444cffed2e03198d60/tumblr_phubmixpkE1uj0ljmo2_1280.jpg' })
        break
      case 'Monk':
        this.setState({ classImg: 'https://66.media.tumblr.com/cdbe6da422c1089115361080c1dc876f/tumblr_phuc0s0qUq1uj0ljmo2_540.jpg' })
        break
      case 'Paladin':
        this.setState({ classImg: 'https://66.media.tumblr.com/82fd649deffc116718633e915c19a82e/tumblr_phuc0s0qUq1uj0ljmo4_1280.jpg' })
        break
      case 'Ranger':
        this.setState({ classImg: 'https://66.media.tumblr.com/748ef1b83d0d8acaf0c0ac1b09e53563/tumblr_phuc0s0qUq1uj0ljmo3_1280.jpg' })
        break
      case 'Rogue':
        this.setState({ classImg: 'https://66.media.tumblr.com/261ea032091cabf221e2e9e9d21e5bc6/tumblr_phuc0s0qUq1uj0ljmo1_1280.jpg' })
        break
      case 'Sorcerer':
        this.setState({ classImg: 'https://66.media.tumblr.com/5eb97178089dfa2cb3737ca8645e0f35/tumblr_phuc3jbmMz1uj0ljmo1_540.jpg' })
        break
      case 'Warlock':
        this.setState({ classImg: 'https://66.media.tumblr.com/3a03ca5f9a0d3885ec376b862f5a4dc0/tumblr_pht4c9I5yJ1uj0ljmo1_1280.jpg' })
        break
      case 'Wizard':
        this.setState({ classImg: 'https://66.media.tumblr.com/8cd61595955da46ef854221eb470accc/tumblr_phuc3jbmMz1uj0ljmo2_1280.jpg' })
        break
      default:
        this.setState({ classImg: 'https://66.media.tumblr.com/8cd61595955da46ef854221eb470accc/tumblr_phuc3jbmMz1uj0ljmo2_1280.jpg' })
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

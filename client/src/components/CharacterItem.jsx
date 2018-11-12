import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledDiv = styled.div`
padding: 12px;
img {
    height: 50px;
}
display: flex;
div {
    padding: 0 12px;
}
h3, h5 {
    margin: 0;
}
`

export default class CharacterItem extends Component {
    state = {
        character: {
            id: '',
            name: ''
        },
        classImg: ''
    }

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
        const response = await axios.get(`/api/characters/${this.props.character.id}`)
        return response.data
    }

    componentDidMount = async () => {
        const character = await this.getCharacter()
        this.setState({ character })
        this.setClassImg()
    }

    render() {
        const character = this.state.character
        return (
            <Link to={`/characters/${character.id}`} >
                <StyledDiv>
                    <img src={this.state.classImg} alt='classpic' />
                    <div>
                        <h3>{character.name}</h3>
                        <h5>{character.race} {character.class_name}</h5>
                    </div>
                </StyledDiv>
            </Link>
        )
    }
}

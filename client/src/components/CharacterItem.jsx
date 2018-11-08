import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledDiv = styled.div`
img {
    height: 50px;
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
            <StyledDiv>
                <Link to={`/characters/${character.id}`} >
                    <img src={this.state.classImg} alt='classpic' />
                    <div>
                        <h3>{character.name}</h3>
                        <h5>{character.race} {character.class_name}</h5>
                    </div>
                </Link>
            </StyledDiv>
        )
    }
}

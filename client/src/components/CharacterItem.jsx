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
        }
    }

    getCharacter = async () => {
        const response = await axios.get(`/api/characters/${this.props.character.id}`)
        return response.data
    }

    componentDidMount = async () => {
        const character = await this.getCharacter()
        this.setState({ character })
    }

    render() {
        const character = this.state.character
        return (
            <StyledDiv>
                <Link to={`/accounts/${this.props.accountId}/characters/${character.id}`} >
                    <img src='https://66.media.tumblr.com/3a03ca5f9a0d3885ec376b862f5a4dc0/tumblr_pht4c9I5yJ1uj0ljmo1_1280.jpg' alt='classpic' />
                    {character.name}
                </Link>
            </StyledDiv>
        )
    }
}

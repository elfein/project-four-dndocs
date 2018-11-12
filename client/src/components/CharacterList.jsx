import React, { Component } from 'react'
import axios from 'axios'
import CharacterItem from './CharacterItem';
import styled from 'styled-components'

const StyledDiv = styled.div`
padding: 24px 0;
`

export default class CharacterList extends Component {
    state = {
        characters: []
    }

    getCharacters = async () => {
        const response = await axios.get(`/api/accounts/${this.props.id}/characters`)
        return response.data
    }

    componentDidMount = async () => {
        const characters = await this.getCharacters()
        this.setState({ characters })
    }

  render() {
      const characterList = this.state.characters.map((character, i) => {
          return <CharacterItem key={i} character={character} accountId={this.props.id} />
      })
    return (
      <StyledDiv>
        {characterList}
      </StyledDiv>
    )
  }
}

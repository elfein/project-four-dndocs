import React, { Component } from 'react'
import styled from 'styled-components'
import SaveActionItem from './SaveActionItem';

const StyledDiv = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
`

export default class SaveActionList extends Component {
  render() {
    const character = this.props.character
    let stats = []
    if (character.name) {
     stats = [['STR', character.str], ['DEX', character.dex], ['CON', character.con], ['INT', character.int], ['WIS', character.wis], ['CHA', character.cha]]
    }
     let statlist = []
    if (stats[0]) {
      statlist = stats.map((stat, i) => {
          return <SaveActionItem key={i} 
          stat={stat} 
          character={character} 
          getCharacter={this.props.getCharacter} />
      })
      }
    return (
      <StyledDiv>
        {statlist}
      </StyledDiv>
    )
  }
}

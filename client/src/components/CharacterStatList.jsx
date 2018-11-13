import React, { Component } from 'react'
import StatItem from './StatItem';
import styled from 'styled-components'

const StyledDiv = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-around;
background-color: rgb(185,120,90);
padding: 3px 0;
`

export default class CharacterStatList extends Component {
  render() {
      const character = this.props.character
      let stats = []
      if (character.name) {
       stats = [['STR', character.str], ['DEX', character.dex], ['CON', character.con], ['INT', character.int], ['WIS', character.wis], ['CHA', character.cha]]
      }
       let statlist = []
      if (stats[0]) {
        statlist = stats.map((stat, i) => {
            return <StatItem key={i} 
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

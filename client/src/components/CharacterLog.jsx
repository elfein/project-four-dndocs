import React, { Component } from 'react'
import Radar from 'react-d3-radar'
import HealthChart from './HealthChart';
import styled from 'styled-components'
import Hplist from './Hplist';

const StyledDiv = styled.div`
img.class-pic {
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

.radar {
    background-color: rgb(255,250,230);
    max-width: 400px;
    margin: 12px 0;
    padding: 12px 0 0 0;
    h4 {
        color: rgb(40,65,74);
        margin: 0 0 -12px 0;
        text-transform: uppercase;
        text-align: center;
    }
}
`

export default class CharacterLog extends Component {

    render() {
        const character = this.props.character
        return (
            <StyledDiv>
                <div className='top'>
                    <img className='class-pic' src={this.props.classImg} alt='classpic' />
                    <div>
                        <h3>{character.race} {character.class_name}</h3>
                        <h3>Current HP: {character.current_hp}</h3>
                    </div>
                </div>
                <div className='radar'>
                    <h4>Character Stats</h4>
                    <Radar
                        width={300}
                        height={300}
                        padding={50}
                        domainMax={20}
                        data={{
                            variables: [
                                { key: 'str', label: 'STR' },
                                { key: 'dex', label: 'DEX' },
                                { key: 'con', label: 'CON' },
                                { key: 'int', label: 'INT' },
                                { key: 'wis', label: 'WIS' },
                                { key: 'cha', label: 'CHA' }
                            ],
                            sets: [
                                {
                                    key: this.props.character.name,
                                    label: 'Skills',
                                    values: {
                                        str: character.str,
                                        dex: character.dex,
                                        con: character.con,
                                        int: character.int,
                                        wis: character.wis,
                                        cha: character.cha
                                    }
                                }
                            ]
                        }}
                    />
                </div>
                <Hplist
                    getCharacter={this.props.getCharacter}
                    character={this.props.character}
                />
                <HealthChart
                    getCharacter={this.props.getCharacter}
                    character={this.props.character}
                />
            </StyledDiv>
        )
    }
}

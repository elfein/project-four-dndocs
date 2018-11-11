import React, { Component } from 'react'
// import RadarStatChart from './RadarStatChart';
import Radar from 'react-d3-radar'
import HealthChart from './HealthChart';

export default class CharacterLog extends Component {

    render() {
        const character = this.props.character
        return (
            <div>
                <img src={this.props.classImg} alt='classpic' />
                <div>
                    <h3>{character.race} {character.class_name}</h3>
                </div>
                {/* <RadarStatChart 
                character={character}
                /> */}
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
                <div id='chart'></div>
                <HealthChart 
                character={this.props.character}
                />
            </div>
        )
    }
}

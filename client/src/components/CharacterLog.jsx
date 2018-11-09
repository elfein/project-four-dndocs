import React, { Component } from 'react'
import Radar from 'react-d3-radar'


export default class CharacterLog extends Component {

    // // static propTypes = { ...this.props.character }

    // componentDidMount() {
    //     const character = this.props.character
    //     const d = [
    //         [
    //             { axis: "STR", value: character.str },
    //             { axis: "DEX", value: character.dex },
    //             { axis: "CON", value: character.con }
    //         ]
    //     ]

    //     RadarChart.draw("#chart", d)
    // }

    // shouldComponentUpdate() {
    //     // Prevents component re-rendering
    //     return false
    // }

    // _setRef(componentNode) {
    //     this._rootNode = componentNode
    // }

    render() {
        const character = this.props.character
        //     // [character.str, character.dex, character.con, character.int, character.wis, character.cha]

        //     RadarChart.draw("#chart", d)

        return (
            <div>
                <img src={this.props.classImg} alt='classpic' />
                <div>
                    <h3>{character.race} {character.class_name}</h3>
                </div>
                <Radar
                    width={400}
                    height={400}
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
                                    str: this.props.character.str,
                                    dex: this.props.character.dex,
                                    con: this.props.character.con,
                                    int: this.props.character.int,
                                    wis: this.props.character.wis,
                                    cha: this.props.character.cha
                                }
                            }
                        ]
                    }}
                />
                <div id='chart'></div>
            </div>
        )
    }
}

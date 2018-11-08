import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class CharacterInfo extends Component {
    render() {
        const character = this.props.character
        return (
            <div>
                <img src={this.props.classImg} alt='classpic' />
                <div>
                    <h3>{character.race} {character.class_name}</h3>
                    <span><h1>HP: {character.current_hp}</h1> / {character.max_hp} </span>
                </div>
                <div><Link to={`/characters/${character.id}/edit`}><button>Edit</button></Link></div>
                <button onClick={this.props.toggleFight}>Fight</button>
                <button onClick={this.props.takeLongRest}>Long Rest</button>
            </div>
        )
    }
}

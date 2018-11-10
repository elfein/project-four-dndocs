import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const StyledDiv = styled.div`
text-align: center;
width: 110px;
height: 60px;
h6 {
    margin: 4px 0 10px 0;
}
input {
    text-align: center;
    width: 100px;
}
`

export default class StatItem extends Component {
    state = {
        stat: ['', ''],
        character: {
            str: '',
            dex: '',
            wis: '',
            cha: '',
            int: '',
            con: ''
        },
        showForm: false
    }

    getInfo = () => {
        let stat = this.props.stat
        if (!stat[1]) {
            stat[1] = 10
        }
        this.setState({ stat, character: this.props.character })
    }

    showForm = () => {
        this.setState({ showForm: true })
    }

    endForm = async (event) => {
        if (event.target.value) {
            const character = {...this.props.character}
            character[this.state.stat[0].toLowerCase()] = event.target.value
            await axios.put(`/api/characters/${this.state.character.id}`, character)
            await this.props.getCharacter()
        } else {
            this.state.stat[1] = 10
        }
        this.setState({ showForm: false })
    }

    handleChange = (event) => {
        const stat = [...this.state.stat]
        stat[1] = event.target.value
        this.setState({ stat })
    }

    componentDidMount = () => {
        this.getInfo()
    }

    render() {
        return (
            <StyledDiv onClick={this.showForm}>
                {this.state.showForm ? <input type='number' autoFocus onBlur={this.endForm} value={this.state.stat[1]} onChange={this.handleChange} /> 
                : this.state.stat[1]}
                <h6>{this.state.stat[0]}</h6>
            </StyledDiv>
        )
    }
}

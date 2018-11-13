import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const StyledDiv = styled.div`
width: 32vw;
margin: 3px 0;
padding: 12px 0;
color: rgb(40,65,74);
background-color: rgb(255,240,210);
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
h6 {
    margin: 4px 0;
}
input {
    text-align: center;
    width: 100px;
}
p {
    font-size: 27px;
    margin: 0;
}
@media (min-device-width: 1000px) {
    max-width: 180px;
}
`

export default class StatItem extends Component {
    state = {
        stat: ['', ''],
        showForm: false
    }

    getInfo = () => {
        let stat = this.props.stat
        if (!stat[1]) {
            stat[1] = 10
        }
        this.setState({ stat })
    }

    showForm = () => {
        this.setState({ showForm: true })
    }

    endForm = async (event) => {
        if (event.target.value) {
            const character = {...this.props.character}
            character[this.state.stat[0].toLowerCase()] = event.target.value
            await axios.put(`/api/characters/${this.props.character.id}`, character)
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
                : <p>{this.state.stat[1]}</p>}
                <h6>{this.state.stat[0]}</h6>
            </StyledDiv>
        )
    }
}

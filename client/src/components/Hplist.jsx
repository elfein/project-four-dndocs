import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import RollList from './RollList';

const StyledDiv = styled.div`
select {
    background: #fff;
    border-radius: 0;
    border: none;
    width: 30vw;
    height: 30px;
    font-size: 18px;
}
@media (min-device-width: 1000px) {
select {
  max-width: 200px;
}
}
`

export default class Hplist extends Component {
    state = {
        encounters: [],
        hpactions: [],
        attacks: [],
        hits: [],
        heals: [],
        selectedActionList: 'All'
    }

    componentDidMount = async () => {
        await this.getData()
    }

    getData = async () => {
        const encountersData = await axios.get(`/api/characters/${this.props.character.id}/encounters`)
        const encounters = await encountersData.data
        await this.getHpactions(encounters)
    }

    getHpactions = async (encounters) => {
        let allHpactions = []
        for (let i = 0; i < encounters.length; i++) {
            const hpactionData = await axios.get(`/api/encounters/${encounters[i].id}/hpactions`)
            const hpactions = await hpactionData.data
            for (let j = 0; j < hpactions.length; j++) {
                allHpactions.push(hpactions[j])
            }
        }
        this.setState({ encounters, hpactions: allHpactions })
    }

    handleChange = (event) => {
        let selectedActionList = this.state.selectedActionList
        selectedActionList = event.target.value
        this.setState({ selectedActionList })
    }

    render() {
        let encounterOptions = []
        if (this.state.encounters[0]) {
            encounterOptions = this.state.encounters.map((encounter, i) => {
                return <option key={i} value={`${encounter.id}`}>{`Encounter #${encounter.id}`}</option>
            })
        }

        let actualList = []
        switch (this.state.selectedActionList) {
            case 'All':
                actualList = this.state.hpactions
                break
            case 'Attacks':
                actualList = this.state.hpactions.filter((hpaction) => {
                    return hpaction.diff > 0 && hpaction.diff_type !== 'Healing'
                })
                break
            case 'Hits':
                actualList = this.state.hpactions.filter((hpaction) => {
                    return hpaction.diff < 0
                })
                break
            case 'Heals':
                actualList = this.state.hpactions.filter((hpaction) => {
                    return hpaction.diff > 0 && hpaction.diff_type === 'Healing'
                })
                break
            default:
                actualList = this.state.hpactions.filter((hpaction) => {
                    return hpaction.encounter_id === this.state.selectedActionList
                })
                break
        }

        return (
            <StyledDiv>
                <h3>Rolls: Attacks, Hits, and Heals</h3>
                <select value={this.state.selectedActionList} onChange={this.handleChange}>
                    <option value='All'>ALL</option>
                    <option value='Attacks'>Attacks</option>
                    <option value='Hits'>Hits</option>
                    <option value='Heals'>Heals</option>
                    {encounterOptions}
                </select>
                <RollList
                rollList={actualList} />
            </StyledDiv>
        )
    }
}

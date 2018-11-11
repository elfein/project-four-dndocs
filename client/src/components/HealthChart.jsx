import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import * as d3 from 'd3'

const StyledDiv = styled.div`
.line {
  fill: none;
  stroke: blue;
  stroke-width: 2px;
}
`

export default class HealthChart extends Component {
    state = {
        encounters: [],
        hpactions: []
    }

    componentDidMount = async () => {
        console.log(this.props.character)
        await this.getData()
        console.log(this.state.hpactions)
        const data = this.state.hpactions
        
        const margin = { top: 20, right: 20, bottom: 20, left: 20 },
            width = 300 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom

        const x = d3.scaleLinear().range([0, width])
        const y = d3.scaleLinear().range([height, 0])

        const valueLine = d3.line()
            .x(function (data) { return x(data.id) })
            .y(function (data) { return y(data.diff) })

        const svg = d3.select(".body").append("svg")
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append("g")
            .attr('transform', "translate(" + margin.left + "," + margin.top + ")")

        x.domain(d3.extent(data, function (d) { return d.id }))
        y.domain([d3.min(data, function (d) { return d.diff }), d3.max(data, function (d) { return d.diff })])

        svg.append("path")
            .data(data)
            .attr("class", "line")
            .attr("d", valueLine)

        svg.append('g')
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))

        svg.append("g")
            .call(d3.axisLeft(y))
    }

    shouldComponentUpdate = () => {
        return false
    }
    
    getData = async () => {
        const encountersData = await axios.get(`/api/characters/${this.props.character.id}/encounters`)
        const encounters = encountersData.data
        this.setState({ encounters })
        this.getHpactions(encounters)
    }
    
    getHpactions = async (encounters) => {
        let allHpactions = []
        for (let i = 0; i < encounters.length; i++) {
            const hpactionData = await axios.get(`/api/encounters/${encounters[i].id}/hpactions`)
            const hpactions = hpactionData.data
            for (let j = 0; j < hpactions.length; j++) {
                allHpactions.push(hpactions[j])
            }
        }
        this.setState({ hpactions: allHpactions })
    }
    
    render() {
        console.log(this.state.hpactions)
        // const data = this.state.hpactions
        
        // const margin = { top: 20, right: 20, bottom: 20, left: 20 },
        //     width = 300 - margin.left - margin.right,
        //     height = 300 - margin.top - margin.bottom

        // const x = d3.scaleLinear().range([0, width])
        // const y = d3.scaleLinear().range([height, 0])

        // const valueLine = d3.line()
        //     .x(function (data) { return x(data.id) })
        //     .y(function (data) { return y(data.diff) })

        // const svg = d3.select(".body").append("svg")
        //     .attr('width', width + margin.left + margin.right)
        //     .attr('height', height + margin.top + margin.bottom)
        //     .append("g")
        //     .attr('transform', "translate(" + margin.left + "," + margin.top + ")")

        // x.domain(d3.extent(data, function (d) { return d.id }))
        // y.domain([d3.min(data, function (d) { return d.diff }), d3.max(data, function (d) { return d.diff })])

        // svg.append("path")
        //     .data(data)
        //     .attr("class", "line")
        //     .attr("d", valueLine)

        // svg.append('g')
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(d3.axisBottom(x))

        // svg.append("g")
        //     .call(d3.axisLeft(y))

        return (
            <StyledDiv>
                <div className="body"></div>
            </StyledDiv>
        )
    }
}

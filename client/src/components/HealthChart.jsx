import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import * as d3 from 'd3'

const StyledDiv = styled.div`
.line-container {
  fill: none;
}
.line { 
    stroke: steelblue;
    stroke-width: 2;
    fill: none;
}
.overlay {
  fill: none;
  pointer-events: all;
}

.focus circle {
  fill: none;
  stroke: steelblue;
}
`

export default class HealthChart extends Component {
    state = {
        encounters: [],
        hpactions: []
    }

    componentDidMount = async () => {
        await this.props.getCharacter()
        await this.getData()
        if (this.state.hpactions[0]) {
            const data = this.state.hpactions.slice(0, 10)

            const margin = { top: 30, right: 30, bottom: 30, left: 30 },
                width = 320 - margin.left - margin.right,
                height = 300 - margin.top - margin.bottom

            const x = d3.scaleLinear().range([0, width])
            const y = d3.scaleLinear().range([height, 0])

            const valueline = d3.line()
                .x(function (data) { return x(data.id) })
                .y(function (data) { return y(data.diff) })

            const svg = d3.select(".line-container").append("svg")
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append("g")
                .attr('transform',
                    "translate(" + margin.left + "," + margin.top + ")")

            x.domain(d3.extent(data, function (d) { return d.id }))
            y.domain([d3.min(data, function (d) { return d.diff }), d3.max(data, function (d) { return d.diff })])

            svg.append("path")
                .attr("class", "line")
                .attr("d", valueline(data))

            svg.append('g')
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))

            svg.append("g")
                .call(d3.axisLeft(y))

            const focus = svg.append("g")
                .attr("class", "focus")
                .style("display", "none")

            focus.append("circle")
                .attr("r", 4.5)
                .append("text")
                .text("hello")

            svg.append("rect")
                .attr("class", "overlay")
                .attr("width", width)
                .attr("height", height)
                .on("mouseover", function () {
                    focus.style("display", null)
                })
                .on("mouseout", function () {
                    focus.style("display", "none")
                })
                .on("mousemove", mousemove)

            const bisectDate = d3.bisector(function (d) { return d.id }).left

            function mousemove() {
                var x0 = x.invert(d3.mouse(this)[0]),
                    i = bisectDate(data, x0, 1),
                    d0 = data[i - 1],
                    d1 = data[i],
                    d = x0 - d0.id > d1.id - x0 ? d1 : d0;
                focus.attr("transform", "translate(" + x(d.id) + "," + y(d.diff) + ")")
            }
        }
    }

    // shouldComponentUpdate = () => {
    //     return false
    // }

    getData = async () => {
        const encountersData = await axios.get(`/api/characters/${this.props.character.id}/encounters`)
        const encounters = await encountersData.data
        await this.setState({ encounters })
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
        this.setState({ hpactions: allHpactions })
    }

    _setRef = (componentNode) => {
        this._rootNode = componentNode
    }

    render() {
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
                <div className="line-container" ref={this._setRef.bind(this)} />
            </StyledDiv>
        )
    }
}

import React, { Component } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
import RadarChart from 'radar-chart-d3'

const StyledDiv = styled.div`
.radar-chart .area {
  fill-opacity: 0.7;
}
.radar-chart.focus .area {
  fill-opacity: 0.3;
}
.radar-chart.focus .area.focused {
  fill-opacity: 0.9;
}
.area.germany, .germany .circle {
  fill: #FFD700;
  stroke: none;
}
.area.argentina, .argentina .circle {
  fill: #ADD8E6;
  stroke: none;
}
`


export default class RadarStatChart extends Component {
    state = {
        data: []
    }

    getData = () => {
        const data = [
            {
                className: 'stats',
                axes: [
                    { axis: 'STR', value: this.props.character.str },
                    { axis: 'DEX', value: this.props.character.dex },
                    { axis: 'CON', value: this.props.character.con },
                    { axis: 'INT', value: this.props.character.int },
                    { axis: 'WIS', value: this.props.character.wis },
                    { axis: 'CHA', value: this.props.character.cha },
                ]
            }
        ]
        this.setState({ data })
    }

    makeChart = () => {
        console.log(RadarChart)
        const chart = RadarChart.chart()
        const svg = d3.select('.chart-container').append('svg')
            .attr('width', 400)
            .attr('height', 400)

        svg.append('g').classed('focus', 1).datum(this.state.data).call(chart)

        chart.config();
        // all options with default values
        chart.config({
            containerClass: 'radar-chart', // target with css, default stylesheet targets .radar-chart
            w: 600,
            h: 600,
            factor: 0.95,
            factorLegend: 1,
            levels: 3,
            maxValue: 0,
            minValue: 0,
            radians: 2 * Math.PI,
            color: d3.scaleOrdinal(d3.schemeCategory10), // pass a noop (function() {}) to decide color via css
            axisLine: true,
            axisText: true,
            circles: true,
            radius: 5,
            axisJoin: function (d, i) {
                return d.className || i;
            },
            tooltipFormatValue: function (d) {
                return d;
            },
            tooltipFormatClass: function (d) {
                return d;
            },
            transitionDuration: 300
        })
    }


    componentDidMount = () => {
        this.getData()
        this.makeChart()
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        return (
            <StyledDiv>
                <div className="chart-container"></div>
            </StyledDiv>
        )
    }
}

import React, { Component } from 'react'
import RollItem from './RollItem';
import * as d3 from 'd3'

export default class RollList extends Component {
    render() {

        const maxVal = d3.max(this.props.rollList, function (d) { return Math.abs(d.diff) })

        const rollList = this.props.rollList.map((roll, i) => {
            return <RollItem
                roll={roll}
                key={i}
                maxVal={maxVal} />
        })

        return (
            <div>
                {rollList}
            </div>
        )
    }
}

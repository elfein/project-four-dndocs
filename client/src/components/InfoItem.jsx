import React, { Component } from 'react'

export default class InfoItem extends Component {
  render() {
      const item = this.props.item
    return (
      <div>
        <h3>{item.name}</h3>
      </div>
    )
  }
}

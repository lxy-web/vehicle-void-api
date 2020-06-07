import React, { Component } from 'react'

export default class index extends Component {
    render() {
        return (
            <div className="dialog">
                 {this.props.children}
            </div>
        )
    }
}

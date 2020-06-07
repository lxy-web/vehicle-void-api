import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
class CarItem extends Component {
    goDetail=(id)=>{
        this.props.history.push("/car/"+id)
    }
    render() {
        let { list } = this.props
        return (
            <ul>
                {
                    list.map(v => {
                        return (
                            <li key={v.SerialID} onClick={() => { this.goDetail(v.SerialID) }}>
                                <p>
                                    <img data-src={v.Picture} src={require("../../static/nb.png")} alt="" />
                                </p>
                                <p>
                                    <span>{v.AliasName}</span>
                                    <span>{v.DealerPrice}</span>
                                </p>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}
export default withRouter(CarItem)

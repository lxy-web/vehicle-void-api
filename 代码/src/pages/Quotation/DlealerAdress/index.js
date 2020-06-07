import React, { Component } from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as quotationAction from "../../../store/action/quotation.js"
class DelalerAdress extends Component {
    changeFn(dealerId){
        this.props.setFlag(dealerId)
    }
    render() {
        let {flag,dealerId} = this.props
        return (
            <ul>
                <li>
                    <input type="checkbox" checked={flag} onChange={()=>{
                        this.changeFn(dealerId)
                    }} />
                </li>
                <li>
                    <p>名字吧</p>
                </li>
            </ul>
        );
    }
}

let mapStateToProps = (state) => {
    return {
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators(quotationAction, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(DelalerAdress);
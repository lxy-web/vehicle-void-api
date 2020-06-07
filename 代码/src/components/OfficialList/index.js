import React, { Component } from 'react'
import {connect} from "react-redux"
import {bindActionCreators}  from "redux"
import * as carAction from "../../store/action/car"
export  class OfficialList extends Component {
    getMakeList=(MasterID,i)=>{
        this.props.getMakeListById(MasterID)
        this.props.open()
        this.props.settableft(i)
    }
    render() {
        let {list} = this.props;
        return (
            <ul>
                {
                    list.map((v,i)=>{
                        return (
                            <li key={v.MasterID} onClick={()=>this.getMakeList(v.MasterID,i)}>
                                <p>
                                    <img src={require("../../static/nb.png")} alt="" data-src={v.CoverPhoto} /> 
                                </p>
                        <span>{v.Name}</span>

                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

let mapStateToProps=(state)=>{
    //ownProps 表示自己本身的props
     return {
         ...state.car
     }
}
let mapDispatchToProps=(dispatch)=>{
    //bindActionCreators 
    //将action和dispatch组合起来，生成mapDispatchToProps所需要的内容
     return bindActionCreators(carAction,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(OfficialList)

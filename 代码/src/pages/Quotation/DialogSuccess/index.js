import React, { Component } from 'react'
import style from "../styles/index.module.scss"
export default class DialogSuccess extends Component {
    clickFn=()=>{
        this.props.closeDialog()
    }
    render() {
        return (
            <div className={'dialogSuccss '+style.dialogSuccss}>
                <div className={'cont ' +style.cont}>
                   <p>询价成功</p>
                   <p>
                       <span>稍后会有专业的汽车顾问联系您</span>
                       <span>请保持手机畅通，如果不畅通,我会一直打</span>
                   </p>
                   <p onClick={()=>{this.clickFn()}}>
                      确定
                   </p>
                </div>
            </div>
        )
    }
}

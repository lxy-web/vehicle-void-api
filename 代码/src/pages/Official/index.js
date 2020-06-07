import React, { Component } from 'react'
import {connect}  from "react-redux"
import {bindActionCreators}  from "redux"
import MyLoading from "../../components/Loading/index"
import OfficialList from "../../components/OfficialList/index"
import Dialog from "../../components/Dialogs/index"
import CarItem from "../../components/CarItem/index"
import * as carAction from "../../store/action/car"

export class Official extends Component {
    state={
         curIndex:0,
         flags:false,
         tableft:""
    }
    componentDidMount(){
        this.props.getBrandList()
    }
    clickFn=(ind)=>{
        this.setState({
            curIndex:ind
        })
    }
    settableft=(ind)=>{
        this.setState({
            tableft:ind
        })
    }
    openFn=()=>{
        this.setState({
            flags:true
        })
    }
    closeFn=()=>{
        this.setState({
            flags:false
        })
    }

    render() {
        let {brandList,makeList} = this.props
        let {curIndex,flags,tableft} = this.state
        console.log(brandList)
        return (
            <div className="official">
               <MyLoading myclass={'main'} ind={curIndex}>
                   <div className="cont">
                      {
                      brandList.map((item,i)=>{
                           return (
                               <div className="item" key={item.id}>
                                   <p>{item.FirstSpell}</p>
                                   <OfficialList list={item.children} open={this.openFn} settableft={this.settableft.bind(this)}></OfficialList>
                               </div>
                           )
                      })
                      }
                   </div>
               </MyLoading>
               {
                   <ul className="rightSaid">
                       <li className={curIndex===0?'active':""} onClick={()=>this.clickFn(0)}>#</li>
                       {
                           brandList.map((item,i)=>{
                               return (
                                   <li key={item.id} className={(i+1)===curIndex?'active':''} onClick={()=>this.clickFn(i+1)}>
                                      {item.FirstSpell}                                     
                                   </li>
                               )
                           })
                       }
                   </ul>
               }
               {
                   flags?<Dialog>
                       <MyLoading ind={curIndex} myclass={'Dialogs-main'} tableft={tableft}>
                           <div className="Dialog-con">
                                {
                                    makeList.length&&makeList.map(v=>{
                                        return (<div className="dialog-item" key={v.GroupId}>
                                            <p>{v.GroupName}</p>
                                            <CarItem list={v.GroupList}></CarItem>
                                        </div>)
                                    })
                                }
                           </div>
                       </MyLoading>
                   </Dialog>:null
               }
            </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Official)

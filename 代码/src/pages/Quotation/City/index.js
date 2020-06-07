import React, { Component } from 'react';
import Dialogs from "../../../components/Dialogs/index"
import style from "../styles/index.module.scss"
import {connect}  from "react-redux"
import {bindActionCreators} from "redux"
import * as quotationAction from "../../../store/action/quotation"
class City extends Component {
    state={
        provinceid:""
    }
    componentDidMount(){
        this.props.getCityListFn()
    }
    cityTwoFn=(CityID)=>{
        console.log(CityID)
        this.setState({
            provinceid:CityID
        })
        this.props.getCityListTwoFn(CityID)
    }
    goQuotationFn=(v)=>{
        this.props.setLocation(v)
        this.props.cityCloseFn(v)
    }
    render() {
        let {cityList,locationList,cityTwoList} = this.props;
        console.log(cityTwoList)
        return (
            <div className={'city '+style.city}>
                 <div className={'citycont '+style.citycont}>
                     <div className={'cityone '+style.cityone}>
                            <p>定位城市</p>
                            <div>
                            <p>{locationList.CityName}</p>
                            </div>
                     </div>
                     <div className={'cityone '+style.cityone}>
                          <p>省市</p>
                          <div>
                              {
                                  cityList.map(v=>{
                                      return (
                                      <p key={v.CityID} onClick={()=>this.cityTwoFn(v.CityID)}>{v.CityName}</p>
                                      )
                                  })
                              }
                          </div>
                     </div>
                 </div>
                 {
                     this.state.provinceid?<div className={'dialogsparent '+style.dialogsparent}>
                         <Dialogs>
                             <div className={'cityone ' +style.cityone}>
                                 <div>
                                     {
                                         cityTwoList.map(v=>{
                                             return (
                                             <p key={v.CityID} onClick={()=>{this.goQuotationFn(v)}}>{v.CityName}</p>
                                             )
                                         })
                                     }
                                 </div>
                             </div>
                         </Dialogs>
                     </div>:null
                 }
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.quotation
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators(quotationAction, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(City);   
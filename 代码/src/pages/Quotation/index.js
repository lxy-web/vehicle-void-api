import React, { Component } from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as quotationAction from "../../store/action/quotation.js"
import DelalerAdress from "./DlealerAdress/index"
import style from "./styles/index.module.scss"
import City from "./City/index"
import api from "../../api/index"
import DialogSuccess from "./DialogSuccess/index"
class Quotation extends Component {
    state = {
        // 客户姓名
        name: "",
        // 客户手机号
        mobile: "",
        // 这辆车的信息
        obj: {},
        //城市的弹窗是否出现
        cityFlag:false,
        //保存一下经销商的id
        dealerids:[1],
        flag:false
    }
    changeFn=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    cityFlagFn=()=>{
        console.log("点击span")
        this.setState({
            cityFlag:true
        })
    }
    cityCloseFn=(v)=>{
        let {obj}=this.state
        this.getDealer(obj.car_id,v.CityID)
        this.setState({
            cityFlag:false
        })
    }
    async componentDidMount() {
        await this.props.getLoactionFn()
        let { locationList } = this.props;
        this.setState({
            obj: JSON.parse(localStorage.getItem('obj'))
        }, () => {
            if (locationList.CityID) {
                this.getDealer(this.state.obj.car_id, locationList.CityID)
            }
        })
    }
    subFn=()=>{
        let {name,mobile,obj,dealerids} =this.state;
        let {locationList} = this.props;
        let carid=obj.car_id
        let location = locationList.CityName;
        api.getLowerPrice({name,mobile,carid,location,dealerids:dealerids[0]}).then(res=>{
            console.log(res)
            if(res.data.data==="提交成功"){
                this.setState({
                    flag:true
                })
            }
        })
    }
    closeDialog=()=>{
        this.setState({
            flag:false
        })
    }
    getDealer = (carId, cityId) => {
        this.props.getDealertListFn({ carId, cityId })
    }
    render() {
        let { locationList, dealerList } = this.props;
        let { mobile, name, obj } = this.state;
        return (
            <div className={"quotation " + style.quotation}>
                <header>可以向多个商家咨询最低价,商家会及时回复</header>
                <div className={"main " + style.main}>
                    <div className={"carobj " + style.carobj}>
                        <p>
                            <img src={obj.Picture} alt="" />
                        </p>
                        <ul>
                            <li>{obj.AliasName}</li>
                            <li>
                                <span>{obj.market_attribute && obj.market_attribute.year}</span>
                                <span>{obj.car_name}</span>
                            </li>
                        </ul>
                    </div>
                    <div className={"tituser " + style.tituser}>
                        个人信息
                </div>
                    <div className={"user " + style.user}>
                        <p>
                            <span>姓名</span>
                            <input placeholder="请输入你的名字" type="text" value={name} name="name" onChange={(e) => { this.changeFn(e) }} />
                        </p>
                        <p>
                            <span>电话</span>
                            <input placeholder="请输入你的电话" type="text" value={mobile} name="mobile" onChange={(e) => { this.changeFn(e) }} />
                        </p>
                        <div>
                            <p>
                                <span>城市</span>
                                <span onClick={()=>this.cityFlagFn()}>{locationList.CityName}</span>
                            </p>
                            <p>
                                <span onClick={()=>{this.subFn()}}>询问低价</span>
                            </p>
                        </div>
                    </div>
                    <div className={"tituser " + style.tituser}>
                        选择报价的经销商
                    </div>
                    <div className={"dealer " + style.dealer}>
                         {
                             dealerList.list&&dealerList.list.map(v=>{
                                 return <DelalerAdress key={v.dealerId} {...v}></DelalerAdress>
                             })
                         }
                         <p className={"near " + style.near}>货比三家不吃亏</p>
                         {
                             dealerList.nearbys&&dealerList.nearbys.map(v=>{
                                 return <DelalerAdress key={v.dealerId} {...v}></DelalerAdress>
                             })
                         }
                    </div>
                </div>

               
                {
                    this.state.cityFlag ? <City cityCloseFn={this.cityCloseFn.bind(this)} ></City> : null
                }
                
                {
                    this.state.flag?<DialogSuccess closeDialog={this.closeDialog.bind(this)}></DialogSuccess>:null
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


export default connect(mapStateToProps, mapDispatchToProps)(Quotation);
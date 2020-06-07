import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import CarList from "../../components/CarList/index"
import * as detialAction from "../../store/action/detail.js"
import LazyLoad from "react-lazy-load"
class Car extends Component {
    state = {
        curIndex: 0,
        year: "全部"
    }
    componentDidMount() {
        let id = this.props.match.params.id
        this.props.getInfoAnd(id)
    }
    tabFn=(i,v)=>{
        this.setState({
            curIndex:i,
            year:v
        })
    }
    goQuotation=(obj)=>{
        if(obj){
            localStorage.setItem('obj',JSON.stringify({...obj,Picture:this.props.infoList.Picture,AliasName:this.props.infoList.AliasName,id:this.props.match.params.id}))
        }else{
            this.setLocation()
        }
        this.props.history.push("/quotation")
    }
    setLocation=()=>{
        localStorage.setItem('obj',JSON.stringify({
            ...this.props.infoList.list[0],
            Picture:this.props.infoList.Picture,
            AliasName:this.props.infoList.AliasName,
            id:this.props.match.params.id
        }))
    }
    render() {
        let { infoList } = this.props
        let { curIndex, year } = this.state
        // tab切换下面的内容
        let contList = []
        // tab切换的标题 ----全部 --2020，2019.。。。
        let tabs = new Set(['全部'])

        console.log(infoList)

        if (infoList.list) {
            infoList.list.forEach(v => {
                tabs.add(v.market_attribute.year)
                contList.push(`${v.exhaust_str}/${v.max_power_str}${v.inhale_type}`)
            })
        }

        console.log(contList)
        console.log([...new Set(contList)])

        contList = [...new Set(contList)].reduce((prev, item) => {
            prev[item] = infoList.list.filter(v => {
                return `${v.exhaust_str}/${v.max_power_str}${v.inhale_type}` === item
            })
            return prev
        }, {})
        console.log(contList)
        return (
            <div className="car">
                <div className="banner">
                    <div className="banner-tops">
                        <LazyLoad height={150}>
                            <img src={infoList.CoverPhoto} />
                        </LazyLoad>
                        <span>共{infoList.pic_group_count}图片</span>
                    </div>
                    <ul className="banner-bots">
                        <li>
                            <p>
                                {infoList.market_attribute && infoList.market_attribute.dealer_price}
                            </p>
                            <span>指导价{infoList.market_attribute && infoList.market_attribute.dealer_price}</span>
                        </li>
                        <li>
                            <p onClick={()=>this.goQuotation()}>询问低价</p>
                        </li>
                    </ul>
                </div>
                <div className="tab">
                    {
                        [...tabs].map((v,i)=>{
                            return (
                            <p className={i===curIndex?"active":''} key={i} onClick={()=>this.tabFn(i,v)}>{v}</p>
                            )
                        })
                    }
                </div>
                <div className="cont">
                    {
                        Object.keys(contList).map((v,i)=>{
                            return (
                                <div className="cont-item" key={i}>
                                   {
                                       contList[v].map(item=>{
                                            if(year==="全部"){
                                                return <CarList key={item.car_id} {...item} goQuotationFn={this.goQuotation.bind(this)}></CarList>
                                            }else if(year===item.market_attribute.year){
                                                return <CarList key={item.car_id} {...item} goQuotationFn={this.goQuotation.bind(this)}></CarList>
                                            }
                                       })
                                   }


                                </div>
                            )
                        })
                    }
                    <div className="footer">
                         <p onClick={()=>this.goQuotation()}>询问低价</p>
                         <span>本地经销商为你报价</span>
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.detail
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators(detialAction, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Car);
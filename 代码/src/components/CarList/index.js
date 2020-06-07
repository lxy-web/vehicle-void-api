import React, { Component } from 'react'

export default class CarList extends Component {
    goQuotation=()=>{
        let {car_name,car_id,market_attribute}=this.props;
        this.props.goQuotationFn({car_name,car_id,market_attribute})
    }
    render() {
        console.log(this.props)
        let {car_name,trans_type,gear_num,horse_power,market_attribute}=this.props
        return (
            <div className="item">
                <ul className="tops">
                    <li>
                 <span>{market_attribute.year}</span>
                    </li>
                </ul>
                <div className="bots">
                    <p onClick={()=>this.goQuotation()}>询问低价</p>
                </div>
            </div>
        )
    }
}

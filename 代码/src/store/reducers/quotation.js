import {GET_LOCATION,GET_DEALER_LIST, SET_FALG,GET_CITY_LIST,GET_CITY_TWO_LIST,SET_LOCATION} from "../actionType.js"

let initState={
    locationList:[],
    dealerList:[],
    cityList:[],
    cityTwoList:[]
}

let detail=(state=initState,action)=>{
     let newState=JSON.parse(JSON.stringify(state))
     switch (action.type) {
         case GET_LOCATION:
             newState.locationList=action.data
             break;
         case GET_DEALER_LIST:
             //添加一个字段来表示选中状态
             let list=[...action.data.list.map(v=>({...v,flag:false}))]
             //返回的本市的经销商里面还有字段nearbys 表示附近优质的经销商
             let nearbys=[...action.data.nearbys.map(v=>({...v,flag:false}))]
             newState.dealerList={...action.data,list,nearbys}
             break;
         case SET_FALG:
             newState.dealerList.list.forEach(v=>{
                 if(v.dealerId===action.data){
                     v.flag=!v.flag
                 }
             })

             newState.dealerList.nearbys.forEach(v=>{
                if(v.dealerId===action.data){
                    v.flag=!v.flag
                }
            })
             break;
        case GET_CITY_LIST:
            newState.cityList=action.data
            break;
        case GET_CITY_TWO_LIST:
            newState.cityTwoList=action.data
            break;
        case SET_LOCATION:
            newState.locationList=action.data
         default:
             break;
     }
     return newState
}

export default detail
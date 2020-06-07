import {GET_LOCATION,GET_DEALER_LIST, SET_FALG,GET_CITY_LIST,GET_CITY_TWO_LIST,SET_LOCATION} from "../actionType.js"
import api from "../../api/index"

export const getLoactionFn=()=>{
    return async (dispatch)=>{
        let res=await api.getLocation()
        dispatch({
            type:GET_LOCATION,
            data:res.data.data
        })
    }
}

export const getDealertListFn=(obj)=>{
     return (dispatch)=>{
         api.getDealerList(obj).then(res=>{
             dispatch({
                 type:GET_DEALER_LIST,
                 data:res.data.data
             })
         })
     }
}

export const setFlag=(id)=>{
     return (dispatch)=>{
         dispatch({
             type:SET_FALG,
             data:id
         })
     }
}

export const getCityListFn=()=>{
    return (dispatch)=>{
        api.getCityList().then(res=>{
            dispatch({
                type:GET_CITY_LIST,
                data:res.data.data
            })
        })
    }
}

export const getCityListTwoFn=(provinceid)=>{
    console.log(provinceid)
     return (dispatch)=>{
         api.getCityList({provinceid}).then(res=>{
             console.log(res)
             dispatch({
                 type:GET_CITY_TWO_LIST,
                 data:res.data.data
             })
         })
     }
}


export const setLocation=(obj)=>{
    return (dispatch)=>{
        dispatch({
            type:SET_LOCATION,
            data:obj
        })
    }
}




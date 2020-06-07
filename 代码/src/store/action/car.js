import api from "../../api"
import {GET_BRAND_LIST,GET_MAKE_LIST} from "../actionType"

export const getBrandList=()=>{
    return (dispatch)=>{
        api.getMasterBrandList().then(res=>{
            dispatch({
                type:GET_BRAND_LIST,
                data:res.data.data
            })
        })
    }
}

export const getMakeListById=(MasterID)=>{
    return (dispatch)=>{
        api.getMakeList({MasterID}).then(res=>{
            dispatch({
                type:GET_MAKE_LIST,
                data:res.data.data
            })
        })
    }
}
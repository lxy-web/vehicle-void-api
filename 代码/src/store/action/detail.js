import api from "../../api"
import {GET_INFO_AND} from "../actionType.js"

export const getInfoAnd=(SerialID)=>{
     return (dispatch)=>{
         api.getInfoAnd({
             SerialID
         }).then(res=>{
             dispatch({
                 type:GET_INFO_AND,
                 data:res.data.data
             })
         })
     }
}
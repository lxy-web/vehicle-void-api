import {GET_INFO_AND} from "../actionType.js"
let initState={
    infoList:[]
}

let detail=(state=initState,action)=>{
     let newstate = JSON.parse(JSON.stringify(state))
     switch (action.type) {
         case GET_INFO_AND:
             newstate.infoList=action.data
             break;
         default:
             break;
     }
     return newstate
}

export default detail
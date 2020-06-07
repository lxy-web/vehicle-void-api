import {GET_BRAND_LIST,GET_MAKE_LIST} from "../actionType"

const initState={
     brandList:[],
     makeList:[]
}

const car=(state=initState,action)=>{
    let newstate=JSON.parse(JSON.stringify(state))

    switch(action.type){
        case GET_BRAND_LIST:{
            //创建一个能够存储多个数据的结构
            let arr=new Set()
            action.data.forEach((v,i)=>{
                arr.add(v.Spelling[0])
            })

            //循环遍历一下
            newstate.brandList=Array.from(arr).map((v,i)=>{
                  let children=[];
                  action.data.map(item=>{
                      if(item.Spelling[0]===v){
                          children.push(item)
                      }
                  })

                  return {
                      id:i,
                      FirstSpell:v,
                      children
                  }
            })
        }
        break;
        case GET_MAKE_LIST: newstate.makeList=action.data
        break;
        default:break
    }

    return newstate
}

export default car
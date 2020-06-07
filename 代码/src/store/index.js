import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'

//写一个函数用来获取所有的reucers
function getReducers(){
   let files=require.context("./reducers",true,/\.js$/)

   return files.keys().reduce((pre,item)=>{
       let key=item.match(/\.\/(\w+)\.js$/)[1]; 
       pre[key]=files(item).default
       return pre
   },{})
}

//对各个子的reducer函数，合并成一个大的reducer
let reducer=combineReducers(
    getReducers()
)
const store=createStore(reducer,applyMiddleware(thunk));

export default store
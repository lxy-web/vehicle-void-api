// react的路由懒加载
import React from "react"
import loadable from "react-loadable"

//通用的过场组件
const loading =()=>{
    return (
        <div>loading...</div>
    ) 
}

export default[
    {
        path:"/searchIndex",
        component:loadable({
            loader:()=>import("../pages/Official/index.js"),
            loading
        })
    },
    {
        path:"/car/:id",
        component:loadable({
            loader:()=>import("../pages/Car/index.js"),
            loading
        })
    },
    {
        path:"/quotation",
        component:loadable({
            loader:()=>import("../pages/Quotation/index.js"),
            loading
        }) 
    },
    {
        path:"*",
        component:loadable({
            loader:()=>import("../pages/Error/404.js"),
            loading
        })
    },
    {
        path:"/",
        redirect:"/searchIndex"
    }
]
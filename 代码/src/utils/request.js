// 对axios做二次封装
import axios from "axios"

const request=axios.create({
    baseURL:''
})
request.interceptors.request.use(function(config){
      return {
          ...config,
          headers:{
              ...config.headers,
             //自己统一设置的header
          }
      }
},function(error){
    // 请求失败的回调函数
    // 对请求错误做些什么事
    return Promise.reject(error)
})
// 响应拦截器，对请求结果进行拦截
request.interceptors.response.use(function(response){
      //对得到的请求结果做统一处理
      //promise状态变成成功之后---返回值
      return response
},function(error){
    //响应失败的回调
    //对响应错误做一些什么是事
    switch (error.response.status) {
        case 404:
            //也可以通过路由直接跳转到咱们自己定义的404页面
            alert('接口没有找到')
            break;
        case 403:
            alert('没有权限')
            break;
        case 500:
             alert('服务器内部错误')
            break;
        case 406:
            alert('参数不合法')
            break;
        default:
            break;
    }
    return Promise.reject(error)
})

export default{
     get(url,params){
         return request.get(url,{params})
     },
     post(url,params){
         return request.post(url,params)
     },
     delete(url,params){
         return request.delete(url,{params})
     },
     put(url,params){
         return request.put(url,params)
     }
}

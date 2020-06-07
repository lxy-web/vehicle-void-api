import request from "../utils/request"
export default{
    getMasterBrandList:()=>{
        return request.get("/v2-car-getMasterBrandList.html")
    },
    getMakeList:(params)=>{
        return request.get("/v2-car-getMakeListByMasterBrandId.html",params)
    }
}
import request from "../utils/request"
export default{
    getLocation:()=>{
        return request.get("/location-client.html")
    },
    getDealerList:(params)=>{
        return request.get("/v2-dealer-alllist.html",params)
    },
    getCityList:(params)=>{
        return request.get("/v1-city-alllist.html",params)
    },
    getLowerPrice:(params)=>{
        return request.get("/h2-submit-lowprice.html",params) 
    }
}
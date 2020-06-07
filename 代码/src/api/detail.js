import request from "../utils/request"
export default{
    getInfoAnd:(params)=>{
        return request.get("/v2-car-getInfoAndListById.html",params)
    }
}
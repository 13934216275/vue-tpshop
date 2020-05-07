import http from "@/config/http.js";
export default {
    AddGoods(data){
        return http.post("/goods",data)
    },
    updateGoods(id){
        return http.put(`/goods/${id}?is_del=1`)
    },
    deleteGoods(id){
        return http.delete("/goods"+id)
    },
    lookGoods(page,limit,is_up,cate,searchData){
        return http.get(`/goods?page=${page}&limit=${limit}&is_up=${is_up}&cate=${cate}&searchData=${searchData}`)
    },
}
import http from "@/config/http.js";
export default {
    lookgoods(page,limit,cate,searchData){
        return http.get(`/goodspu?page=${page}&limit=${limit}&cate=${cate}&searchData=${searchData}&is_del=1`)
    },
    updategoods(id){
        return http.put(`/goods/${id}?is_del=0`)
    },
    deletegoods(id){
        return http.delete("/goods"+id)
    }
}
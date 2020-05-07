import http from "@/config/http.js";
export default {
    lookgoodSpu(page,limit,cate,searchData){
        return http.get(`/goodspu?page=${page}&limit=${limit}&cate=${cate}&searchData=${searchData}`)
    },
    updategoodSpu(id){
        return http.put(`/goods/${id}?is_del=0`)
    },
    deletegoodSpu(id){
        return http.delete("/goodspu"+id)
    }
}
import http from "@/config/http.js";
export default {
    Addcarousel(data){
        return http.post("/carousel",data)
    },
    updatecarousel(id,data){
        return http.put("/carousel"+id,data)
    },
    deletecarousel(id){
        return http.delete("/carousel"+id)
    },
    lookcarousel(){
        return http.get("/carousel")
    },
}

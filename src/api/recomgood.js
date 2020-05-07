import http from "@/config/http.js";
export default {
    AddRecomgood(data){
        return http.post("/recomgood",data)
    },
    updateRecomgood(id,data){
        return http.put("/recomgood"+id,data)
    },
    deleteRecomgood(id){
        return http.delete("/recomgood"+id)
    },
    lookRecomgood(id){
        return http.get("/recomgood/"+id)
    },
}

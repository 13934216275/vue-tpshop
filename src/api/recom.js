import http from "@/config/http.js";
export default {
    AddRecom(data){
        return http.post("/recom",data)
    },
    updateRecom(id,data){
        return http.put("/recom"+id,data)
    },
    deleteRecom(id){
        return http.delete("/recom"+id)
    },
    lookRecom(){
        return http.get("/recom")
    },
}

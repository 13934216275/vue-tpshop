import http from "@/config/http.js";
export default {
    Addspecstype(data){
        return http.post("/specstype",data)
    },
    updatespecstype(id,data){
        return http.put("/specstype"+id,data)
    },
    deletespecstype(id){
        return http.delete("/specstype"+id)
    },
    lookspecstype(){
        return http.get("/specstype");
    },
}
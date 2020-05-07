import http from "@/config/http.js";
export default {
    Addspecstpl(data){
        return http.post("/specstpl",data)
    },
    updatespecstpl(id,data){
        return http.put("/specstpl"+id,data)
    },
    deletespecstpl(id){
        return http.delete("/specstpl"+id)
    },
    lookspecstpl(){
        return http.get("/specstpl")
    },
}
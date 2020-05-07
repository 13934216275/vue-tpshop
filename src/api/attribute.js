import http from "@/config/http.js";
export default {
    Addattribute(data){
        return http.post("/attribute",data)
    },
    updateattribute(id,data){
        return http.put("/attribute"+id,data)
    },
    deletecattribute(id){
        return http.delete("/attribute"+id)
    },
    lookattribute(){
        return http.get("/attribute")
    },
}

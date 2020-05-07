import http from "@/config/http.js";
export default {
    checkLogin(data){
        return http.post("/login",data)
    },
    updateLogins(id,data){
        return http.put("/login"+id,data);
    },
    lookLogin(id){
        return http.get(`/login?id=${id}`);
    }
}
import http from "@/config/http.js";
export default {
    lookCategory(){
        return http.get("/category")
    },
    addCategory(data){
        return http.post("/category",data)
    },
    updateCategory(id,data){
        return http.put("/category"+id,data)
    },
    deleteCategory(id){
        return http.delete("category"+id);
    }
}
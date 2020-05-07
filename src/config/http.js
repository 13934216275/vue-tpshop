import axios from "axios";
import store from "@/store/store.js";
var instance = axios.create({
    baseURL:"http://www.jiaju.com",
    timeout:7500
});
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(store.state.token){
        config.headers.token=store.state.token;
    }
    return config;
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.code === 666){
       location.href="/login";
    }else{
        return response;
    }
})
export default instance;
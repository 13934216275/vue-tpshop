import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import VuexPersist from 'vuex-persist'
const vuexLocal = new VuexPersist({
    storage: window.localStorage
})

// new Vuex.Store();
export default new Vuex.Store({
    state:{
        lablFrom:{
            user_id:"",
            username:"",
            last_ip:"",
            last_time:"",
        },
        token:"",
        host:"http://www.jiaju.com/"
    },
    getters:{

    },
    mutations:{
        logins:function (state,obj) {
            state.lablFrom=obj;
            state.lablFrom.username=obj.username;
            state.lablFrom.user_id=obj.user_id;
            state.lablFrom.last_ip=obj.last_ip;
            state.lablFrom.last_time=obj.last_time;
        },
        tokens:function (state,token) {
            state.token=token;
            console.log(state, token);
        }
    },
    actions:{},
    modules:{},
    plugins: [vuexLocal.plugin]
})

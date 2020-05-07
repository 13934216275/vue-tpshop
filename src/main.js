import Vue from 'vue'
import App from './App.vue'
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


Vue.use(VueQuillEditor)

import elementUi from "element-ui";
import echarts from "echarts";
import vueCharts from "v-charts";
import store from "./store/store.js";


Vue.config.productionTip = false

import Axios from "axios"
Vue.prototype.$http=Axios;
Vue.prototype.$store=store;

import "u-reset.css";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router"
Vue.config.productionTip = true;

import * as filter from "./filter";

Object.keys(filter).forEach(key=>{
  Vue.filter(key,filter[key])
})

// swiper
import 'swiper/dist/css/swiper.css';

Vue.use(elementUi);
Vue.use(echarts);
Vue.use(vueCharts);
new Vue({
  render: h => h(App),
  store,
  router,
  filter
}).$mount('#app');

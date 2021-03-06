import Vue from "vue";
import vueRouter from "vue-router";
import store from "@/store/store.js";
Vue.use(vueRouter);
import login from "@/views/login/login.vue";

const router = new vueRouter({
    routes:[
        {
            path:"/",
            name:"login",
            meta:{
                title:"login",
                icon:"",
            },
            component:login,
        },
        {
            path:"/index",
            name:"index",
            meta:{
                title:"主页",
                icon:"",
            },
            component:()=>import("@/views/index/index.vue"),
            redirect:{
                name:"index1",
            },
            children:[
                {
                    path:"/index1",
                    name:"index1",
                    meta:{
                        title:"首页",
                        icon:"el-icon-s-goods",
                    },
                    component:()=>import("@/views/index1/index1.vue"),
                },
                {
                    path:"/lbtgl",
                    name:"lbtgl",
                    meta:{
                        isHello:"",
                        title:"轮播图管理",
                        icon:"el-icon-magic-stick",
                    },
                    component:()=>import("@/views/lbtgl/lbtgl.vue"),
                },
                {
                    path:"/spgl",
                    name:"scgl",
                    meta:{
                        title:"商品管理",
                        icon:"el-icon-s-goods",
                    },
                    component:()=>import("@/views/spgl/spgl.vue"),
                    redirect:{
                        name:"spfl",
                    },
                    children:[
                        {
                            path:"/spfl",
                            name:"spfl",
                            meta:{
                                title:"商品分类",
                                icon:"el-icon-menu",
                            },
                            component:()=>import("@/views/spgl/spfl/spfl.vue"),
                        },
                        {
                            path:"/splb",
                            name:"splb",
                            meta:{
                                title:"商品列表",
                                icon:"el-icon-s-grid",
                            },
                            component:()=>import("@/views/spgl/splb/splb.vue"),
                        },
                        {
                            path:"/sphsz",
                            name:"sphsz",
                            meta:{
                                title:"商品回收站",
                                icon:"el-icon-delete",
                            },
                            component:()=>import("@/views/spgl/sphsz/sphsz.vue"),
                        },
                        {
                            path:"/spgg",
                            name:"spgg",
                            meta:{
                                title:"商品属性",
                                icon:"el-icon-s-ticket",
                            },
                            component:()=>import("@/views/spgl/spgg/spgg.vue"),
                        },
                        {
                            path:"/spsx",
                            name:"spsx",
                            meta:{
                                title:"商品规格",
                                icon:"el-icon-s-open",
                            },
                            component:()=>import("@/views/spgl/spsx/spsx.vue"),
                        },
                        {
                            path:"/pplb",
                            name:"pplb",
                            meta:{
                                title:"品牌列表",
                                icon:"el-icon-s-data",
                            },
                            component:()=>import("@/views/spgl/pplb/pplb.vue"),
                        },
                        {
                            path:"/pjgl",
                            name:"pjgl",
                            meta:{
                                title:"评价管理",
                                icon:"el-icon-chat-round",
                            },
                            component:()=>import("@/views/spgl/pjgl/pjgl.vue"),
                        },
                        {
                            path:"/recoms",
                            name:"recoms",
                            meta:{
                                title:"商品推荐位",
                                icon:"el-icon-chat-round",
                            },
                            component:()=>import("@/views/spgl/recoms/recoms.vue"),
                        },
                    ]
                },
                {
                    path:"/ddgl",
                    name:"ddgl",
                    meta:{
                        title:"订单管理",
                        icon:"el-icon-postcard",
                    },
                    redirect:{
                        name:"ddlb",
                    },
                    component:()=>import("@/views/ddgl/ddgl.vue"),
                    children:[
                        {
                            path:"/ddlb",
                            name:"ddlb",
                            meta:{
                                title:"订单列表",
                                icon:"el-icon-timer",
                            },
                            component:()=>import("@/views/ddgl/ddlb/ddlb.vue"),
                        },
                        {
                            path:"/hhlb",
                            name:"hhlb",
                            meta:{
                                title:"换货列表",
                                icon:"el-icon-timer",
                            },
                            component:()=>import("@/views/ddgl/hhlb/hhlb.vue"),
                        },
                        {
                            path:"/shlb",
                            name:"shlb",
                            meta:{
                                title:"售后列表",
                                icon:"el-icon-timer",
                            },
                            component:()=>import("@/views/ddgl/shlb/shlb.vue"),
                        },
                        {
                            path:"/tklb",
                            name:"tklb",
                            meta:{
                                title:"退款列表",
                                icon:"el-icon-timer",
                            },
                            component:()=>import("@/views/ddgl/tklb/tklb.vue"),
                        }
                    ]
                },
                {
                    path:"/hygl",
                    name:"hygl",
                    meta:{
                        title:"会员管理",
                        icon:"el-icon-magic-stick",
                    },
                    component:()=>import("@/views/hygl/hygl.vue"),
                },
                {
                    path:"/tjjs",
                    name:"tjjs",
                    meta:{
                        title:"统计结算",
                        icon:"el-icon-magic-stick",
                    },
                    redirect:{
                        name:"xsje",
                    },
                    component:()=>import("@/views/tjjs/tjjs.vue"),
                    children:[
                        {
                            path:"/xsje",
                            name:"xsje",
                            meta:{
                                title:"销售金额",
                                icon:"el-icon-magic-stick",
                            },
                            component:()=>import("@/views/tjjs/xsje/xsje.vue"),
                        },
                        {
                            path:"/dkmx",
                            name:"dkmx",
                            meta:{
                                title:"贷款明细",
                                icon:"el-icon-magic-stick",
                            },
                            component:()=>import("@/views/tjjs/dkmx/dkmx.vue"),
                        },
                        {
                            path:"/jytk",
                            name:"jytk",
                            meta:{
                                title:"交易退库",
                                icon:"el-icon-magic-stick",
                            },
                            component:()=>import("@/views/tjjs/jytk/jytk.vue"),
                        },
                        {
                            path:"/tkmx",
                            name:"tkmx",
                            meta:{
                                title:"退库明细",
                                icon:"el-icon-magic-stick",
                            },
                            component:()=>import("@/views/tjjs/tkmx/tkmx.vue"),
                        }
                    ]
                },
                {
                    path:"/cwgl",
                    name:"cwgl",
                    meta:{
                        title:"财务管理",
                        icon:"el-icon-magic-stick",
                    },
                    component:()=>import("@/views/cwgl/cwgl.vue"),
                },
                {
                    path:"/wlgl",
                    name:"wlgl",
                    meta:{
                        title:"物流管理",
                        icon:"el-icon-magic-stick",
                    },
                    redirect:{
                        name:"wlps"
                    },
                    component:()=>import("@/views/wlgl/wlgl.vue"),
                    children:[
                        {
                            path:"/wlps",
                            name:"wlps",
                            meta:{
                                title:"物流配送",
                                icon:"el-icon-magic-stick",
                            },
                            component:()=>import("@/views/wlgl/wlps/wlps.vue"),
                        },
                        {
                            path:"/kdgs",
                            name:"kdgs",
                            meta:{
                                title:"快递公司",
                                icon:"el-icon-magic-stick",
                            },
                            component:()=>import("@/views/wlgl/kdgs/kdgs.vue"),
                        },
                        {
                            path:"/ztlb",
                            name:"ztlb",
                            meta:{
                                title:"自提列表",
                                icon:"el-icon-magic-stick",
                            },
                            component:()=>import("@/views/wlgl/ztlb/ztlb.vue"),
                        },
                        {
                            path:"/fhdz",
                            name:"fhdz",
                            meta:{
                                title:"发货地址",
                                icon:"el-icon-magic-stick",
                            },
                            component:()=>import("@/views/wlgl/fhdz/fhdz.vue"),
                        },
                    ]
                },
                {
                    path:"/xtgl",
                    name:"xtgl",
                    meta:{
                        title:"系统管理",
                        icon:"el-icon-s-tools",
                    },
                    redirect:{
                        name:"xtsz"
                    },
                    component:()=>import("@/views/xtgl/xtgl.vue"),
                    children:[
                        {
                            path:"/xtsz",
                            name:"xtsz",
                            meta:{
                                title:"系统设置",
                                icon:"el-icon-setting",
                            },
                            component:()=>import("@/views/xtgl/xtsz/xtsz.vue"),
                        },
                        {
                            path:"/gyslb",
                            name:"gyslb",
                            meta:{
                                title:"供应商列表",
                                icon:"el-icon-s-shop",
                            },
                            component:()=>import("@/views/xtgl/gyslb/gyslb.vue"),
                        },
                        {
                            path:"/glylb",
                            name:"glylb",
                            meta:{
                                title:"管理员列表",
                                icon:"el-icon-notebook-2",
                            },
                            component:()=>import("@/views/xtgl/glylb/glylb.vue"),
                        },
                        {
                            path:"/jsgl",
                            name:"jsgl",
                            meta:{
                                title:"角色管理",
                                icon:"el-icon-suitcase-1",
                            },
                            component:()=>import("@/views/xtgl/jsgl/jsgl.vue"),
                        },
                        {
                            path:"/qxzygl",
                            name:"qxzygl",
                            meta:{
                                title:"权限资源管理",
                                icon:"el-icon-data-analysis",
                            },
                            component:()=>import("@/views/xtgl/qxzygl/qxzygl.vue"),
                        },
                    ]
                },
                {
                    path:"/xgmm",
                    name:"xgmm",
                    meta:{
                        isHello:"123",
                        title:"修改密码",
                        icon:"el-icon-magic-stick",
                    },
                    component:()=>import("@/views/xgmm/xgmm.vue"),
                },
                {
                    path:"/addsplb",
                    name:"addsplb",
                    meta:{
                        isHello:"123",
                        title:"添加商品",
                        icon:"el-icon-magic-stick",
                    },
                    component:()=>import("@/views/addsplb/addsplb.vue"),
                },
                {
                    path:"/addspsx",
                    name:"addspsx",
                    meta:{
                        isHello:"123",
                        title:"添加商品属性",
                        icon:"el-icon-magic-stick",
                    },
                    component:()=>import("@/views/addspsx/addspsx.vue"),
                },
                {
                    path:"/recomGoods",
                    name:"recomGoods",
                    meta:{
                        isHello:"123",
                        title:"添加推荐商品",
                        icon:"el-icon-magic-stick",
                    },
                    component:()=>import("@/views/recomGoods/recomGoods.vue"),
                },
                {
                    path:"/editGoodslist",
                    name:"editGoodslist",
                    meta:{
                        isHello:"123",
                        title:"添加推荐商品",
                        icon:"el-icon-magic-stick",
                    },
                    component:()=>import("@/views/editGoodslist/editGoodslist.vue"),
                },
            ]
        }
    ]
});
router.beforeEach((to,from,next)=>{
    if(to.path === "/"){
        next();
    }else{
        if(store.state.token){
            next()
        }else{
            next("/");
        }
    }
});
export default router;

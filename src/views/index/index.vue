<template>
    <div class="box">
        <el-container>
            <el-header class="index-header">
                <div class="logo">
                    <img src="http://121.42.234.123:8080/public/upload/logo/2018/04-10/da91523a817bc5adcb2c4c123bbf6e3f.png" alt="">
                    <el-tooltip content="展开/收起侧边导航" placement="top" :hide-after="1000">
                        <i class="el-icon-s-unfold"  @click="isCollapses=!isCollapses" :class="{xuanzhuans:!isCollapses}"></i>
                    </el-tooltip>
                </div>
                <div class="header-right">
                    <div class="help-left">
                        <p>帮助手册</p>
                        <div class="admin">
                            <p>{{$store.state.lablFrom.username}}</p>
                            <p>管理员</p>
                        </div>
                        <img src="http://121.42.234.123:8080/public/static/images/admint.png" alt="">
                        <!--<i class="el-icon-caret-bottom"></i>-->
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                                <el-tooltip content="关闭快捷管理" placement="top-end" :hide-after="1000">
                                      <i class="el-icon-caret-top" :class="{xuanzhuan:!isCollapse}" @click="isCollapse=!isCollapse"></i>
                                </el-tooltip>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <div class="dropdown-first">
                                    <p>最后登录</p>
                                    <div class="tupian" @click="xgmm"></div>
                                </div>
                                <div class="dropdown-item">
                                    <p>{{$store.state.lablFrom.last_time | date("yyyy-MM-dd hh:ss:mm")}} (IP:{{$store.state.lablFrom.last_ip}})</p>
                                </div>
                                <div class="dropdown-second">
                                    <p>常用操作</p>
                                    <div class="tupian"></div>
                                </div>
                                <div class="dropdown-items">
                                    <p>站点设置</p>
                                </div>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="help-right">
                        <el-dropdown class="mygzt">
                         <span class="el-dropdown-link">
                             我的工作台<i class="el-icon-arrow-down el-icon--right"></i>
                         </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <div @click="tuichu" style="width: 130px;
height: 30px;">
                                        <img src="http://121.42.234.123:8080/public/static/images/icon-exit.png" alt="" >
                                        退出系统
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <img src="http://121.42.234.123:8080/public/static/images/cle-cache.png" alt="">
                                    更新缓存
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <img src="http://121.42.234.123:8080/public/static/images/icon-switch.png" alt="">
                                    切换小程序
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <img src="http://121.42.234.123:8080/public/static/images/icon-home.png" alt="">
                                    打开商城
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </el-header>
            <el-container>
                <el-aside class="index-aside">
                    <el-menu
                            :default-active="asdzxc"
                            :router="true"
                            :collapse="isCollapses"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#409eff">
                        <template v-for="(v) in lyArr">
                            <el-submenu :index="v.name"  v-if="v.children && v.children.length > 0">
                                <template slot="title">
                                    <i :class="v.meta.icon"></i>
                                    <span slot="title">{{v.meta.title}}</span>
                                </template>
                                <el-menu-item  v-for="(vs) in v.children" :index="vs.name">
                                    <i :class="vs.meta.icon"></i>
                                    <span slot="title">{{vs.meta.title}}</span>
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item  v-else-if="!v.meta.isHello" :index="v.name">
                                <i :class="v.meta.icon"></i>
                                <span slot="title">{{v.meta.title}}</span>
                            </el-menu-item>
                        </template>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main class="index-main">
                        <mbx></mbx>
                        <router-view></router-view>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import mbx from "@/components/mbx/mbx.vue";
    export default {
        name: "index",
        components:{
            mbx
        },
        data(){
            return{
                isCollapse:false,
                lyArr:"",
                asdzxc:this.$route.name,
                isCollapses:false,
            }
        },
        watch:{
            $route:function (newVal,oldVal) {
                this.asdzxc=newVal.name;
            }
        },
        methods:{
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            xgmm(){
                this.$router.push("xgmm");
            },
            tuichu(){
                this.$router.push("/");
                this.$store.commit("tokens","");
            }
        },
        created() {
            this.lyArr=this.$router.options.routes[1].children;
        }
    }
</script>

<style scoped lang="less">
    .box{
        width: 100%;
        height: 100%;
    }
    .el-container{
        width: 100%;
        height: 100%;
    }
    .index-aside{
        /*width: auto;*/
        height: 100%;
        transition: all 0.5s;
        background: rgb(84, 92, 100);
    }
    .index-header{
        width: 100%;
        height: 60px;
        background: #293038;
        padding:0;
    }
    .index-main{
        width: 100%;
        height: auto;
        /*background: yellow;*/
    }
    .index-footer{
        width: 100%;
        height: 50px;
        /*background: blue;*/
    }
    .logo{
        width: 210px;
        height: 48px;
        padding:10px 0 6px 18px;
        box-sizing: border-box;
        float: left;
    }
    .logo img{
        width: 148px;
        height: 28px;
    }
    .logo i{
        margin-left:25px;
        color:#fff;
        font-size: 14px;
        transition: all 0.5s;
    }
    .header-right{
        width: 328px;
        height: 48px;
        /*background: pink;*/
        float: right;
        margin-right:10px;
    }
    .help-left{
        width: 173px;
        height: 48px;
        /*background: purple;*/
        float: left;
    }
    .help-left>p{
        font-size: 12px;
        color:#fff;
        margin:10px 0 0 10px;
        float: left;
    }
    .help-left .admin{
        width: 36px;
        height: 30px;
        /*background: blue;*/
        margin-top:9px;
        margin-left:10px;
        float: left;
        font-size: 12px;
        color:#fff;
    }
    .help-left img{
        margin:10px 0 0 10px;
        float: left;
    }
    .help-left i{
        float: left;
        display: block;
        color:#fff;
        font-size: 20px;
        margin-left:5px;
        line-height: 48px;
    }
    .help-right{
        width: 150px;
        height: 48px;
        /*background: blue;*/
        float: left;
    }
    .help-right .mygzt{
        line-height: 48px;
        margin-left:30px;
        color:#fff;
    }
    .el-dropdown-menu__item img{
        margin:0 10px;
    }
    #dropdown-menu-9725 .el-dropdown-menu__item{
        border-bottom:1px solid #e0e0e0;
        padding-top: 5px;
    }
    #dropdown-menu-518 .el-dropdown-menu__item{
        width: 200px;
        padding:0 10px;
        box-sizing: border-box;
    }
    .dropdown-first{
        width: 200px;
        height: 20px;
        /*background: blue;*/
        line-height: 20px;
        border-bottom:1px solid #e0e0e0;
        box-sizing: border-box;
    }
    .dropdown-first p{
        font-size: 12px;
        float: left;
        margin-left:5px;
    }
    .dropdown-first .tupian{
        width: 60px;
        height: 20px;
        float: right;
        border-radius: 2px;
        /*background: RED;*/
        background:url("http://121.42.234.123:8080/public/static/images/combine_img.png") no-repeat;
        background-position: -2px -258px;
        cursor: pointer;
    }
    .dropdown-first .tupian:hover{
        /*background: #e0e0e0;*/
        background:#999999 url("http://121.42.234.123:8080/public/static/images/combine_img.png") no-repeat;
        background-position: -2px -238px;
    }
    .dropdown-item{
        width: 200px;
        height: 40px;
        /*background: yellow;*/
        overflow: hidden;
    }
    .dropdown-item p{
        font-size: 10px;
        color:#555;
        margin-top:5px;
        margin-left:15px;
    }


    .dropdown-second{
        width: 200px;
        height: 20px;
        /*background: blue;*/
        line-height: 20px;
        border-radius: 2px;
        border-bottom:1px solid #e0e0e0;
        box-sizing: border-box;
    }
    .dropdown-second p{
        font-size: 12px;
        float: left;
        margin-left:5px;
    }
    .dropdown-second .tupian{
        width: 60px;
        height: 20px;
        float: right;
        cursor: pointer;
        background: url("http://121.42.234.123:8080/public/static/images/combine_img.png") no-repeat;
        background-position: -62px -258px;
    }
    .dropdown-second .tupian:hover{
        background:#999999 url("http://121.42.234.123:8080/public/static/images/combine_img.png") no-repeat;
        background-position: -62px -238px;
    }
    .dropdown-items{
        width: 200px;
        height: 20px;
        /*background: yellow;*/
        overflow: hidden;
    }
    .dropdown-items p{
        font-size: 10px;
        color:#555;
        margin-top:5px;
        margin-left:15px;
        cursor: pointer;
    }
    .xuanzhuan{
        transform: rotate(180deg);
        transition: all 0.5s;
    }
    .xuanzhuans{
        transform: rotate(180deg);
        transition: all 0.5s;
    }
    .el-menu{
        border:none;
    }
    .el-submenu{
        width: 200px;
    }
</style>
<style>
    .box .index-header{
        height: 48px !important;
    }
    .el-aside{
        width: 200px !important;
    }
    .index-aside{
        width: auto !important;
    }
</style>
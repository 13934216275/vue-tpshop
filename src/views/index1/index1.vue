<template>
    <div class="index1">
        <div class="index1-title">
            管理中心
        </div>
        <div class="index1-box">
            <div class="datus">
                <div class="datu">
                    <img src="http://121.42.234.123:8080/public/static/images/1.png" alt="">
                    <div class="datu-right">
                        <p>0</p>
                        <h6>今日订单总数</h6>
                    </div>
                </div>
                <div class="datu1">
                    <img src="http://121.42.234.123:8080/public/static/images/2.png" alt="">
                    <div class="datu1-right">
                        <p>1</p>
                        <h6>今日会员总数</h6>
                    </div>
                </div>
                <div class="datu2">
                    <img src="http://121.42.234.123:8080/public/static/images/3.png" alt="">
                    <div class="datu2-right">
                        <p>0</p>
                        <h6>今日待审评论数</h6>
                    </div>
                </div>
                <div class="datu3">
                    <img src="http://121.42.234.123:8080/public/static/images/4.png" alt="">
                    <div class="datu3-right">
                        <p>0</p>
                        <h6>今日待审评论数</h6>
                    </div>
                </div>
            </div>
            <div class="index1-right">
                <ul class="index1-item">
                    <template v-for="(v) in fk">
                        <xiaotu :title="v.title" :num="v.num" :laji="v.laji"></xiaotu>
                    </template>
                </ul>
                <template>
                    <el-card class="box-card">
                        <div class="clearfix">
                            <i class="el-icon-s-goods"></i>
                            <span>版本信息</span>
                        </div>
                        <template>
                            <el-table
                                    :data="tableData"
                                    border
                                    class="first-table">
                                <el-table-column
                                        prop="cxbb"
                                        label="程序版本:">
                                </el-table-column>
                                <el-table-column
                                        prop="bb"
                                        label="TPshop v3.5.3">
                                </el-table-column>
                                <el-table-column
                                        prop="gxsj"
                                        label="更新时间:">
                                </el-table-column>
                                <el-table-column
                                        prop="sj"
                                        label="2019-07-03">
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-card>
                </template>
            </div>
        </div>
        <el-card class="box-card" style="margin-top: 30px">
            <div class="sechead1">
                <i class="el-icon-s-tools"></i>
                <span>系统信息</span>
            </div>
            <template>
                <el-table
                        :data="tableData1"
                        border
                        style="width: 100%;margin-top: 30px">
                    <el-table-column
                            prop="date"
                            label="服务器操作系统:">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="WINNT">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="服务器域名/IP:">
                    </el-table-column>
                    <el-table-column
                            prop="address1"
                            label="121.42.234.123:8080 [ 121.42.234.123 ]">
                    </el-table-column>
                </el-table>
            </template>
        </el-card>
    </div>
</template>

<script>
    import xiaotu from "@/components/xiaotu/xiaotu.vue"
    export default {
        name: "index1",
        components:{
            xiaotu,
        },
        data(){
            return{
                tableData:[
                    {
                        cxbb:"程序开发",
                        bb:"TPshop开源商城",
                        gxsj:"版权所有",
                        sj:"盗版必究"
                    },
                    {
                        cxbb:"官方授权:",
                        bb:"商业授权",
                        gxsj:"官方论坛:",
                        sj:"TPshop交流论坛"
                    }
                ],
                tableData1: [
                    {
                        date: '服务器环境:',
                        name: 'Apache/2.4.9 (Win64) PHP/5.5.12',
                        address: '	PHP 版本:',
                        address1: '	5.5.12:'
                    }, {
                        date: 'Mysql 版本:',
                        name: '5.6.17',
                        address: '	GD 版本:',
                        address1: '	bundled (2.1.0 compatible)'
                    }, {
                        date: '文件上传限制:',
                        name: '300M',
                        address: '最大占用内存:',
                        address1: '	1024M'
                    }, {
                        date: '最大执行时间:',
                        name: '120s',
                        address: '安全模式:',
                        address1: 'NO:'
                    }, {
                        date: 'Zlib支持::',
                        name: '	YES',
                        address: 'Curl支持::',
                        address1: 'YES:'
                    },
                ],
                fk:[
                    {title:"待处理订单",num:55,laji:"0 -214px"},
                    {title:"待处理订单",num:66,laji:"-224px -214px"},
                    {title:"待处理订单",num:77,laji:"-168px -214px"},
                    {title:"待处理订单",num:77,laji:"-112px -214px"},
                ],
            }
        }
    }
</script>

<style scoped>
    .box-card{
        width: 100%;
        height: auto;
        margin-top:10px;
    }
    .index1-title{
        width: 100%;
        height: 50px;
        /*background: red;*/
        line-height: 50px;
        font-size: 24px;
        border-bottom:1px solid #e0e0e0;
    }
    .datus{
        width: 40%;
        height: 414px;
        margin-top:10px;
        float: left;
    }
    .datu{
        width: 48%;
        height: 195px;
        background: #32cc7f;
        border-radius: 5px;
        padding:83px 0 38px 38px;
        box-sizing: border-box;
        margin-bottom: 10px;
        margin-right: 16px;
        float: left;
    }
    .datu img{
        width: 30%;
        height: 100%;
        float: left;
        /*background: green;*/
    }
    .datu-right{
        width: 84px;
        height: 64px;
        /*background: blue;*/
        float: right;
        margin-right:20px;
        margin-top:10px;
        color:#fff;
    }
    .datu-right p{
        font-size: 24px;
    }
    .datu-right h6{
        font-size: 14px;
        margin-top:5px;
    }
    .index1-box{
        width: 100%;
        height: 414px;
    }
    .datu1{
        width: 48%;
        height: 195px;
        background: #e4eaec;
        border-radius: 5px;
        padding:83px 0 38px 38px;
        box-sizing: border-box;
        margin-bottom: 10px;
        float: left;
    }
    .datu1 img{
        width: 30%;
        height: 100%;
        float: right;
        margin-right:20px;
    }
    .datu1-right{
        float: left;
    }
    .datu1-right p{
        font-size: 26px;
        color:#32cc7f;
    }
    .datu1-right h6{
        font-size: 14px;
        margin-top:5px;
    }
    .datu2{
        width: 48%;
        height: 195px;
        background: #e4eaec;
        border-radius: 5px;
        padding:83px 0 38px 38px;
        box-sizing: border-box;
        margin-bottom: 10px;
        margin-right: 16px;
        float: left;
    }
    .datu2 img{
        width: 30%;
        height: 100%;
        float: left;
    }
    .datu2-right{
        float: right;
        margin-right:20px;
    }
    .datu2-right p{
        font-size: 26px;
        color:#6c6fbf;
    }
    .datu2-right h6{
        font-size: 14px;
        margin-top:5px;
    }
    .datu3{
        width: 48%;
        height: 195px;
        background: #6c6fbf;
        border-radius: 5px;
        padding:83px 0 38px 38px;
        box-sizing: border-box;
        margin-bottom: 10px;
        float: left;
    }
    .datu3 img{
        width: 30%;
        height: 100%;
        float: right;
        margin-right:20px;
    }
    .datu3-right{
        float: left;
        color:#fff;
    }
    .datu3-right p{
        font-size: 26px;
    }
    .datu3-right h6{
        font-size: 14px;
        margin-top:5px;
    }
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .index1-item{
        width: 100%;
        height: 167px;
        /*background: red;*/
        margin-top:10px;
    }
    .index1-right{
        width: 58%;
        height: 412px;
        float: right;
        margin-left:10px;
    }
    .index1-first{
        width: 22%;
        height: 167px;
        background: #fff;
        margin:0 14px 0 0;
        padding:24px 0 20px;
        box-sizing: border-box;
        float: left;
    }
    /*.index1-first:hover{*/
        /*box-shadow: 10px 10px 5px #888888;*/
    /*}*/
    .index1-first .img{
        width: 55px;
        height: 55px;
        margin-left:calc((100% - 55px)/2);
    }
    .index1-first .first-title{
        margin-top:18px;
        font-size: 14px;
        text-align: center;
    }
    .index1-first .first-num{
        font-size: 18px;
        text-align: center;
        margin-top:8px;
        color:#ec5151;
    }
    .el-col-14{
        margin-left:10px;
        float: left;
    }
    .index1 .box-card{
        width: 100%;
        margin-top:30px;
    }
    .first-table{
        width: 100%;
    }

</style>
<style>
    .el-card__header{
        border:none;
    }
    .index-main{
        background: #f7f7f7 !important;
    }
</style>
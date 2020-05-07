<template>
    <div>
        <li class="index1-first">
            <div class="img" :style="{backgroundPosition: laji}"></div>
            <div class="first-title">{{title}}</div>
            <div class="first-num">{{num}}</div>
        </li>
    </div>
</template>

<script>
    export default {
        name: "xiaotu",
        props:["title","num","src","laji"],
        methods:{

        }
    }
</script>

<style scoped>
    .index1-first{
        width: 22%;
        height: 167px;
        background: #fff;
        margin:0 14px 0 0;
        padding:24px 0 20px;
        box-sizing: border-box;
        float: left;
    }
    .index1-first img{
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
    .index1-first .img{
        width: 55px;
        height: 55px;
        margin-left:calc((100% - 55px)/2);
        background: url("http://121.42.234.123:8080/public/static/images/admin-icon.png") no-repeat;
    }
    .index1-first:hover{
        box-shadow: 0 0 20px #e0e0e0;
    }
</style>
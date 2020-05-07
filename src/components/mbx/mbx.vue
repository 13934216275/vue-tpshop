<template>
    <div class="bigbox">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(v,index) in $route.matched" :key="index" :to="{ path: v.path }">
                {{v.meta.title}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: "datu"
    }
</script>

<style scoped>
    .bigbox{
        margin:20px 0 30px;
    }
</style>
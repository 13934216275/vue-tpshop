<template>
    <div class="sphsz">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <div style="margin-top: 15px;" class="search-first">
                    <el-input placeholder="请输入内容" v-model="searchData" size="small" :clearable="true">
                        <el-button slot="append" icon="el-icon-search" class="search-firsts" @click="searchFun" ></el-button>
                    </el-input>
                </div>
                <el-cascader
                        v-model="cate"
                        :options="option"
                        class="fenlei"
                        :props="{label:'name',value:'id'}"
                        @change="labelChange"
                        size="small">
                </el-cascader>
            </div>
            <div class="text item">
                <div class="item-table">
                    <template>
                        <el-table
                                :data="tableData"
                                border
                                style="width: 100%">
                            <el-table-column
                                    prop="id"
                                    label="ID">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="商品名称">
                            </el-table-column>
                            <el-table-column
                                    prop="number"
                                    label="商品编号">
                            </el-table-column>
                            <el-table-column
                                    prop="images"
                                    label="商品图片">
                                <template slot-scope="scope">
                                    <img :src="scope.row.images" alt="">
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="cat_id"
                                    label="分类">
                                <template slot-scope="scope">
                                    <p>{{scope.row.name}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="is_up"
                                    label="状态">
                                <template slot-scope="scope">
                                    <el-switch
                                            v-model="scope.row.is_up"
                                            :active-value="1"
                                            :inactive-value="0">
                                    </el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="create_time"
                                    label="创建日期">
                            </el-table-column>
                            <el-table-column
                                    label="操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="editSplb(scope.row)">恢复</el-button>
                                    <el-button size="mini" @click="delshop(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
                <el-pagination
                        layout="prev, pager, next"
                        :page-size="limit"
                        @current-change="fenye"
                        :total="total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import api from "@/api";
    export default {
        name: "sphsz",
        data(){
            return{
                input:"",
                select:"",
                tableData: [],
                //分页
                limit:3,
                page:1,
                total:0,
                //分类筛选
                option:[],
                cate:[0],
                //搜索
                searchData:""
            }
        },
        methods:{
            //恢复
            editSplb(row){
                api.recyle.updategoods(row.id).then(res=>{
                    if(res.data.code==200){
                        this.$message({
                            type:"success",
                            message:"恢复成功"
                        })
                        this.getData();
                    }else{
                        this.$message({
                            type:"error",
                            message:"恢复失败"
                        })
                    }
                }).catch(err=>{
                    this.$message({
                        type:"error",
                        message:"恢复失败"
                    })
                })
            },
            //获取数据

            getData(){
                let limit=JSON.parse(JSON.stringify(this.limit));
                let cate= this.cate[this.cate.length - 1];
                api.recyle.lookgoods(this.page,limit,cate,this.searchData).then(res=>{
                    if(res.data.code==200){
                        this.tableData=res.data.data.data;
                        this.total=res.data.data.total;
                    }else{
                        this.$message({
                            type:"error",
                            message:"获取失败"
                        })
                    }
                }).catch(err=>{
                    this.$message({
                        type:"error",
                        message:"获取失败11"
                    })
                });
                api.category.lookCategory().then(res=>{
                    if(res.data.code==200){
                        this.option=res.data.data;
                        this.option.unshift({
                            "name":"全部分类",
                            "id":0,
                        })
                    }else{
                        this.$message.error("分类获取失败")
                    }
                })
            },
            //删除数据
            delshop(row){
                console.log(row);
                this.$confirm('此操作将永久性的删除该商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    api.recyle.deletegoods("/"+row.id).then(res=>{
                        if(res.data.code==200){
                            this.$message({
                                type:"success",
                                message:"删除成功"
                            });
                            this.getData();
                        }else{
                            this.$message({
                                type:"error",
                                message:"删除失败"
                            });
                        }
                    }).catch(err=>{
                        this.$message({
                            type:"error",
                            message:"删除失败"
                        });
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            //分页
            fenye(val){
                this.page=val;
                this.getData();
            },
            //分类筛选
            labelChange(val){
                this.getData();
            },
            searchFun(){
                this.getData();
            }
        },
        mounted() {
          this.getData();
        }
    }
</script>

<style scoped>
    .sphsz .clearfix{
        width: 100%;
    }
    .sphsz .search-first{
        width: 30%;
        float: left;
        margin-top:0 !important;
    }
    .sphsz .search-firsts{
        padding:12px;
    }
    .sphsz .dropdown-second{
        width: 20%;
        float: right;
    }
    .sphsz .item-table{
        margin-top:20px;
    }
    .sphsz .el-table__row img{
        width: 100px;
        height: 50px;
    }
</style>
<style>
    .sphsz .el-radio-button--small .el-radio-button__inner{
        padding:0!important;
    }
    .sphsz .el-radio-button__inner div{
        padding: 12px 20px;
    }
    .sphsz .fenlei{
        float: right;
    }
</style>
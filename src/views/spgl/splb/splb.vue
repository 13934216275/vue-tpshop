<template>
    <div class="splb">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-button type="primary" size="mini" @click="addsplb">添加</el-button>

                <div style="margin-top: 15px;" class="search-first">
                    <el-input placeholder="请输入内容" v-model="searchData" size="mini"
                    :clearable="true" @clear="labelChange">
                        <el-button slot="append" icon="el-icon-search" class="search-firsts" @click="searchFn"></el-button>
                    </el-input>
                </div>
            </div>
            <div class="text item">
                <div class="item-header">
                    <el-radio-group v-model="is_up" size="small" class="btn-left" @change="labelChange">
                        <el-radio-button label="2">全部商品</el-radio-button>
                        <el-radio-button label="1">已上架</el-radio-button>
                        <el-radio-button label="0">未上架</el-radio-button>
                    </el-radio-group>
                    <el-cascader
                            v-model="cate"
                            :options="option"
                            class="fenlei"
                            :props="{label:'name',value:'id'}"
                            @change="labelChange"
                            size="small">
                    </el-cascader>
                </div>
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
                                    label="是否上架">
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
                                    <el-button size="mini" @click="editSplb(scope.row)">编辑</el-button>
                                    <el-button size="mini" @click="delshop(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                    <el-pagination
                            @current-change="currentChange"
                            class="fenye"
                            :page-size="limit"
                            layout="prev, pager, next"
                            :total="total">
                    </el-pagination>
                </div>
            </div>
        </el-card>
        <!--编辑商品列表-->
        <el-dialog title="编辑商品列表" :visible.sync="editSplbs">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="商品名称" prop="spmc">
                    <el-input type="text" v-model="ruleForm.spmc" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="缩略图" prop="slt">
                    <el-upload
                            action="#"
                            list-type="picture-card"
                            :auto-upload="false">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <img
                                    class="el-upload-list__item-thumbnail"
                                    :src="ruleForm.slt" alt=""
                            >
                            <span class="el-upload-list__item-actions">
        <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="ruleForm.slt" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="分类" prop="fl">
                    <el-input v-model="ruleForm.fl"></el-input>
                </el-form-item>
                <el-form-item label="是否上架" prop="zt">
                    <el-switch
                            v-model="ruleForm.zt"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import api from "@/api";
    import editGoodslist from "../../editGoodslist/editGoodslist";
    export default {
        name: "splb",
        data(){
            return{
                searchData:"",
                //全部商品上架未上架
                is_up:2,
                //分类筛选
                option:[],
                cate:[0],


                select: '',
                editSplbs:false,
                //分页
                page:1,
                limit:5,
                total:0,

                //删除


                tableData: [],

                ruleForm: {
                    spmc: '',
                    fl: '',
                    zt: '',
                    rq: '',
                },
                rules: {
                    spmc: [
                        { required: true, message:"请输入商品名称", trigger: 'blur' }
                    ],
                    fl: [
                        { required: true, message:"请输入商品分类", trigger: 'blur' }
                    ],
                    zt: [
                        { required: true, message:"请输入商品状态", trigger: 'blur' }
                    ]
                },
                dialogVisible: false,
                disabled: false
            }
        },
        methods:{
            addsplb(){
                this.$router.push("/addsplb");
            },
            editSplb(row){
                this.$router.push({
                    path:"editGoodslist",
                    query:{"id":row.id}
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message({
                            showClose: true,
                            message: '修改成功！',
                            type: 'success'
                        });
                        this.editSplbs=false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleRemove(file) {
                console.log(file);
            },
            handlePictureCardPreview(file) {
                this.ruleForm.slt = file.url;
                this.dialogVisible = true;
            },
            handleDownload(file) {
                console.log(file);
            },
            delshop(row){
                this.$confirm('此操作将该商品移入到回收站, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    api.goods.updateGoods(row.id).then(res=>{
                        if(res.data.code==200){
                            this.$message({
                                type:"success",
                                message:"回收成功"
                            })
                            this.getData();
                        }else{
                            this.$message({
                                type:"error",
                                message:"回收失败"
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //分页
            currentChange(p){
                this.page=p;
                this.getData();
            },
            //获取数据
            getData(){
                let cate= this.cate[this.cate.length - 1];
                api.goods.lookGoods(this.page,this.limit,this.is_up,cate,this.searchData).then(res=>{
                    if(res.data.code==200){
                        this.tableData=res.data.data.data;
                        this.total=res.data.data.total;
                        // this.tableData.forEach(item=>{
                        //     // console.log(item.images);
                        // })
                    }else{
                        this.$message.error("获取失败")
                    }
                }).catch(err=>{
                    this.$message.error("获取失败")
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
            //分类
            handleChange(){
                this.getData();
            },
            //全部商品的筛选
            labelChange(){
                this.getData();
            },
            //搜索
            searchFn(){
                this.getData();
            }
        },
        mounted() {
            this.getData();

        }
    }
</script>

<style scoped>
    .splb .search-first{
        width: 30%;
        float: right;
        margin-top:0 !important;
    }
    .splb .search-firsts{
        padding:12px;
    }
   .splb .dropdown-second{
       width: 20%;
       float: right;
   }
    .splb .item-table{
        margin-top:20px;
    }
    .splb .el-table__row img{
        width: 100px;
        height: 50px;
    }
    .splb .demo-ruleForm .el-input{
        width: 50%;
        margin-top:0!important;
    }
    .splb .search-first .el-input{
        width: 60%;
        float: right;
    }
    .fenye{
        margin-top:10px;
    }
</style>
<style>
    .splb .el-radio-button__inner div{
        padding: 12px 20px;
    }
    .splb .el-form-item__label{
        margin-top:10px;
    }
    .splb .el-form-item__error{
        margin-left:70px;
    }
    .splb .fenlei{
        float: right;
    }
</style>
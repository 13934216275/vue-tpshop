<template>
    <div class="spgg">
        <el-card class="box-card">
            <div class="text item">
                <div class="headers">
                    <el-button type="primary" class="addgg" size="small" @click="add = true">添加规格</el-button>
                    <el-button type="danger" class="addgg"  size="small" @click="delall">批量删除</el-button>
                    <div style="margin-top: 15px;" class="search-first">
                        <el-input placeholder="请输入内容" v-model="input" size="small">
                            <el-button slot="append" icon="el-icon-search" class="search-firsts"></el-button>
                        </el-input>
                    </div>
                </div>
                <template>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%"
                            @selection-change="delAll">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="id"
                                label="ID">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="属性名">
                        </el-table-column>
                        <el-table-column
                                prop="value"
                                label="属性值">
                        </el-table-column>
                        <el-table-column
                                prop="create_time"
                                label="创建日期">
                        </el-table-column>
                        <el-table-column
                                label="操作">
                           <template slot-scope="scope">
                               <el-button size="mini" @click="editgiuge(scope.row)">编辑</el-button>
                               <el-button size="mini" @click="deleteAttr(scope.row)">删除</el-button>
                           </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </el-card>
        <!--添加商品规格开始-->
        <el-dialog title="添加商品规格" :visible.sync="add" class="addggs" width="30%">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="属性名" prop="name">
                    <el-input type="text" v-model="ruleForm.name" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item label="属性值" prop="value" class="duogeshuxing">
                    <!--<el-tag
                            :key="tag"
                            v-for="tag in ruleForm.value"
                            closable
                            v-model="ruleForm.value"
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新属性值</el-button>-->
                    <el-input type="text" v-model="ruleForm.value" autocomplete="off" size="small"></el-input>
                    <p>请用英文状态下的逗号分隔开</p>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button @click="add = false">取 消</el-button>
                    <el-button type="primary" @click="addAttribute">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--添加商品规格结束-->
        <!--编辑商品规格开始-->
        <el-dialog title="编辑商品规格" :visible.sync="editgiugea" class="addggs" width="30%">
            <el-form :model="editgiuges" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="属性名" prop="name">
                    <el-input type="text" v-model="editgiuges.name" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item label="属性值" prop="value">
                    <el-input type="text" v-model="editgiuges.value" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button @click="editgiugea = false">取 消</el-button>
                    <el-button type="primary" @click="editgiugeass">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--编辑商品规格结束-->
    </div>
</template>

<script>
    import api from "@/api";
    export default {
        name: "spgg",
        data(){
            return{
                input:"",
                tableData:[],
                selectionData:[],
                add:false,
                //新增属性值开始
                inputVisible: false,
                inputValue: '',
                //新增属性值结束
                editgiugea:false,
                ruleForm: {
                    name: '',
                    value: "",
                },
                editgiuges: {
                    name: '',
                    value: "",
                },
                rules: {
                    sxms: [
                        { required: true, message:"请输入属性名", trigger: 'blur' }
                    ],
                    sxzs: [
                        { required: true, message:"请输入属性值", trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            //添加的点一下加一个
            // handleClose(tag) {
            //     this.ruleForm.value.splice(this.ruleForm.value.indexOf(tag), 1);
            // },
            // showInput() {
            //     this.inputVisible = true;
            //     this.$nextTick(_ => {
            //         this.$refs.saveTagInput.$refs.input.focus();
            //     });
            // },
            // handleInputConfirm() {
            //     let inputValue = this.inputValue;
            //     if (inputValue) {
            //         this.ruleForm.value.push(inputValue);
            //     }
            //     this.inputVisible = false;
            //     this.inputValue = '';
            // },

            //获取数据
            getAttr(){
                api.attribute.lookattribute().then(res=>{
                    if(res.data.code===200){
                        this.tableData=res.data.data;
                    }else{
                        this.$message({
                            type:"error",
                            message:"获取失败"
                        })
                    }
                })
            },

            //添加
            addAttribute(){
                this.$refs["ruleForm"].validate((valid) => {
                    if(valid){
                        api.attribute.Addattribute(this.ruleForm).then(res=>{
                            if(res.data.code===200){
                                this.$message({
                                    type:"success",
                                    message:res.data.msg
                                })
                                this.add=false;
                                this.getAttr();
                                this.ruleForm={
                                    name:"",
                                    value:"",
                                }
                            }else{
                                this.$message({
                                    type:"error",
                                    message:res.data.msg
                                })
                            }
                        }).catch()
                    }else{
                        this.$message({
                            type:"error",
                            message:"添加失败"
                        });
                    }
                })
            },

            //删除
            deleteAttr(row){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    api.attribute.deletecattribute("/"+row.id).then(res=>{
                        if(res.data.code===200){
                            this.$message({
                                type:"success",
                                message:res.data.msg,
                            })
                            this.getAttr();
                        }else{
                            this.$message({
                                type:"error",
                                message:res.data.msg,
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

            //修改
            editgiuge(row){
                this.editgiugea=true;
                this.editgiuges=JSON.parse(JSON.stringify(row));
            },
            editgiugeass(){
                // var id=this.editgiuges.id;
                // var data={
                //     name:this.editgiuges.name,
                //     value:this.editgiuges.value,
                // }
                if(this.editgiuges.name){
                    if(this.editgiuges.value){

                        api.attribute.updateattribute("/"+this.editgiuges.id,this.editgiuges).then(res=>{
                            if(res.data.code===200){
                                this.$message({
                                    type:"success",
                                    message:res.data.msg,
                                });
                                this.editgiugea=false;
                                this.getAttr();
                            }else{
                                this.$message({
                                    type:"error",
                                    message:res.data.msg,
                                });
                            }
                        })
                    }else{
                        this.$message({
                            type:"error",
                            message:"请输入属性值"
                        });
                    }
                }else{
                    this.$message({
                        type:"error",
                        message:"请输入属性名"
                    });
                }
            },

            //删除所有
            delAll(data){
                this.selectionData=data;
            },
            delall(){
                var ids=this.selectionData.map(v=>v.id);
                if(ids!==[]){
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.attribute.deletecattribute("/"+ids).then(res=>{
                            if(res.data.code===200){
                                this.$message({
                                    type:"success",
                                    message:res.data.msg,
                                })
                                this.getAttr();
                            }else{
                                this.$message({
                                    type:"error",
                                    message:res.data.msg,
                                })
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }else{
                    this.$message({
                        type:"error",
                        message:"请至少选择一个数据"
                    });
                }

            }
        },
        mounted() {
            this.getAttr();
        }
    }
</script>

<style scoped>
    .spgg .el-tag + .el-tag {
        margin-left: 10px;
    }
    .spgg .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .spgg .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
    .spgg .box-card{
        margin-top:10px;
    }
    .spgg .headers{
        width: 100%;
        height: 50px;
        /*background: red;*/
    }
    .spgg .addgg{
        float: left;
        margin-top:9px;
    }
    .spgg .search-first{
        width: 30%;
        float: right;
        margin-top:9px !important;
    }
    .spgg .el-form .el-input{
        width: 60%;
    }
    .spgg .btns{
        width: 90%;
        height: 50px;
    }
</style>
<style>
    .spgg .el-form-item__label{
        margin-top:10px !important;
    }
    .spgg .btns .el-form-item__content{
        width: auto !important;
        float: right;
        margin-top:20px;
        margin-right:20px;
    }
    .spgg .el-form-item__error{
        margin-left:70px;
    }
    .duogeshuxing .el-form-item__content{
        width: 70%;
        margin-left:100px!important;
    }
</style>
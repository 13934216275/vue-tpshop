<template>
    <div class="recoms">
        <el-card class="box-card">
            <div class="text item">
                <div class="headers">
                    <el-button type="success" class="addgg" size="small" @click="add = true">添加推荐位</el-button>
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
                            style="width: 100%">
                        <el-table-column
                                prop="id"
                                label="ID">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="推荐位名称">
                        </el-table-column>
                        <el-table-column
                                prop="create_time"
                                label="创建日期">
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="addshuxing(scope.row)">添加</el-button>
                                <el-button size="mini" @click="editshuxing(scope.row)">编辑</el-button>
                                <el-button size="mini" @click="delshuxing(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </el-card>
        <!--添加-->
        <el-dialog title="添加推荐位" :visible.sync="add" class="addggs" width="30%">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="模板名称" prop="name">
                    <el-input type="text" v-model="ruleForm.name" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button @click="add = false">取 消</el-button>
                    <el-button type="primary" @click="addtpl">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--编辑-->
        <el-dialog title="编辑推荐位" :visible.sync="editshuxings" class="addggs" width="30%">
            <el-form :model="editruleForm" status-icon :rules="rules" ref="ruleForms" label-width="100px" class="demo-ruleForm">
                <el-form-item label="模板名称" prop="name">
                    <el-input type="text" v-model="editruleForm.name" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button @click="editshuxings = false">取 消</el-button>
                    <el-button type="primary" @click="edittpl">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import api from "@/api";
    export default {
        name: "recoms",
        data(){
            return{
                input:"",
                editshuxings:false,
                tableData:[],
                add:false,
                ids:[],
                ruleForm: {
                    name: '',
                },
                editruleForm: {
                    name: '',
                },
                rules: {
                    mbmc: [
                        { required: true, message:"请输入模板名称", trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            editshuxing(row){
                this.editshuxings=true;
                this.editruleForm=JSON.parse(JSON.stringify(row));
            },
            addshuxing(row){
                this.$router.push({
                    path:"RecomGoods",
                    query:{"id":row.id}
                });
            },
            //获取数据
            getTPL(){
                api.recom.lookRecom().then(res=>{
                    if(res.data.code==200){
                        this.tableData=res.data.data;
                    }else{
                        this.$message({
                            type:"error",
                            message:res.data.msg
                        })
                    }
                })
            },
            //点击添加确定
            addtpl(){
                this.$refs["ruleForm"].validate((valid) => {
                    if(valid){
                        api.recom.AddRecom(this.ruleForm).then(res=>{
                            if(res.data.code===200){
                                this.$message({
                                    type:"success",
                                    message:res.data.msg
                                });
                                this.add=false;
                                this.getTPL();
                                this.ruleForm={};
                            }else{
                                this.$message({
                                    type:"error",
                                    message:res.data.msg
                                });
                            }
                        })
                    }else{
                        this.$message({
                            type:"error",
                            message:"添加失败"
                        });
                    }
                })
            },
            //点击修改确定
            edittpl(){
                this.$refs["ruleForms"].validate(valid=>{
                    if(valid){
                        var arr={
                            name:this.editruleForm.name,
                        }
                        api.recom.updateRecom("/"+this.editruleForm.id,arr).then(res=>{
                            if(res.data.code===200){
                                this.$message({
                                    type:"success",
                                    message:res.data.msg
                                });
                                this.getTPL();
                                this.editshuxings=false;

                            }else{
                                this.$message({
                                    type:"error",
                                    message:res.data.msg
                                });
                            }
                        })
                    }
                })
            },
            //删除
            delshuxing(row){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    api.recom.deleteRecom("/"+row.id).then(res=>{
                        if(res.data.code===200){
                            this.$message({
                                type:"success",
                                message:res.data.msg
                            });
                            this.getTPL();
                        }else{
                            this.$message({
                                type:"error",
                                message:res.data.msg
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }

        },

        mounted() {
            this.getTPL();
        }
    }
</script>

<style scoped>
    .recoms .box-card{
        margin-top:10px;
    }
    .recoms .headers{
        width: 100%;
        height: 50px;
        /*background: red;*/
    }
    .recoms .addgg{
        float: left;
        margin-top:9px;
    }
    .recoms .search-first{
        width: 30%;
        float: right;
        margin-top:9px !important;
    }
    .recoms .el-form .el-input{
        width: 100%;
        float: left;
        margin-left:0;
    }

</style>
<style>
    .recoms .el-form-item__label{
        margin-top:10px !important;
    }
    .recoms .el-form-item__content{
        width: auto !important;
        float: left;
    }
    .recoms .el-form-item__error{
        margin-left:0 !important;
    }
    .recoms .btns .el-form-item__content{
        width: auto !important;
        float: right;
        margin-top:20px;
        margin-right:20px;
    }
</style>
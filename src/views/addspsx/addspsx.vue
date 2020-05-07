<template>
    <div class="addspsx">
        <el-card class="box-card">
            <div class="text item">
                <div class="headers">
                    <el-button type="success" class="addgg" size="small" @click="add = true">添加参数</el-button>
                    <div style="margin-top: 15px;" class="search-first">
                        <el-input placeholder="请输入内容" v-model="input" size="small">
                            <el-button slot="append" icon="el-icon-search" class="search-firsts"></el-button>
                        </el-input>
                    </div>
                </div>
                <template>
                    <el-table
                            :data="tableDatas"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="id"
                                label="ID"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="type"
                                label="规格名">
                        </el-table-column>
                        <el-table-column
                                prop="value"
                                label="规格值">
                        </el-table-column>
                        <el-table-column
                                prop="create_time"
                                label="创建日期">
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="editshuxing(scope.row)">编辑</el-button>
                                <el-button size="mini" @click="deltype(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </el-card>
        <el-dialog title="添加参数" :visible.sync="add" class="addggs" width="30%">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm">
                <el-form-item label="规格名称" prop="type">
                    <el-input type="text" v-model="ruleForm.type" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item label="规格值" prop="value">
                    <el-input type="text" v-model="ruleForm.value" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button @click="add = false">取 消</el-button>
                    <el-button type="primary" @click="addType">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>


        <el-dialog title="编辑参数" :visible.sync="editshuxings" class="addggs" width="30%">
            <el-form :model="editruleForm" status-icon :rules="rules" ref="editruleForm" label-width="auto" class="demo-ruleForm">
                <el-form-item label="规格名称" prop="type">
                    <el-input type="text" v-model="editruleForm.type" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item label="规格值" prop="value">
                    <el-input type="text" v-model="editruleForm.value" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button @click="editshuxings = false">取 消</el-button>
                    <el-button type="primary" @click="edittype">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import api from "@/api";
    export default {
        name: "addspsx",
        data(){
            return{
                input:"",
                editshuxings:false,
                idd:"",
                tableDatas:[],
                add:false,
                ruleForm: {
                    sid:"",
                    type: '',
                    value: '',
                },
                editruleForm: {
                    sid:"",
                    type: '',
                    value: '',
                },
                rules: {
                    type: [
                        { required: true, message:"请输入参数模板名称", trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            editshuxing(row){
                this.editshuxings=true;
                this.editruleForm=JSON.parse(JSON.stringify(row));
            },
            //获取数据
            getType(){
                // alert(111)
                api.specstype.lookspecstype().then(res=>{
                    if(res.data.code===200){
                        res.data.data.forEach(ele=>{
                            if(ele.sid==this.idd){
                                this.tableDatas.push(ele);
                            }
                        })
                    }else{
                        this.$message({
                            type:404,
                            message:"获取失败"
                        });
                    }
                })
            },
            //添加
            addType(){
                this.$refs['ruleForm'].validate(valid=>{
                    if(valid){
                        var add={
                            type:this.ruleForm.type,
                            value:this.ruleForm.value,
                            sid:this.idd
                        };
                        console.log(add);
                        api.specstype.Addspecstype(add).then(res=>{
                            console.log(res);
                            if(res.data.code==200){
                                this.$message({
                                    type:"success",
                                    message:res.data.msg
                                })
                                this.getType();
                                this.tableDatas=[];
                                this.ruleForm={};
                                this.add=false;
                            }else{
                                this.$message({
                                    type:"error",
                                    message:res.data.msg
                                })
                            }
                        })
                    }
                })
            },
            //修改
            edittype(){
                this.$refs['editruleForm'].validate(valid=>{
                    if(valid){
                        var arrs={
                            type:this.editruleForm.type,
                            value:this.editruleForm.value,
                            sid:this.editruleForm.sid
                        }
                        api.specstype.updatespecstype("/"+this.editruleForm.id,arrs).then(res=>{
                            if(res.data.code==200){
                                this.$message({
                                    type:"success",
                                    message:res.data.msg
                                })
                                this.editshuxings=false;

                                this.getType();
                                this.tableDatas=[];
                            }else{
                                this.$message({
                                    type:"error",
                                    message:res.data.msg
                                })
                            }
                        })
                    }
                })
            },
            //删除
            deltype(row){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    api.specstype.deletespecstype("/"+row.id).then(res=>{
                        if(res.data.code==200){
                            this.$message({
                                type:"success",
                                message:res.data.msg
                            });

                            this.getType();
                            this.tableDatas=[];
                        }else{
                            this.$message({
                                type:"error",
                                message:res.data.msg
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        mounted() {
            this.idd=this.$route.query['id'];
            this.ruleForm.sid=this.$route.query['id'];
            this.editruleForm.sid=this.$route.query['id'];
            this.getType();
        }
    }
</script>

<style scoped>
    .addspsx .box-card{
        margin-top:10px;
    }
    .addspsx .headers{
        width: 100%;
        height: 50px;
        /*background: red;*/
    }
    .addspsx .addgg{
        float: left;
        margin-top:9px;
    }
    .addspsx .search-first{
        width: 30%;
        float: right;
        margin-top:9px !important;
    }
    .addspsx .el-form .el-input{
        width: 100%;
        float: left;
        margin-left:0;
    }

</style>
<style>
    .addspsx .el-form-item__label{
        margin-top:10px !important;
    }
    .addspsx .el-form-item__content{
        width: auto !important;
        float: left;
    }
    .addspsx .el-form-item__error{
        margin-left:0 !important;
    }
    .addspsx .btns .el-form-item__content{
        width: auto !important;
        float: right;
        margin-top:20px;
        margin-right:20px;
    }

</style>
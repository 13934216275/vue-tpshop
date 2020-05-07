<template>
    <div class="jsgl">
        <el-card class="box-card">
            <div class="ddlb-header">
                <el-button size="small" type="primary" class="btn" @click="addjuese">添加角色</el-button>
                <el-input placeholder="请输入内容" v-model="input" class="ddlb-right" size="medium ">
                    <template slot="append">
                        <i class="el-icon-search"></i>
                    </template>
                </el-input>
            </div>
            <template>
                <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="id"
                            label="ID">
                    </el-table-column>
                    <el-table-column
                            prop="jsmc"
                            label="角色名称">
                    </el-table-column>
                    <el-table-column
                            prop="ms"
                            label="描述">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="240">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="chakanjuese(scope.row)">查看</el-button>
                            <el-button size="mini" @click="editjuese(scope.row)">编辑</el-button>
                            <el-button size="mini" @click="deletejuese(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <el-pagination
                    background
                    class="fenye"
                    layout="prev, pager, next"
                    :total="50">
            </el-pagination>
        </el-card>
        <!--添加角色-->
        <el-dialog title="添加角色" :visible.sync="addjueses">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="ID" prop="id">
                            <el-input type="text" v-model="ruleForm.id" autocomplete="off" disabled size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="角色名称" prop="jsmc">
                            <el-input type="text" v-model="ruleForm.jsmc" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="描述" prop="ms">
                            <el-input type="text" v-model="ruleForm.ms" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="tianjiabtn">
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--查看角色-->
        <el-dialog title="查看角色" :visible.sync="chakanjueses">
            <el-form :model="chakanruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="ID" prop="id">
                            <el-input type="text" v-model="chakanruleForm.id" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="角色名称" prop="jsmc">
                            <el-input type="text" v-model="chakanruleForm.jsmc" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="描述" prop="ms">
                            <el-input type="text" v-model="chakanruleForm.ms" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="chakanbtn">
                    <el-button type="primary" @click="chakanjuesess">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--编辑角色-->
        <el-dialog title="编辑角色" :visible.sync="editjueses">
            <el-form :model="editruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="ID" prop="id">
                            <el-input type="text" v-model="editruleForm.id" autocomplete="off" size="small" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="角色名称" prop="jsmc">
                            <el-input type="text" v-model="editruleForm.jsmc" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="描述" prop="ms">
                            <el-input type="text" v-model="editruleForm.ms" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="chakanbtn">
                    <el-button type="primary" @click="editjuesess">确定</el-button>
                    <el-button  @click="editjuesesss">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "jsgl",
        data(){
            return{
                select:"",
                input:'',
                tableData: [
                    {
                        id:"17",
                        jsmc:"运营",
                        ms:"负责用户订单",
                    },
                    {
                        id:"17",
                        jsmc:"运营",
                        ms:"负责用户订单",
                    },
                    {
                        id:"17",
                        jsmc:"运营",
                        ms:"负责用户订单",
                    },
                    {
                        id:"17",
                        jsmc:"运营",
                        ms:"负责用户订单",
                    },
                    {
                        id:"17",
                        jsmc:"运营",
                        ms:"负责用户订单",
                    },
                    {
                        id:"17",
                        jsmc:"运营",
                        ms:"负责用户订单",
                    }
                ],
                addjueses:false,
                chakanjueses:false,
                editjueses:false,
                ruleForm: {
                    id:"",
                    jsmc:"",
                    ms:"",
                },
                chakanruleForm: {
                    id:"",
                    jsmc:"",
                    ms:"",
                },
                editruleForm: {
                    id:"",
                    jsmc:"",
                    ms:"",
                },
                rules: {
                    jsmc: [
                        { required:true, message:"请输入角色名称", trigger: 'blur' }
                    ],
                    ms: [
                        { required:true, message:"请输入描述", trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            chakanjuese(row){
                this.chakanjueses=true;
                this.chakanruleForm=row;
            },
            //查看
            chakanjuesess(){
                this.chakanjueses=false;
            },
            deletejuese(row){
                this.tableData.splice(this.tableData.indexOf(row),1);
            },

            editjuese(row){
                this.editjueses=true;
                this.editruleForm=row;
            },
            editjuesess(){
                this.editjueses=false;
            },
            editjuesesss(){
                this.editjueses=false;
            },
            // 添加角色
            addjuese(){
                this.ruleForm={
                    gysmc:"",
                    gysms:"",
                    gyslxr:"",
                    gysdh:"",
                    ssgly:"",
                    zt:"",
                };
                this.ruleForm.id=this.tableData.length;
                this.addjueses=true;
            },
            //提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.tableData.push(this.ruleForm);

                        this.addjueses=false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }
    }
</script>

<style scoped>
    .jsgl .ddlb-header{
        width: 100%;
        height: 40px;
        /*background: red;*/
    }
    .jsgl .fenye{
        margin-top:10px;
    }
    .jsgl .ddlb-header .btn{
        float: left;
    }
    .jsgl .ddlb-center{
        width: 100%;
        height: 50px;
        /*background: green;*/
        margin-top:10px;
    }
    .jsgl .ddlb-right{
        width: 30%;
        float: right;
    }
    .jsgl .tianjia .el-input{
        width: 70%;
    }
    .jsgl .tianjiabtn{
        text-align: right;
        margin-right:100px;
    }
</style>
<style>
    .jsgl .el-form-item__label{
        margin-top:10px;
    }
    .jsgl .tianjia .el-form-item__error{
        margin-left:75px;
    }
    .jsgl .chakanbtn{
        text-align: right;
        margin-right:100px;
    }
</style>
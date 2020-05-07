<template>
    <div class="glylb">
        <el-card class="box-card">
            <div class="ddlb-header">
                <el-button size="small" type="primary" class="btn" @click="addadmin">添加管理员</el-button>
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
                            prop="yhm"
                            label="用户名">
                    </el-table-column>
                    <el-table-column
                            prop="ssjs"
                            label="所属角色">
                    </el-table-column>
                    <el-table-column
                            prop="email"
                            label="Email地址">
                    </el-table-column>
                    <el-table-column
                            prop="jrsj"
                            label="加入时间">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="240">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="chakanadmin(scope.row)">查看</el-button>
                            <el-button size="mini" @click="editadmin(scope.row)">编辑</el-button>
                            <el-button size="mini" @click="deleteadmin(scope.row)">删除</el-button>
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
        <!--添加管理员-->
        <el-dialog title="添加管理员" :visible.sync="addadmins">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="ID" prop="id">
                            <el-input type="text" v-model="ruleForm.id" autocomplete="off" disabled size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="用户名" prop="yhm">
                            <el-input type="text" v-model="ruleForm.yhm" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="所属角色" prop="ssjs">
                            <el-input type="text" v-model="ruleForm.ssjs" autocomplete="off" size="small"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item label="Email地址" prop="email">
                            <el-input v-model.number="ruleForm.email" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="加入时间" prop="jrsj">
                            <el-input v-model.number="ruleForm.jrsj" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="tianjiabtn">
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--查看管理员-->
        <el-dialog title="查看管理员" :visible.sync="chakanadmins">
            <el-form :model="chakanruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="ID" prop="id">
                            <el-input type="text" v-model="chakanruleForm.id" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="用户名" prop="yhm">
                            <el-input type="text" v-model="chakanruleForm.yhm" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="所属角色" prop="ssjs">
                            <el-input type="text" v-model="chakanruleForm.ssjs" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item label="Email地址" prop="email">
                            <el-input v-model.number="chakanruleForm.email" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="加入时间" prop="jrsj">
                            <el-input v-model="chakanruleForm.jrsj" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="chakanbtn">
                    <el-button type="primary" @click="chakanadminss">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--编辑管理员-->
        <el-dialog title="编辑管理员" :visible.sync="editadmins">
            <el-form :model="editruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="ID" prop="id">
                            <el-input type="text" v-model="editruleForm.id" autocomplete="off" size="small" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="用户名" prop="yhm">
                            <el-input type="text" v-model="editruleForm.yhm" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="所属角色" prop="ssjs">
                            <el-input type="text" v-model="editruleForm.ssjs" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="Email地址" prop="email">
                            <el-input v-model.number="editruleForm.email" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="加入时间" prop="jrsj">
                            <el-input v-model="editruleForm.jrsj" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="chakanbtn">
                    <el-button type="primary" @click="editadminss">确定</el-button>
                    <el-button  @click="editadminsss">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "glylb",
        data(){
            return{
                select:"",
                input:'',
                tableData: [
                    {
                        id:"0",
                        yhm:"张三",
                        ssjs:"123",
                        email:"123@qq.com",
                        jrsj:"2019-07-07"
                    }
                ],
                addadmins:false,
                chakanadmins:false,
                editadmins:false,
                ruleForm: {
                    id:"",
                    yhm:"",
                    ssjs:"",
                    email:"",
                    jrsj:"",
                },
                chakanruleForm: {
                    id:"",
                    yhm:"",
                    ssjs:"",
                    email:"",
                    jrsj:"",
                },
                editruleForm: {
                    id:"",
                    yhm:"",
                    ssjs:"",
                    email:"",
                    jrsj:"",
                },
                rules: {
                    yhm: [
                        { required:true, message:"请输入用户名", trigger: 'blur' }
                    ],
                    ssjs: [
                        { required:true, message:"请输入所属角色", trigger: 'blur' }
                    ],
                    email: [
                        { required:true, message:"请输入Email地址", trigger: 'blur' }
                    ],
                    jrsj: [
                        { required:true, message:"请输入加入时间", trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            chakanadmin(row){
                this.chakanadmins=true;
                this.chakanruleForm=row;
            },
            //查看
            chakanadminss(){
                this.chakanadmins=false;
            },
            deleteadmin(row){
                this.tableData.splice(this.tableData.indexOf(row),1);
            },

            editadmin(row){
                this.editadmins=true;
                this.editruleForm=row;
            },
            editadminss(){
                this.editadmins=false;
            },
            editadminsss(){
                this.editadmins=false;
            },
            // 添加会员
            addadmin(){
                this.ruleForm={
                    gysmc:"",
                    gysms:"",
                    gyslxr:"",
                    gysdh:"",
                    ssgly:"",
                    zt:"",
                };
                this.ruleForm.id=this.tableData.length;
                this.addadmins=true;
            },
            //提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.tableData.push(this.ruleForm);

                        this.addadmins=false;
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
    .glylb .ddlb-header{
        width: 100%;
        height: 40px;
        /*background: red;*/
    }
    .glylb .fenye{
        margin-top:10px;
    }
    .glylb .ddlb-header .btn{
        float: left;
    }
    .glylb .ddlb-center{
        width: 100%;
        height: 50px;
        /*background: green;*/
        margin-top:10px;
    }
    .glylb .ddlb-right{
        width: 30%;
        float: right;
    }
    .tianjia .el-input{
        width: 70%;
    }
    .tianjiabtn{
        text-align: right;
        margin-right:100px;
    }
</style>
<style>
    .el-form-item__label{
        margin-top:10px;
    }
    .tianjia .el-form-item__error{
        margin-left:75px;
    }
    .chakanbtn{
        text-align: right;
        margin-right:100px;
    }
</style>
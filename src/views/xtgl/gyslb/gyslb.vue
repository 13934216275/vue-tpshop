<template>
    <div class="gyslb">
        <el-card class="box-card">
            <div class="ddlb-header">
                <el-button size="small" type="primary" class="btn" @click="addgyslb">添加供应商</el-button>
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
                            prop="gysmc"
                            label="供应商名称">
                    </el-table-column>
                    <el-table-column
                            prop="gysms"
                            label="供应商描述">
                    </el-table-column>
                    <el-table-column
                            prop="gyslxr"
                            label="供应商联系人">
                    </el-table-column>
                    <el-table-column
                            prop="gysdh"
                            label="供应商电话">
                    </el-table-column>
                    <el-table-column
                            prop="ssgly"
                            label="所属管理员">
                    </el-table-column>
                    <el-table-column
                            prop="zt"
                            label="状态">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="240">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="chakangyslb(scope.row)">查看</el-button>
                            <el-button size="mini" @click="editgyslb(scope.row)">编辑</el-button>
                            <el-button size="mini" @click="deletegyslb(scope.row)">删除</el-button>
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
        <!--添加供应商-->
        <el-dialog title="添加供应商" :visible.sync="addgyslbs">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="ID" prop="id">
                            <el-input type="text" v-model="ruleForm.id" autocomplete="off" disabled size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="供应商名称" prop="gysmc">
                            <el-input type="text" v-model="ruleForm.gysmc" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="供应商描述" prop="gysms">
                            <el-input type="text" v-model="ruleForm.gysms" autocomplete="off" size="small"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item label="供应商联系人" prop="gyslxr">
                            <el-input v-model.number="ruleForm.gyslxr" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="供应商电话" prop="gysdh">
                            <el-input v-model.number="ruleForm.gysdh" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="所属管理员" prop="ssgly">
                            <el-input v-model="ruleForm.ssgly" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="状态" prop="zt">
                            <el-input v-model="ruleForm.zt" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="tianjiabtn">
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--查看供应商-->
        <el-dialog title="查看供应商" :visible.sync="chakangyslbs">
            <el-form :model="chakanruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="ID" prop="id">
                            <el-input type="text" v-model="chakanruleForm.id" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="供应商名称" prop="gysmc">
                            <el-input type="text" v-model="chakanruleForm.gysmc" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="供应商描述" prop="gysms">
                            <el-input type="text" v-model="chakanruleForm.gysms" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item label="供应商联系人" prop="gyslxr">
                            <el-input v-model.number="chakanruleForm.gyslxr" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="供应商电话" prop="gysdh">
                            <el-input v-model="chakanruleForm.gysdh" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="所属管理员" prop="ssgly">
                            <el-input v-model="chakanruleForm.ssgly" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="状态" prop="zt">
                            <el-input v-model="chakanruleForm.zt" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="chakanbtn">
                    <el-button type="primary" @click="chakangyslbss">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--编辑供应商-->
        <el-dialog title="编辑供应商" :visible.sync="editgyslbs">
            <el-form :model="editruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="ID" prop="id">
                            <el-input type="text" v-model="editruleForm.id" autocomplete="off" size="small" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="供应商名称" prop="gysmc">
                            <el-input type="text" v-model="editruleForm.gysmc" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="供应商描述" prop="gysms">
                            <el-input type="text" v-model="editruleForm.gysms" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="供应商联系人" prop="gyslxr">
                            <el-input v-model.number="editruleForm.gyslxr" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="供应商电话" prop="gysdh">
                            <el-input v-model="editruleForm.gysdh" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="所属管理员" prop="ssgly">
                            <el-input v-model="editruleForm.ssgly" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="状态" prop="zt">
                            <el-input v-model="editruleForm.zt" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="chakanbtn">
                    <el-button type="primary" @click="editgyslbss">确定</el-button>
                    <el-button  @click="editgyslbsss">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "gyslb",
        data(){
            return{
                select:"",
                input:'',
                tableData: [
                    {
                        id:"0",
                        gysmc:"123",
                        gysms:"asd",
                        gyslxr:"张三",
                        gysdh:"110",
                        ssgly:"小店区",
                        zt:"待发货",
                    }
                ],
                addgyslbs:false,
                chakangyslbs:false,
                editgyslbs:false,
                ruleForm: {
                    id:"",
                    gysmc:"",
                    gysms:"",
                    gyslxr:"",
                    gysdh:"",
                    ssgly:"",
                    zt:"",
                },
                chakanruleForm: {
                    id:"",
                    gysmc:"",
                    gysms:"",
                    gyslxr:"",
                    gysdh:"",
                    ssgly:"",
                    zt:"",
                },
                editruleForm: {
                    id:"",
                    gysmc:"",
                    gysms:"",
                    gyslxr:"",
                    gysdh:"",
                    ssgly:"",
                    zt:"",
                },
                rules: {
                    gysmc: [
                        { required:true, message:"请输入供应商名称", trigger: 'blur' }
                    ],
                    gysms: [
                        { required:true, message:"请输入供应商描述", trigger: 'blur' }
                    ],
                    gyslxr: [
                        { required:true, message:"请输入供应商联系人", trigger: 'blur' }
                    ],
                    gysdh: [
                        { required:true, message:"请输入供应商电话", trigger: 'blur' }
                    ],
                    ssgly: [
                        { required:true, message:"请输入所属管理员", trigger: 'blur' }
                    ],
                    zt: [
                        { required:true, message:"请输入状态", trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            chakangyslb(row){
                this.chakangyslbs=true;
                this.chakanruleForm=row;
            },
            //查看
            chakangyslbss(){
                this.chakangyslbs=false;
            },
            deletegyslb(row){
                this.tableData.splice(this.tableData.indexOf(row),1);
            },

            editgyslb(row){
                this.editgyslbs=true;
                this.editruleForm=row;
            },
            editgyslbss(){
                this.editgyslbs=false;
            },
            editgyslbsss(){
                this.editgyslbs=false;
            },
            // 添加会员
            addgyslb(){
                this.ruleForm={
                    gysmc:"",
                    gysms:"",
                    gyslxr:"",
                    gysdh:"",
                    ssgly:"",
                    zt:"",
                };
                this.ruleForm.id=this.tableData.length;
                this.addgyslbs=true;
            },
            //提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.tableData.push(this.ruleForm);

                        this.addgyslbs=false;
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
    .gyslb .ddlb-header{
        width: 100%;
        height: 40px;
        /*background: red;*/
    }
    .gyslb .fenye{
        margin-top:10px;
    }
    .gyslb .ddlb-header .btn{
        float: left;
    }
    .gyslb .ddlb-center{
        width: 100%;
        height: 50px;
        /*background: green;*/
        margin-top:10px;
    }
    .gyslb .ddlb-right{
        width: 30%;
        float: right;
    }
    .gyslb .tianjia .el-input{
        width: 70%;
    }
    .gyslb .tianjiabtn{
        text-align: right;
        margin-right:100px;
    }
</style>
<style>
    .gyslb .el-form-item__label{
        margin-top:10px;
    }
    .gyslb .tianjia .el-form-item__error{
        margin-left:75px;
    }
    .gyslb .chakanbtn{
        text-align: right;
        margin-right:100px;
    }
</style>
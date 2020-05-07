<template>
    <div class="qxzygl">
        <el-card class="box-card">
            <div class="ddlb-header">
                <el-button size="small" type="primary" class="btn" @click="addgyslb">添加权限</el-button>
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
                            prop="mc"
                            label="名称">
                    </el-table-column>
                    <el-table-column
                            prop="zylx"
                            label="资源类型">
                    </el-table-column>
                    <el-table-column
                            prop="ssfz"
                            label="所属分组">
                    </el-table-column>
                    <el-table-column
                            prop="qxm"
                            label="权限码">
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
                        <el-form-item label="名称" prop="mc">
                            <el-input type="text" v-model="ruleForm.mc" autocomplete="off" disabled size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="资源类型" prop="zylx">
                            <el-input type="text" v-model="ruleForm.zylx" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="所属分组" prop="ssfz">
                            <el-input type="text" v-model="ruleForm.ssfz" autocomplete="off" size="small"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item label="权限码" prop="qxm">
                            <el-input v-model.number="ruleForm.qxm" size="small"></el-input>
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
                        <el-form-item label="名称" prop="mc">
                            <el-input type="text" v-model="chakanruleForm.mc" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="资源类型" prop="zylx">
                            <el-input type="text" v-model="chakanruleForm.zylx" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="所属分组" prop="ssfz">
                            <el-input type="text" v-model="chakanruleForm.ssfz" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item label="权限码" prop="qxm">
                            <el-input v-model.number="chakanruleForm.qxm" size="small" readonly></el-input>
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
                        <el-form-item label="名称" prop="mc">
                            <el-input type="text" v-model="editruleForm.mc" autocomplete="off" size="small" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="资源类型" prop="zylx">
                            <el-input type="text" v-model="editruleForm.zylx" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="所属分组" prop="ssfz">
                            <el-input type="text" v-model="editruleForm.ssfz" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="权限码" prop="qxm">
                            <el-input v-model.number="editruleForm.qxm" size="small"></el-input>
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
        name: "qxzygl",
        data(){
            return{
                select:"",
                input:'',
                tableData: [
                    {
                        mc:"手机模板装修",
                        zylx:"平台后台",
                        ssfz:"系统设置",
                        qxm:"3456789786345",
                    },
                    {
                        mc:"手机模板装修",
                        zylx:"平台后台",
                        ssfz:"系统设置",
                        qxm:"3456789786345",
                    },
                    {
                        mc:"手机模板装修",
                        zylx:"平台后台",
                        ssfz:"系统设置",
                        qxm:"3456789786345",
                    },
                    {
                        mc:"手机模板装修",
                        zylx:"平台后台",
                        ssfz:"系统设置",
                        qxm:"3456789786345",
                    },
                    {
                        mc:"手机模板装修",
                        zylx:"平台后台",
                        ssfz:"系统设置",
                        qxm:"3456789786345",
                    },
                    {
                        mc:"手机模板装修",
                        zylx:"平台后台",
                        ssfz:"系统设置",
                        qxm:"3456789786345",
                    }
                ],
                addgyslbs:false,
                chakangyslbs:false,
                editgyslbs:false,
                ruleForm: {
                    mc:"",
                    zylx:"",
                    ssfz:"",
                    qxm:"",
                },
                chakanruleForm: {
                    mc:"",
                    zylx:"",
                    ssfz:"",
                    qxm:"",
                },
                editruleForm: {
                    mc:"",
                    zylx:"",
                    ssfz:"",
                    qxm:"",
                },
                rules: {
                    mc: [
                        { required:true, message:"请输入名称", trigger: 'blur' }
                    ],
                    zylx: [
                        { required:true, message:"请输入资源类型", trigger: 'blur' }
                    ],
                    ssfz: [
                        { required:true, message:"请输入所属分组", trigger: 'blur' }
                    ],
                    qxm: [
                        { required:true, message:"请输入权限码", trigger: 'blur' }
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
    .qxzygl .ddlb-header{
        width: 100%;
        height: 40px;
        /*background: red;*/
    }
    .qxzygl .fenye{
        margin-top:10px;
    }
    .qxzygl .ddlb-header .btn{
        float: left;
    }
    .qxzygl .ddlb-center{
        width: 100%;
        height: 50px;
        /*background: green;*/
        margin-top:10px;
    }
    .qxzygl .ddlb-right{
        width: 30%;
        float: right;
    }
    .qxzygl .tianjia .el-input{
        width: 70%;
    }
    .qxzygl .tianjiabtn{
        text-align: right;
        margin-right:100px;
    }
</style>
<style>
    .qxzygl .el-form-item__label{
        margin-top:10px;
    }
    .qxzygl .tianjia .el-form-item__error{
        margin-left:75px;
    }
    .qxzygl .chakanbtn{
        text-align: right;
        margin-right:100px;
    }
</style>
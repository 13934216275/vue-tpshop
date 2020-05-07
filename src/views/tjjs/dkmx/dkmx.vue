<template>
    <div class="dkmx">
        <el-card class="box-card">
            <div class="ddlb-header">
                <el-button size="small" type="primary" class="btn"  @click="adddaikuan">添加</el-button>
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
                            prop="rq"
                            label="日期">
                    </el-table-column>
                    <el-table-column
                            prop="kh"
                            label="客户">
                    </el-table-column>
                    <el-table-column
                            prop="sp"
                            label="商品">
                    </el-table-column>
                    <el-table-column
                            prop="dgsl"
                            label="订购数量">
                    </el-table-column>
                    <el-table-column
                            prop="dj"
                            label="单价">
                    </el-table-column>
                    <el-table-column
                            prop="zj"
                            label="总计">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="240">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="chakandaikuan(scope.row)">查看</el-button>
                            <el-button size="mini" @click="editdaikuan(scope.row)">编辑</el-button>
                            <el-button size="mini" @click="deletedaikuan(scope.row)">删除</el-button>
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
        <!--添加贷款-->
        <el-dialog title="添加贷款" :visible.sync="adddaikuans">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="日期" prop="rq">
                            <el-input type="text" v-model="ruleForm.rq" autocomplete="off" disabled size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="客户" prop="kh">
                            <el-input type="text" v-model="ruleForm.kh" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="商品" prop="sp">
                            <el-input type="text" v-model="ruleForm.sp" autocomplete="off" size="small"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item label="订购数量" prop="dgsl">
                            <el-input v-model.number="ruleForm.dgsl" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="单价" prop="dj">
                            <el-input v-model="ruleForm.dj" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="总计" prop="zj">
                            <el-input v-model="ruleForm.zj" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="tianjiabtn">
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--查看贷款-->
        <el-dialog title="查看贷款" :visible.sync="chakandaikuans">
            <el-form :model="chakanruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="日期" prop="rq">
                            <el-input type="text" v-model="chakanruleForm.rq" autocomplete="off" disabled size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="客户" prop="kh">
                            <el-input type="text" v-model="chakanruleForm.kh" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="商品" prop="sp">
                            <el-input type="text" v-model="chakanruleForm.sp" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item label="订购数量" prop="dgsl">
                            <el-input v-model.number="chakanruleForm.dgsl" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="单价" prop="dj">
                            <el-input v-model="chakanruleForm.dj" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="总计" prop="zj">
                            <el-input v-model="chakanruleForm.zj" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="chakanbtn">
                    <el-button type="primary" @click="chakandaikuanss">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--编辑贷款-->
        <el-dialog title="编辑贷款" :visible.sync="editdaikuans">
            <el-form :model="editruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="ID" prop="id">
                            <el-input type="text" v-model="editruleForm.id" autocomplete="off" disabled size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="客户" prop="kh">
                            <el-input type="text" v-model="editruleForm.kh" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="商品" prop="sp">
                            <el-input type="text" v-model="editruleForm.sp" autocomplete="off" size="small"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item label="订购数量" prop="dgsl">
                            <el-input v-model.number="editruleForm.dgsl" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="单价" prop="dj">
                            <el-input v-model="editruleForm.dj" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="总计" prop="zj">
                            <el-input v-model="editruleForm.zj" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="chakanbtn">
                    <el-button type="primary" @click="editdaikuanss">确定</el-button>
                    <el-button  @click="editdaikuans = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "dkmx",
        data(){
            return{
                select:"",
                input:'',
                tableData: [
                    {
                        rq:"2019-05-02",
                        kh:"王小虎",
                        sp:"顾家工艺沙发",
                        dgsl:"123",
                        dj:"￥355",
                        zj:"￥355",
                    }
                ],
                adddaikuans:false,
                chakandaikuans:false,
                editdaikuans:false,
                ruleForm: {
                    rq:"",
                    kh:"",
                    sp:"",
                    dgsl:"",
                    dj:"",
                    zj:"",
                },
                chakanruleForm: {
                    rq:"",
                    kh:"",
                    sp:"",
                    dgsl:"",
                    dj:"",
                    zj:"",
                },
                editruleForm: {
                    rq:"",
                    kh:"",
                    sp:"",
                    dgsl:"",
                    dj:"",
                    zj:"",
                },
                rules: {
                    kh: [
                        { required:true, message:"请输入客户名称", trigger: 'blur' }
                    ],
                    sp: [
                        { required:true, message:"请输入商品", trigger: 'blur' }
                    ],
                    dgsl: [
                        { required:true, message:"请输入订购数量", trigger: 'blur' }
                    ],
                    dj: [
                        { required:true, message:"请输入单价", trigger: 'blur' }
                    ],
                    zj: [
                        { required:true, message:"请输入总计", trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            chakandaikuan(row){
                this.chakandaikuans=true;
                this.chakanruleForm=row;
            },
            adddaikuan(){
                this.ruleForm={
                    kh: '',
                    sp: '',
                    dgsl: '',
                    dj: '',
                    zj: '',
                };
                this.ruleForm.id=this.tableData.length;
                this.ruleForm.zcrq=new Date().getTime();
                this.adddaikuans=true;
            },
            //提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.tableData.push(this.ruleForm);

                        this.adddaikuans=false;
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
            //查看
            chakandaikuanss(){
                this.chakandaikuans=false;
            },
            deletedaikuan(row){
                this.tableData.splice(this.tableData.indexOf(row),1);
            },

            editdaikuan(row){
                this.editdaikuans=true;
                this.editruleForm=row;
            },
            editdaikuanss(){
                this.editdaikuans=false;
            },
        }
    }
</script>

<style scoped>
    .dkmx .ddlb-header{
        width: 100%;
        height: 40px;
        /*background: red;*/
    }
    .dkmx .fenye{
        margin-top:10px;
    }
    .dkmx .ddlb-header .btn{
        float: left;
    }
    .dkmx .ddlb-center{
        width: 100%;
        height: 50px;
        /*background: green;*/
        margin-top:10px;
    }
    .dkmx .ddlb-right{
        width: 30%;
        float: right;
    }
    .dkmx .tianjia .el-input{
        width: 70%;
    }
</style>
<style>
    .dkmx .el-form-item__label{
        margin-top:10px;
    }
    .dkmx .tianjia .el-form-item__error{
        margin-left:70px;
    }
    .dkmx .tianjiabtn{
        text-align: right;
        margin-right:100px;
    }
    .dkmx .chakanbtn{
        text-align: right;
        margin-right:100px;
    }
</style>
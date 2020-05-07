<template>
    <div class="jytk">
        <el-card class="box-card">
            <div class="ddlb-header">
                <el-button size="small" type="primary" class="btn" @click="addjiaoyi">添加</el-button>
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
                            prop="yhm"
                            label="用户名">
                    </el-table-column>
                    <el-table-column
                            prop="ddh"
                            label="订单号">
                    </el-table-column>
                    <el-table-column
                            prop="spm"
                            label="商品名">
                    </el-table-column>
                    <el-table-column
                            prop="sl"
                            label="数量">
                    </el-table-column>
                    <el-table-column
                            prop="thyy"
                            label="退货原因">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="240">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="chakanjiaoyi(scope.row)">查看</el-button>
                            <el-button size="mini" @click="editjiaoyi(scope.row)">编辑</el-button>
                            <el-button size="mini" @click="deletejiaoyi(scope.row)">删除</el-button>
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
        <!--添加交易-->
        <el-dialog title="添加交易" :visible.sync="addjiaoyis">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="日期" prop="rq">
                            <el-input type="text" v-model="ruleForm.rq" autocomplete="off" disabled size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="用户名" prop="yhm">
                            <el-input type="text" v-model="ruleForm.yhm" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="订单号" prop="ddh">
                            <el-input type="text" v-model="ruleForm.ddh" autocomplete="off" size="small"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item label="商品名" prop="spm">
                            <el-input v-model.number="ruleForm.spm" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="数量" prop="sl">
                            <el-input v-model="ruleForm.sl" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="退货原因" prop="thyy">
                            <el-input v-model="ruleForm.thyy" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="tianjiabtn">
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--查看交易-->
        <el-dialog title="查看交易" :visible.sync="chakanjiaoyis">
            <el-form :model="chakanruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="日期" prop="rq">
                            <el-input type="text" v-model="chakanruleForm.rq" autocomplete="off" disabled size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="用户名" prop="yhm">
                            <el-input type="text" v-model="chakanruleForm.yhm" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="订单号" prop="ddh">
                            <el-input type="text" v-model="chakanruleForm.ddh" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item label="商品名" prop="spm">
                            <el-input v-model.number="chakanruleForm.spm" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="数量" prop="sl">
                            <el-input v-model="chakanruleForm.sl" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="退货原因" prop="thyy">
                            <el-input v-model="chakanruleForm.thyy" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="chakanbtn">
                    <el-button type="primary" @click="chakanjiaoyiss">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--编辑交易-->
        <el-dialog title="编辑交易" :visible.sync="editjiaoyis">
            <el-form :model="editruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="日期" prop="rq">
                            <el-input type="text" v-model="editruleForm.rq" autocomplete="off" disabled size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="用户名" prop="yhm">
                            <el-input type="text" v-model="editruleForm.yhm" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="订单号" prop="ddh">
                            <el-input type="text" v-model="editruleForm.ddh" autocomplete="off" size="small"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item label="商品名" prop="spm">
                            <el-input v-model.number="editruleForm.spm" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="数量" prop="sl">
                            <el-input v-model="editruleForm.sl" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="退货原因" prop="thyy">
                            <el-input v-model="editruleForm.thyy" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="chakanbtn">
                    <el-button type="primary" @click="editjiaoyiss">确定</el-button>
                    <el-button  @click="editjiaoyis = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "jytk",
        data(){
            return{
                select:"",
                input:'',
                tableData: [
                    {
                        rq:"2019-05-02",
                        yhm:"王小虎",
                        ddh:"123",
                        spm:"123",
                        sl:"123",
                        thyy:"不想买了",
                    },
                    {
                        rq:"2019-05-02",
                        yhm:"王小虎",
                        ddh:"123",
                        spm:"123",
                        sl:"123",
                        thyy:"不想买了",
                    },
                    {
                        rq:"2019-05-02",
                        yhm:"王小虎",
                        ddh:"123",
                        spm:"123",
                        sl:"123",
                        thyy:"不想买了",
                    }
                ],
                addjiaoyis:false,
                chakanjiaoyis:false,
                editjiaoyis:false,
                ruleForm: {
                    rq:"",
                    yhm:"",
                    ddh:"",
                    spm:"",
                    sl:"",
                    thyy:"",
                },
                chakanruleForm: {
                    rq:"",
                    yhm:"",
                    ddh:"",
                    spm:"",
                    sl:"",
                    thyy:"",
                },
                editruleForm: {
                    rq:"",
                    yhm:"",
                    ddh:"",
                    spm:"",
                    sl:"",
                    thyy:"",
                },
                rules: {
                    yhm: [
                        { required:true, message:"请输入用户名名称", trigger: 'blur' }
                    ],
                    ddh: [
                        { required:true, message:"请输入订单号", trigger: 'blur' }
                    ],
                    spm: [
                        { required:true, message:"请输入商品名", trigger: 'blur' }
                    ],
                    sl: [
                        { required:true, message:"请输入数量", trigger: 'blur' }
                    ],
                    thyy: [
                        { required:true, message:"请输入退货原因", trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            chakanjiaoyi(row){
                this.chakanjiaoyis=true;
                this.chakanruleForm=row;
            },
            addjiaoyi(){
                this.ruleForm={
                    yhm: '',
                    ddh: '',
                    spm: '',
                    sl: '',
                    thyy: '',
                };
                this.ruleForm.id=this.tableData.length;
                this.ruleForm.zcrq=new Date().getTime();
                this.addjiaoyis=true;
            },
            //提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.tableData.push(this.ruleForm);

                        this.addjiaoyis=false;
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
            chakanjiaoyiss(){
                this.chakanjiaoyis=false;
            },
            deletejiaoyi(row){
                this.tableData.splice(this.tableData.indexOf(row),1);
            },

            editjiaoyi(row){
                this.editjiaoyis=true;
                this.editruleForm=row;
            },
            editjiaoyiss(){
                this.editjiaoyis=false;
            },
        }
    }
</script>

<style scoped>
    .jytk .ddlb-header{
        width: 100%;
        height: 40px;
        /*background: red;*/
    }
    .jytk .fenye{
        margin-top:10px;
    }
    .jytk .ddlb-header .btn{
        float: left;
    }
    .jytk .ddlb-center{
        width: 100%;
        height: 50px;
        /*background: green;*/
        margin-top:10px;
    }
    .jytk .ddlb-right{
        width: 30%;
        float: right;
    }
    .jytk .tianjia .el-input{
        width: 70%;
    }
</style>
<style>
    .jytk .el-form-item__label{
        margin-top:10px;
    }
    .jytk .tianjia .el-form-item__error{
        margin-left:70px;
    }
    .jytk .tianjiabtn{
        text-align: right;
        margin-right:100px;
    }
    .jytk .chakanbtn{
        text-align: right;
        margin-right:100px;
    }
</style>
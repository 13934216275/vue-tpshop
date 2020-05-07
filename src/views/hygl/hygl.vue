<template>
    <div class="hygl">
        <el-card class="box-card">
            <div class="ddlb-header">
                <el-button size="small" type="primary" class="btn" @click="addhuiyuan">添加</el-button>
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
                            prop="id"
                            label="ID">
                    </el-table-column>
                    <el-table-column
                            prop="hymc"
                            label="会员名称">
                    </el-table-column>
                    <el-table-column
                            prop="yjdz"
                            label="邮件地址">
                    </el-table-column>
                    <el-table-column
                            prop="sjh"
                            label="手机号码">
                    </el-table-column>
                    <el-table-column
                            prop="kyzj"
                            label="可用资金">
                        <template slot-scope="scope">
                            <p>{{scope.row.kyzj | currency}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="jf"
                            label="积分">
                    </el-table-column>
                    <el-table-column
                            prop="hydj"
                            label="会员等级">
                    </el-table-column>
                    <el-table-column
                            prop="zcrq"
                            label="注册日期">
                        <template slot-scope="scope">
                            <p>{{scope.row.zcrq | date}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="240">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="chakanhuiyuan(scope.row)">查看</el-button>
                            <el-button size="mini" @click="edithuiyuan(scope.row)">编辑</el-button>
                            <el-button size="mini" @click="deletehuiyuan(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-card>
        <!--添加会员-->
        <el-dialog title="添加会员" :visible.sync="addhuiyuans">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="ID" prop="id">
                            <el-input type="text" v-model="ruleForm.id" autocomplete="off" disabled size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="会员名称" prop="hymc">
                            <el-input type="text" v-model="ruleForm.hymc" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="邮件地址" prop="yjdz">
                            <el-input type="text" v-model="ruleForm.yjdz" autocomplete="off" size="small"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item label="手机号" prop="sjh">
                            <el-input v-model.number="ruleForm.sjh" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="可用资金" prop="kyzj">
                            <el-input v-model="ruleForm.kyzj" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="积分" prop="jf">
                            <el-input v-model="ruleForm.jf" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="会员等级" prop="hydj">
                            <el-input v-model="ruleForm.hydj" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="注册日期" prop="zcrq">
                            <el-input v-model="ruleForm.zcrq" disabled size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="tianjiabtn">
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--查看会员-->
        <el-dialog title="查看会员" :visible.sync="chakanhuiyuans">
            <el-form :model="chakanruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="ID" prop="id">
                            <el-input type="text" v-model="chakanruleForm.id" autocomplete="off" disabled size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="会员名称" prop="hymc">
                            <el-input type="text" v-model="chakanruleForm.hymc" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="邮件地址" prop="yjdz">
                            <el-input type="text" v-model="chakanruleForm.yjdz" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item label="手机号" prop="sjh">
                            <el-input v-model.number="chakanruleForm.sjh" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="可用资金" prop="kyzj">
                            <el-input v-model="chakanruleForm.kyzj" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="积分" prop="jf">
                            <el-input v-model="chakanruleForm.jf" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="会员等级" prop="hydj">
                            <el-input v-model="chakanruleForm.hydj" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="注册日期" prop="zcrq">
                            <el-input v-model="chakanruleForm.zcrq" disabled size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="chakanbtn">
                    <el-button type="primary" @click="chakanhuiyuanss">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--编辑会员-->
        <el-dialog title="编辑会员" :visible.sync="edithuiyuans">
            <el-form :model="editruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="ID" prop="id">
                            <el-input type="text" v-model="editruleForm.id" autocomplete="off" disabled size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="会员名称" prop="hymc">
                            <el-input type="text" v-model="editruleForm.hymc" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="邮件地址" prop="yjdz">
                            <el-input type="text" v-model="editruleForm.yjdz" autocomplete="off" size="small"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item label="手机号" prop="sjh">
                            <el-input v-model.number="editruleForm.sjh" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="可用资金" prop="kyzj">
                            <el-input v-model="editruleForm.kyzj" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="积分" prop="jf">
                            <el-input v-model="editruleForm.jf" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="会员等级" prop="hydj">
                            <el-input v-model="editruleForm.hydj" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="注册日期" prop="zcrq">
                            <el-input v-model="editruleForm.zcrq" disabled size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="chakanbtn">
                    <el-button type="primary" @click="edithuiyuanss">确定</el-button>
                    <el-button  @click="edithuiyuans = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "hygl",
        data(){
            return{
                select:"",
                input:'',
                addhuiyuans:false,
                chakanhuiyuans:false,
                edithuiyuans:false,
                tableData: [
                    {
                        id:"0",
                        hymc:"vicor",
                        yjdz:"vicor123@163.com",
                        sjh:"111-1111-1111",
                        kyzj:"7355",
                        jf:"298",
                        hydj:"白金会员",
                        zcrq:"Sun Jul 07 2019 17:22:04 GMT+0800 (中国标准时间)"
                    }
                ],
                ruleForm: {
                    id:"",
                    hymc: '',
                    yjdz: '',
                    sjh: '',
                    kyzj: '',
                    jf: '',
                    hydj: '',
                    zcrq: '',
                },
                chakanruleForm: {
                    id:"",
                    hymc: '',
                    yjdz: '',
                    sjh: '',
                    kyzj: '',
                    jf: '',
                    hydj: '',
                    zcrq: '',
                },
                editruleForm: {
                    id:"",
                    hymc: '',
                    yjdz: '',
                    sjh: '',
                    kyzj: '',
                    jf: '',
                    hydj: '',
                    zcrq: '',
                },
                rules: {
                    hymc: [
                        { required:true, message:"请输入会员名称", trigger: 'blur' }
                    ],
                    yjdz: [
                        { required:true, message:"请输入邮件地址", trigger: 'blur' }
                    ],
                    sjh: [
                        { required:true, message:"请输入手机号", trigger: 'blur' }
                    ],
                    kyzj: [
                        { required:true, message:"请输入可用资金", trigger: 'blur' }
                    ],
                    jf: [
                        { required:true, message:"请输入积分", trigger: 'blur' }
                    ],
                    hydj: [
                        { required:true, message:"请输入会员等级", trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            //查看会员获取数据
            chakanhuiyuan(row){
                console.log(row.zcrq,row.kyzj);
                this.chakanhuiyuans=true;
                this.chakanruleForm=row;

            },
            //修改会员
            edithuiyuan(row){
                this.edithuiyuans=true;
                this.editruleForm=row;
            },
            edithuiyuanss(){
                this.edithuiyuans=false;
            },
            // 添加会员
            addhuiyuan(){
                this.ruleForm={
                    hymc: '',
                    yjdz: '',
                    sjh: '',
                    kyzj: '',
                    jf: '',
                    hydj: '',
                };
                this.ruleForm.id=this.tableData.length;
                this.ruleForm.zcrq=new Date().getTime();
                this.addhuiyuans=true;
            },
            //提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.tableData.push(this.ruleForm);

                        this.addhuiyuans=false;
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
            // 查看会员
            chakanhuiyuanss(){
                this.chakanhuiyuans=false;
            },
            //删除会员
            deletehuiyuan(row){
                this.tableData.splice(this.tableData.indexOf(row),1);
            }
        },

    }
</script>

<style scoped>
    .hygl .ddlb-header{
        width: 100%;
        height: 40px;
        /*background: red;*/
    }
    .hygl .ddlb-header .btn{
        float: left;
    }
    .hygl .ddlb-center{
        width: 100%;
        height: 50px;
        /*background: green;*/
        margin-top:10px;
    }
    .hygl .ddlb-right{
        width: 30%;
        float: right;
    }
    .hygl .tianjia .el-input{
        width: 70%;
    }
    .hygl .el-col-10{
        margin-left:10px;
    }
</style>
<style>
    .hygl .el-form-item__label{
        margin-top:10px;
    }
    .hygl .tianjia .el-form-item__error{
        margin-left:70px;
    }
    .hygl .tianjiabtn{
        text-align: right;
        margin-right:100px;
    }
    .hygl .chakanbtn{
        text-align: right;
        margin-right:100px;
    }
</style>
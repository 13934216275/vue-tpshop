<template>
    <div class="fhdz">
        <el-card class="box-card">
            <div class="ddlb-header">
                <el-input placeholder="请输入内容" v-model="input" class="ztlb-search" size="medium ">
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
                            prop="ddh"
                            label="订单号">
                    </el-table-column>
                    <el-table-column
                            prop="fhdz"
                            label="发货地址">
                    </el-table-column>
                    <el-table-column
                            prop="sp"
                            label="商品">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="240">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="chakanfahuo(scope.row)">查看</el-button>
                            <el-button size="mini" @click="editfahuo(scope.row)">编辑</el-button>
                            <el-button size="mini" @click="deletefahuo(scope.row)">删除</el-button>
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
        <!--查看发货-->
        <el-dialog title="查看发货" :visible.sync="chakanfahuos">
            <el-form :model="chakanruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="日期" prop="rq">
                            <el-input type="text" v-model="chakanruleForm.rq" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="订单号" prop="ddh">
                            <el-input type="text" v-model="chakanruleForm.ddh" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="发货地址" prop="fhdz">
                            <el-input v-model="chakanruleForm.fhdz" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="商品" prop="sp">
                            <el-input v-model.number="chakanruleForm.sp" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="chakanbtn">
                    <el-button type="primary" @click="chakanfahuoss">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--编辑发货-->
        <el-dialog title="编辑发货" :visible.sync="editfahuos">
            <el-form :model="editruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="日期" prop="rq">
                            <el-input type="text" v-model="editruleForm.rq" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="订单号" prop="ddh">
                            <el-input type="text" v-model="editruleForm.ddh" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="发货地址" prop="fhdz">
                            <el-input v-model="editruleForm.fhdz" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="商品" prop="sp">
                            <el-input v-model.number="editruleForm.sp" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="chakanbtn">
                    <el-button type="primary" @click="editfahuoss">确定</el-button>
                    <el-button  @click="editfahuosss">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "fhdz",
        data(){
            return{
                select:"",
                input:'',
                addkdgs:false,
                ruleForm:{
                    kdgsmcs:"",
                },
                tableData: [
                    {
                        rq:"2019-05-02",
                        ddh:"20190526",
                        fhdz:"小店区",
                        sp:"123",
                    }
                ],
                chakanfahuos:false,
                editfahuos:false,
                chakanruleForm: {
                    rq:"",
                    ddh:"",
                    fhdz:"",
                    sp:"",
                },
                editruleForm: {
                    rq:"",
                    ddh:"",
                    fhdz:"",
                    sp:"",
                },
                rules: {
                    rq: [
                        { required:true, message:"请输入日期", trigger: 'blur' }
                    ],
                    ddh: [
                        { required:true, message:"请输入订单号", trigger: 'blur' }
                    ],
                    fhdz: [
                        { required:true, message:"请输入发货地址", trigger: 'blur' }
                    ],
                    sp: [
                        { required:true, message:"请输入商品", trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            chakanfahuo(row){
                this.chakanfahuos=true;
                this.chakanruleForm=row;
            },
            //查看
            chakanfahuoss(){
                this.chakanfahuos=false;
            },
            deletefahuo(row){
                this.tableData.splice(this.tableData.indexOf(row),1);
            },

            editfahuo(row){
                this.editfahuos=true;
                this.editruleForm=row;
            },
            editfahuoss(){
                this.editfahuos=false;
            },
            editfahuosss(){
                this.editfahuos=false;
            }
        }
    }
</script>

<style scoped>
    .fhdz .ddlb-header{
        width: 100%;
        height: 40px;
        /*background: red;*/
    }
    .fhdz .fenye{
        margin-top:10px;
    }
    .fhdz .ztlb-search{
        width: 30%;
    }
    .fhdz .tianjia .el-input{
        width: 70%;
    }
</style>
<style>
    .fhdz .el-form-item__label{
        margin-top:10px;
    }
    .fhdz .tianjia .el-form-item__error{
        margin-left:70px;
    }
    .fhdz .chakanbtn{
        text-align: right;
        margin-right:100px;
    }
</style>
<template>
    <div class="ztlb">
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
                            prop="mc"
                            label="名称">
                    </el-table-column>
                    <el-table-column
                            prop="qy"
                            label="区域">
                    </el-table-column>
                    <el-table-column
                            prop="ddh"
                            label="订单号">
                    </el-table-column>
                    <el-table-column
                            prop="lxfs"
                            label="联系方式">
                    </el-table-column>
                    <el-table-column
                            prop="qhdz"
                            label="取货地址">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="240">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="chakanziti(scope.row)">查看</el-button>
                            <el-button size="mini" @click="editziti(scope.row)">编辑</el-button>
                            <el-button size="mini" @click="deleteziti(scope.row)">删除</el-button>
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
        <!--查看自提-->
        <el-dialog title="查看自提" :visible.sync="chakanzitis">
            <el-form :model="chakanruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="名称" prop="mc">
                            <el-input type="text" v-model="chakanruleForm.mc" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="区域" prop="qy">
                            <el-input type="text" v-model="chakanruleForm.qy" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="订单号" prop="ddh">
                            <el-input type="text" v-model="chakanruleForm.ddh" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item label="联系方式" prop="lxfs">
                            <el-input v-model.number="chakanruleForm.lxfs" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="取货方式" prop="qhfs">
                            <el-input v-model="chakanruleForm.qhfs" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="chakanbtn">
                    <el-button type="primary" @click="chakanzitiss">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--编辑自提-->
        <el-dialog title="编辑自提" :visible.sync="editzitis">
            <el-form :model="editruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="名称" prop="mc">
                            <el-input type="text" v-model="editruleForm.mc" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="区域" prop="qy">
                            <el-input type="text" v-model="editruleForm.qy" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="订单号" prop="ddh">
                            <el-input type="text" v-model="editruleForm.ddh" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="联系方式" prop="lxfs">
                            <el-input v-model.number="editruleForm.lxfs" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="取货方式" prop="qhfs">
                            <el-input v-model="editruleForm.qhfs" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="chakanbtn">
                    <el-button type="primary" @click="editzitiss">确定</el-button>
                    <el-button  @click="editzitisss">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ztlb",
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
                        mc:"vicor",
                        qy:"小店区",
                        ddh:"20190526",
                        lxfs:"111-1111-1111",
                        qhdz:"123"
                    },
                    {
                        mc:"vicor",
                        qy:"小店区",
                        ddh:"20190526",
                        lxfs:"111-1111-1111",
                        qhdz:"123"
                    }
                ],
                chakanzitis:false,
                editzitis:false,
                chakanruleForm: {
                    mc:"",
                    qy:"",
                    ddh:"",
                    lxfs:"",
                    qhfs:"",
                },
                editruleForm: {
                    mc:"",
                    qy:"",
                    ddh:"",
                    lxfs:"",
                    qhfs:"",
                },
                rules: {
                    mc: [
                        { required:true, message:"请输入名称", trigger: 'blur' }
                    ],
                    qy: [
                        { required:true, message:"请输入区域", trigger: 'blur' }
                    ],
                    ddh: [
                        { required:true, message:"请输入订单号", trigger: 'blur' }
                    ],
                    lxfs: [
                        { required:true, message:"请输入联系方式", trigger: 'blur' }
                    ],
                    qhdz: [
                        { required:true, message:"请输入取货地址", trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            chakanziti(row){
                this.chakanzitis=true;
                this.chakanruleForm=row;
            },
            //查看
            chakanzitiss(){
                this.chakanzitis=false;
            },
            deleteziti(row){
                this.tableData.splice(this.tableData.indexOf(row),1);
            },

            editziti(row){
                this.editzitis=true;
                this.editruleForm=row;
            },
            editzitiss(){
                this.editzitis=false;
            },
            editzitisss(){
                this.editzitis=false;
            }
        }
    }
</script>

<style scoped>
    .ztlb .ddlb-header{
        width: 100%;
        height: 40px;
        /*background: red;*/
    }
    .ztlb .fenye{
        margin-top:10px;
    }
    .ztlb .ztlb-search{
        width: 30%;
    }
    .ztlb .tianjia .el-input{
        width: 70%;
    }
</style>
<style>
    .ztlb .el-form-item__label{
        margin-top:10px;
    }
    .ztlb .tianjia .el-form-item__error{
        margin-left:70px;
    }
    .ztlb .chakanbtn{
        text-align: right;
        margin-right:100px;
    }
</style>
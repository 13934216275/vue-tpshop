<template>
    <div class="wlps">
        <el-card class="box-card">
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
                            prop="psfs"
                            label="配送方式">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="240">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="chakanpeisong(scope.row)">查看</el-button>
                            <el-button size="mini" @click="editpeisong(scope.row)">编辑</el-button>
                            <el-button size="mini" @click="deletepeisong(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-card>
        <!--查看配送-->
        <el-dialog title="查看配送" :visible.sync="chakanpeisongs">
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
                        <el-form-item label="配送方式" prop="psfs">
                            <el-input v-model="chakanruleForm.psfs" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="chakanbtn">
                    <el-button type="primary" @click="chakanpeisongss">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--编辑配送-->
        <el-dialog title="编辑配送" :visible.sync="editpeisongs">
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
                        <el-form-item label="配送方式" prop="psfs">
                            <el-input v-model="editruleForm.psfs" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="chakanbtn">
                    <el-button type="primary" @click="editpeisongss">确定</el-button>
                    <el-button  @click="editpeisongsss">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "wlps",
        data(){
            return{
                outerVisible:false,
                tableData: [
                    {
                        mc:"vicor",
                        qy:"小店区",
                        ddh:"20190526",
                        lxfs:"111-1111-1111",
                        psfs:"快递",
                    },
                    {
                        mc:"vicor",
                        qy:"小店区",
                        ddh:"20190526",
                        lxfs:"111-1111-1111",
                        psfs:"货到付款",
                    }
                ],
                chakanpeisongs:false,
                editpeisongs:false,
                chakanruleForm: {
                    mc:"",
                    qy:"",
                    ddh:"",
                    lxfs:"",
                    psfs:"",
                },
                editruleForm: {
                    mc:"",
                    qy:"",
                    ddh:"",
                    lxfs:"",
                    psfs:"",
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
                    psfs: [
                        { required:true, message:"请输入配送方式", trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            chakanpeisong(row){
                this.chakanpeisongs=true;
                this.chakanruleForm=row;
            },
            //查看
            chakanpeisongss(){
                this.chakanpeisongs=false;
            },
            deletepeisong(row){
                this.tableData.splice(this.tableData.indexOf(row),1);
            },

            editpeisong(row){
                this.editpeisongs=true;
                this.editruleForm=row;
            },
            editpeisongss(){
                this.editpeisongs=false;
            },
            editpeisongsss(){
                this.editpeisongs=false;
            }
        }
    }
</script>

<style scoped>

    .wlps .dialog-first,.dialog-second{
        width: 60%;

    }
    .wlps .updatedialog .btn{
        text-align: right;
        margin-right: 120px;
    }
    .wlps .tianjia .el-input{
        width: 70%;
    }
</style>
<style>
    .wlps .updatedialog .el-form-item__label{
        line-height: 40px;
        margin-top:15px !important;
    }
    .wlps .el-form-item__error{
        margin-left:70px !important;
    }
    .wlps .el-form-item__label{
        margin-top:10px;
    }
    .wlps .tianjia .el-form-item__error{
        margin-left:70px;
    }
    .wlps .chakanbtn{
        text-align: right;
        margin-right:100px;
    }
</style>
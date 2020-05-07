<template>
    <div class="kdgs">
        <el-card class="box-card">
            <div class="ddlb-header">
                <el-button size="small" type="primary" class="btn" @click="addkdgs = true">添加</el-button>
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
                            prop="wlmc"
                            label="物流名称">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="240">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="chakankuaidi(scope.row)">查看</el-button>
                            <el-button size="mini" @click="editkuaidi(scope.row)">编辑</el-button>
                            <el-button size="mini" @click="deletekuaidi(scope.row)">删除</el-button>
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
        <!--添加-->
        <el-dialog title="快递信息" :visible.sync="addkdgs" class="addkuaidi" width="24%">
            <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="快递公司名称" prop="kdgsmcs">
                    <el-select v-model="ruleForm.kdgsmcs" placeholder="请选择快递公司名称" size="small">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addkdgs = false" class="btns">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--查看配送-->
        <el-dialog title="查看快递公司" :visible.sync="chakankuaidis" class="chakana" width="30%">
            <el-form :model="chakanruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm tianjia">
                <el-form-item label="物流名称" prop="wlmc">
                    <el-input type="text" v-model="chakanruleForm.wlmc" autocomplete="off" size="small" readonly></el-input>
                </el-form-item>
                <el-form-item class="chakanbtn">
                    <el-button type="primary" @click="chakankuaidiss">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--编辑配送-->
        <el-dialog title="编辑快递公司" :visible.sync="editkuaidis" width="30%">
            <el-form :model="editruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm tianjia">
                <el-form-item label="物流名称" prop="wlmc">
                    <el-input type="text" v-model="editruleForm.wlmc" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item class="chakanbtn">
                    <el-button type="primary" @click="editkuaidiss">确定</el-button>
                    <el-button  @click="editkuaidisss">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "kdgs",
        data(){
            return{
                select:"",
                input:'',
                addkdgs:false,
                chakankuaidis:false,
                editkuaidis:false,
                ruleForm:{
                    kdgsmcs:"",
                },
                tableData: [
                    {
                        wlmc:"邮政特快专递"
                    },
                    {
                        wlmc:"天天快递"
                    },
                    {
                        wlmc:"申通快递"
                    },
                    {
                        wlmc:"圆通快递"
                    },
                    {
                        wlmc:"顺丰速运"
                    }
                ],
                chakanruleForm: {
                    wlmc:"",
                },
                editruleForm: {
                    wlmc:"",
                },
            }
        },
        methods:{
            chakankuaidiss(){
                this.chakankuaidis=false;
            },
            chakankuaidi(row){
                this.chakankuaidis=true;
                this.chakanruleForm=row;
            },
            editkuaidi(row){
                this.editkuaidis=true;
                this.editruleForm=row;
            },
            editkuaidiss(){
                this.editkuaidis=false;
            },
            editkuaidisss(){
                this.editkuaidis=false;
            },
            deletekuaidi(row){
                this.tableData.splice(this.tableData.indexOf(row),1);
            },

        }
    }
</script>

<style scoped>
    .kdgs .ddlb-header{
        width: 100%;
        height: 40px;
        /*background: red;*/
    }
    .kdgs .fenye{
        margin-top:10px;
    }
    .kdgs .ddlb-header .btn{
        float: left;
    }
    .kdgs .ddlb-center{
        width: 100%;
        height: 50px;
        /*background: green;*/
        margin-top:10px;
    }
    .kdgs .ddlb-right{
        width: 30%;
        float: right;
    }
    .kdgs .tianjia .el-input{
        width: 60%;
    }
</style>
<style>
    .kdgs .addkuaidi .el-form-item__label{
        width: 150px !important;
        margin-top:10px;
    }
    .kdgs .addkuaidi .btns{
        float: right;
        margin-right:80px;
    }
    .kdgs .el-form-item__label{
        margin-top:10px;
    }
    .kdgs .chakanbtn{
        text-align: right;
        margin-right:100px;
    }
</style>
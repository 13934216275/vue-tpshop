<template>
    <div class="tkmx">
        <el-card class="box-card">
            <div class="tkmx-header">
                <el-input placeholder="请输入内容" v-model="input" class="tkmx-right" size="medium ">
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
                            fixed="left"
                            prop="ljerpbh"
                            label="料件ERP编号">
                    </el-table-column>
                    <el-table-column
                            prop="xh"
                            label="型号">
                    </el-table-column>
                    <el-table-column
                            prop="ck"
                            label="仓库">
                    </el-table-column>
                    <el-table-column
                            prop="kw"
                            label="库位">
                    </el-table-column>
                    <el-table-column
                            prop="dw"
                            label="单位">
                    </el-table-column>
                    <el-table-column
                            prop="kcl"
                            label="库存量">
                    </el-table-column>
                    <el-table-column
                            prop="blxx"
                            label="不良现象">
                    </el-table-column>
                    <el-table-column
                            prop="pdjg"
                            label="判定结果">
                    </el-table-column>
                    <el-table-column
                            prop="pdrq"
                            label="判定日期">
                    </el-table-column>
                    <el-table-column
                            prop="pzpdr"
                            label="品质判定人">
                    </el-table-column>
                    <el-table-column
                            prop="zrgs"
                            label="责任归属">
                    </el-table-column>
                    <el-table-column
                            prop="clfs"
                            label="处理方式">
                    </el-table-column>
                    <el-table-column
                            prop="jarq"
                            label="结案日期">
                    </el-table-column>
                    <el-table-column
                            prop="yqrq"
                            label="逾期日期">
                    </el-table-column>
                    <el-table-column
                            prop="bz"
                            label="备注">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="chakanjiaoyi(scope.row)">查看</el-button>
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
        <el-dialog title="查看退库" :visible.sync="chakanjiaoyis">
            <el-form :model="chakanruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm tianjia">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="料件ERP编号" prop="ljerpbh">
                            <el-input type="text" v-model="chakanruleForm.ljerpbh" autocomplete="off" disabled size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="型号" prop="xh">
                            <el-input type="text" v-model="chakanruleForm.xh" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="仓库" prop="ck">
                            <el-input type="text" v-model="chakanruleForm.ck" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item label="单位" prop="dw">
                            <el-input v-model.number="chakanruleForm.dw" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="库存量" prop="kcl">
                            <el-input v-model="chakanruleForm.kcl" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="不良现象" prop="blxx">
                            <el-input v-model="chakanruleForm.blxx" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="判定结果" prop="pdjg">
                            <el-input v-model="chakanruleForm.pdjg" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="判定日期" prop="pdrq">
                            <el-input v-model="chakanruleForm.pdrq" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="品质判定人" prop="pzpdr">
                            <el-input v-model="chakanruleForm.pzpdr" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="责任归属" prop="zrgs">
                            <el-input v-model="chakanruleForm.zrgs" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="处理方式" prop="clfs">
                            <el-input v-model="chakanruleForm.clfs" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="结案日期" prop="jarq">
                            <el-input v-model="chakanruleForm.jarq" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="逾期日期" prop="yqrq">
                            <el-input v-model="chakanruleForm.yqrq" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="chakanbtn">
                    <el-button type="primary" @click="chakanjiaoyiss">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "tkmx",
        data(){
            return{
                input:"",
                chakanjiaoyis:false,
                tableData:[
                    {
                        ljerpbh:"123",
                        xh:"23",
                        ck:"uek",
                        kw:"牛",
                        dw:"kg",
                        kcl:"99999",
                        blxx:"无",
                        pdjg:"正常",
                        pdrq:"2019-07-05",
                        pzpdr:"张三",
                        zrgs:"小店区",
                        clfs:"222",
                        jarq:"2019-07-05",
                        yqrq:"2019-07-05",
                        bz:"无"
                    }
                ],
                chakanruleForm: {
                    ljerpbh:"",
                    xh:"",
                    ck:"",
                    kw:"",
                    dw:"",
                    kcl:"",
                    blxx:"",
                    pdjg:"",
                    pdrq:"",
                    pzpdr:"",
                    zrgs:"",
                    clfs:"",
                    jarq:"",
                    yqrq:"",
                    bz:""
                },
            }
        },
        methods:{
            chakanjiaoyi(row){
                this.chakanjiaoyis=true;
                this.chakanruleForm=row;
            },
            chakanjiaoyiss(){
                this.chakanjiaoyis=false;
            },
        }
    }
</script>

<style scoped>
    .tkmx .tkmx-header{
        width: 100%;
    }
    .tkmx .tkmx-right{
        width:30%;
        float: right;
        margin-bottom:20px;
    }
    .tkmx .fenye{
        margin-top:20px;
    }
    .tianjia .el-input{
        width: 70%;
    }
</style>
<style>
    .el-form-item__label{
        margin-top:10px;
    }
    .tianjia .el-form-item__error{
        margin-left:70px;
    }
    .chakanbtn{
        text-align: right;
        margin-right:100px;
    }
</style>
<template>
    <div class="tklb">
        <el-card class="box-card">
            <div class="ddlb-header">
                <el-button size="small">待退款</el-button>
                <el-button size="small">已退款</el-button>
            </div>
            <div class="ddlb-center">
                <el-date-picker
                        class=""
                        v-model="value1"
                        type="monthrange"
                        size="small"
                        range-separator="至"
                        start-placeholder="开始月份"
                        end-placeholder="结束月份">
                </el-date-picker>
                <el-button type="primary" size="medium ">筛选</el-button>
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
                        class="hhlb-table"
                        style="width: 100%">
                    <el-table-column
                            prop="tkbh"
                            label="退款编号">
                    </el-table-column>
                    <el-table-column
                            prop="spm"
                            label="商品名">
                    </el-table-column>
                    <el-table-column
                            prop="sqsj"
                            label="申请时间">
                    </el-table-column>
                    <el-table-column
                            prop="gmzxx"
                            label="购买者信息">
                    </el-table-column>
                    <el-table-column
                            prop="zje"
                            label="总金额">
                    </el-table-column>
                    <el-table-column
                            prop="tkje"
                            label="退款金额">
                    </el-table-column>
                    <el-table-column
                            prop="clzt"
                            label="处理状态">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="chakan(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-card>
        <el-dialog title="查看售后列表" :visible.sync="chakans">
            <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item label="退款编号" prop="tkbh">
                            <el-input type="text" v-model="ruleForm.tkbh" autocomplete="off" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="商品名" prop="spm">
                            <el-input type="text" v-model="ruleForm.spm" autocomplete="off" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="申请时间" prop="sqsj">
                            <el-input type="text" v-model="ruleForm.sqsj" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="购买者信息" prop="gmzxx">
                            <el-input type="text" v-model="ruleForm.gmzxx" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="总金额" prop="zje">
                            <el-input type="text" v-model="ruleForm.zje" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="退款金额" prop="tkje">
                            <el-input type="text" v-model="ruleForm.tkje" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="处理状态" prop="clzt">
                            <el-input type="text" v-model="ruleForm.clzt" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="chakans = false">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "tklb",
        data(){
            return{
                value1:"",
                input:"",
                chakans:false,
                tableData: [
                    {
                        tkbh:"1234",
                        spm:"椅子",
                        sqsj:"2019-07-02",
                        gmzxx:"张三",
                        zje:"￥123",
                        tkje:"￥123",
                        clzt:"待退款",
                    }
                ],
                ruleForm: {
                    tkbh:"",
                    spm:"",
                    sqsj:"",
                    gmzxx:"",
                    zje:"",
                    tkje:"",
                    clzt:"",
                },
            }
        },
        methods:{
            chakan(row){
                this.chakans=true;
                this.ruleForm=row;
            },
        }
    }
</script>

<style scoped>
    .tklb .ddlb-header{
        width: 100%;
        height: 30px;
    }
    .tklb .ddlb-center{
        margin-top:10px;
    }
    .tklb .ddlb-right{
        width: 50%;
        float: right;
    }
    .tklb .hhlb-table{
        margin-top:10px;
    }
    .tklb .demo-ruleForm .el-input{
        width: 70%;
    }
</style>
<style>
    .tklb .el-form-item__label{
        margin-top:10px;
    }
</style>
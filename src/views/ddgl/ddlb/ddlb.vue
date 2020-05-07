<template>
    <div class="ddlb">
        <el-card class="box-card">
            <div class="ddlb-header">
                <el-button size="small">全部</el-button>
                <el-button size="small">待付款</el-button>
                <el-button size="small">待接单</el-button>
                <el-button size="small">待发货</el-button>
                <el-button size="small">待收货</el-button>
                <el-button size="small">已完成</el-button>
            </div>
            <div class="ddlb-center">
                <el-select v-model="select" placeholder="请选择活动区域" size="medium ">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
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
                        style="width: 100%">
                    <el-table-column
                            prop="ddbh"
                            label="订单编号">
                    </el-table-column>
                    <el-table-column
                            prop="spm"
                            label="商品名">
                    </el-table-column>
                    <el-table-column
                            prop="xdsj"
                            label="下单时间">
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
                            prop="yfje"
                            label="应付金额">
                    </el-table-column>
                    <el-table-column
                            prop="zt"
                            label="状态">
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
        <el-dialog title="查看订单列表" :visible.sync="chakans">
            <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item label="订单编号" prop="ddbh">
                            <el-input type="text" v-model="ruleForm.ddbh" autocomplete="off" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="商品名" prop="spm">
                            <el-input type="text" v-model="ruleForm.spm" autocomplete="off" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="下单时间" prop="xdsj">
                            <el-input type="text" v-model="ruleForm.xdsj" readonly></el-input>
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
                        <el-form-item label="应付金额" prop="yfje">
                            <el-input type="text" v-model="ruleForm.yfje" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="状态" prop="zt">
                            <el-input type="text" v-model="ruleForm.zt" readonly></el-input>
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
        name: "ddlb",
        data(){
            return{
                select:"",
                input:'',
                chakans:false,
                tableData: [
                    {
                        ddbh:"20190526",
                        spm:"顾家工艺沙发",
                        xdsj:"2019-05-26",
                        gmzxx:"vicor",
                        zje:"￥12315",
                        yfje:"￥9998",
                        zt:"待支付"
                    }, {
                        ddbh:"20190526",
                        spm:"顾家工艺沙发",
                        xdsj:"2019-05-26",
                        gmzxx:"vicor",
                        zje:"￥12315",
                        yfje:"￥9998",
                        zt:"待支付"
                    }, {
                        ddbh:"20190526",
                        spm:"顾家工艺沙发",
                        xdsj:"2019-05-26",
                        gmzxx:"vicor",
                        zje:"￥12315",
                        yfje:"￥9998",
                        zt:"待支付"
                    }
                ],
                ruleForm: {
                    ddbh: '',
                    spm: '',
                    xdsj: '',
                    gmzxx: '',
                    zje: '',
                    yfje: '',
                    zt: '',
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
    .ddlb .ddlb-header{
        width: 100%;
        height: 40px;
        /*background: red;*/
    }
    .ddlb .ddlb-center{
        width: 100%;
        height: 50px;
        /*background: green;*/
        margin-top:10px;
    }
    .ddlb .ddlb-right{
        width: 30%;
        float: right;
    }
    .ddlb .demo-ruleForm .el-input{
        width: 70%;
    }
    .ddlb .el-col.el-col-10 {
        margin-left: 10px;
    }
</style>
<style>
    .ddlb .el-form-item__label{
        margin-top:10px;
    }
</style>
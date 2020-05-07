<template>
    <div class="cwgl">
        <div class="cwgl-header">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>余额统计</span>
                </div>
                <div class="text item">
                    <template v-for="(v) in yeArr">
                        <yexf :title="v.title" :je="v.je"></yexf>
                    </template>
                </div>
            </el-card>
        </div>
        <div class="neirong">
            <el-card class="box-carda">
                <div slot="header" class="clearfixs">
                    <span>余额分布图</span>
                </div>
                <ve-histogram :data="chartData" :tooltip="{type:''}"></ve-histogram>
            </el-card>
            <el-card class="box-cardb">
                <div class="right-bottom-header">
                    <el-date-picker
                            v-model="value1"
                            type="daterange"
                            size="medium"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                    <el-button>筛选</el-button>
                </div>
                <div class="right-bottom-footer">
                    <template>
                        <el-table
                                class="cwgl-table"
                                :data="tableData"
                                style="width: 100%">
                            <el-table-column
                                    prop="bdsj"
                                    label="变动时间">
                            </el-table-column>
                            <el-table-column
                                    prop="hymc"
                                    label="会员名称">
                            </el-table-column>
                            <el-table-column
                                    prop="bdyy"
                                    label="变动原因">
                            </el-table-column>
                            <el-table-column
                                    prop="yebd"
                                    label="余额变动">
                            </el-table-column>
                            <el-table-column
                                    prop="djje"
                                    label="冻结金额">
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import yexf from "@/components/yexf/yexf.vue";
    export default {
        name: "cwgl",
        components:{
            yexf,
        }
        ,data(){
            return{
                yeArr:[
                    {
                        title:"会员消费",
                        je:"￥1323",
                    },
                    {
                        title:"会员消费",
                        je:"￥1323",
                    },
                    {
                        title:"会员消费",
                        je:"￥1323",
                    },
                    {
                        title:"会员消费",
                        je:"￥1323",
                    },
                    {
                        title:"会员消费",
                        je:"￥1323",
                    },
                    {
                        title:"会员消费",
                        je:"￥1323",
                    }
                ],
                chartData: {
                    columns: ['余额分布', '消费额'],
                    rows: [
                        { '余额分布': '消费', '消费额': 1393},
                        { '余额分布': '充值', '消费额': 3530},
                        { '余额分布': '退款', '消费额': 2923},
                        { '余额分布': '提现', '消费额': 1723},
                        { '余额分布': '冻结', '消费额': 3792}
                    ]
                },
                value1:"",
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                tableData:[
                    {
                        bdsj:"2019-07-05",
                        hymc:"vicor",
                        bdyy:"支付订单",
                        yebd:"-12110.00",
                        djje:"0.00"
                    },
                    {
                        bdsj:"2019-07-05",
                        hymc:"vicor",
                        bdyy:"支付订单",
                        yebd:"-12110.00",
                        djje:"0.00"
                    },
                    {
                        bdsj:"2019-07-05",
                        hymc:"vicor",
                        bdyy:"支付订单",
                        yebd:"-12110.00",
                        djje:"0.00"
                    },
                    {
                        bdsj:"2019-07-05",
                        hymc:"vicor",
                        bdyy:"支付订单",
                        yebd:"-12110.00",
                        djje:"0.00"
                    },
                    {
                        bdsj:"2019-07-05",
                        hymc:"vicor",
                        bdyy:"支付订单",
                        yebd:"-12110.00",
                        djje:"0.00"
                    },
                    {
                        bdsj:"2019-07-05",
                        hymc:"vicor",
                        bdyy:"支付订单",
                        yebd:"-12110.00",
                        djje:"0.00"
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .cwgl .neirong{
        width: 100%;
    }
    .cwgl .box-carda{
        width: 48%;
        margin-top:30px;
        float: left;
    }
    .cwgl .box-cardb{
        width: 48%;
        margin-top:30px;
        float: right;
    }
    .cwgl .cwgl-table{
        margin-top:30px;
    }
</style>
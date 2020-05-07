<template>
    <div class="pjgl">
        <el-card class="box-card">
            <div class="pjgl-header">
                <div class="block">
                    <el-date-picker
                            v-model="value1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            size="small">
                    </el-date-picker>
                    <el-button size="small">筛选</el-button>
                </div>
                <div style="margin-top: 15px;" class="search-first">
                    <el-input placeholder="请输入内容" v-model="input" size="small">
                        <el-button slot="append" icon="el-icon-search" class="search-firsts"></el-button>
                    </el-input>
                </div>
            </div>
            <div class="item-table">
                <template>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="id"
                                label="ID">
                        </el-table-column>
                        <el-table-column
                                prop="spmc"
                                label="商品名称">
                        </el-table-column>
                        <el-table-column
                                prop="spid"
                                label="商品ID">
                        </el-table-column>
                        <el-table-column
                                prop="username"
                                label="用户名">
                        </el-table-column>
                        <el-table-column
                                prop="plsj"
                                label="评论时间">
                        </el-table-column>
                        <el-table-column
                                prop="pf"
                                label="评分">
                        </el-table-column>
                        <el-table-column
                                prop="sfhf"
                                label="是否回复">
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="chakan(scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </el-card>
        <el-dialog title="评价管理" :visible.sync="chakans">
            <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="商品名称" prop="spmc">
                            <el-input type="text" v-model="ruleForm.spmc" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品ID" prop="spid">
                            <el-input type="text" v-model="ruleForm.spid" autocomplete="off" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="ruleForm.username" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="评论时间" prop="plsj">
                            <el-input v-model="ruleForm.plsj" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="评分" prop="pf">
                            <el-input v-model="ruleForm.pf" size="small" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否回复" prop="sfhf">
                            <el-input v-model="ruleForm.sfhf" size="small" readonly></el-input>
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
        name: "pjgl",
        data(){
            return{
                chakans: false,
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
                value1: '',
                value2: '',
                input:'',
                tableData:[
                    {
                        id:1,
                        spmc:"123",
                        spid:"2",
                        username:"admin",
                        plsj:"2019-07-05",
                        pf:"10",
                        sfhf:"否"
                    }
                ],
                ruleForm: {
                    spmc:"",
                    spid:"",
                    username:"",
                    plsj:"",
                    pf:"",
                    sfhf:"",
                },
            }
        },
        methods:{
            chakan(row){
                this.chakans=true;
                this.ruleForm=row;
            }
        }
    }
</script>

<style scoped>
    .pjgl .pjgl-header{
        width: 100%;
        height: 50px;
    }
    .block{
        float: left;
    }
    .pjgl .search-first{
        width: 30%;
        float: right;
        margin-top:0 !important;
    }
    .pjgl .el-input{
        width: 70%;
    }
</style>
<style>
    .pjgl .el-form-item__content{
        margin-top:0;
    }
</style>
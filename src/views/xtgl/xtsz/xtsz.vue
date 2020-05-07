<template>
    <div class="xtsz">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>系统设置</span>
            </div>
            <div class="text item">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="网站名称" prop="name">
                        <el-input v-model="ruleForm.name" class="wangzhan"></el-input>
                    </el-form-item>
                    <el-form-item label="语言选择" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="请选择语言">
                            <el-option label="中文" value="中文"></el-option>
                            <el-option label="英文" value="英文"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动时间" required>
                        <el-col :span="9">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 90%;margin-left:0"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col :span="9">
                            <el-form-item prop="date2">
                                <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;margin-left:0"></el-time-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="开启安全模式" prop="delivery">
                        <el-switch v-model="ruleForm.delivery"></el-switch>
                    </el-form-item>
                    <el-form-item label="网站风格" prop="resource">
                        <el-radio-group v-model="ruleForm.resource">
                            <el-radio label="绿色"></el-radio>
                            <el-radio label="红色"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="网站简介" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.desc" class="xingshi"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "xtsz",
        data(){
            return{
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入网站名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择语言', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择网站风格', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写网站简介', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .xtsz .box-card{
        width: 50%;
    }
    .xtsz .wangzhan{
        width: 60%;
    }
    .xtsz .xingshi{
        width: 60%;
    }
    .xtsz .el-col-1{
        height: 50px;
        line-height: 50px;
    }

</style>
<style>
    .xtsz .el-form-item__label{
        height: 50px;
        line-height: 50px;
        margin-top:10px
    }
    .xtsz .el-form-item__content{
        margin-left:0!important;
    }
    .xtsz .el-form-item__error{
        margin-left:100px;
    }
    .xtsz .el-col-9 .el-form-item__error{
        margin-left:0;
    }
</style>
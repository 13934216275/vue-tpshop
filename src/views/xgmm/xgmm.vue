<template>
    <div class="xgmm">
        <el-card class="box-card">
            <template>
                <el-tabs v-model="activeName">
                    <el-tab-pane label="修改密码" name="second"></el-tab-pane>
                </el-tabs>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="账号">
                        <el-input type="text" v-model="ruleForm.username" autocomplete="off" size="small" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="旧密码" prop="oldpass">
                        <el-input type="password" v-model="ruleForm.oldpass" autocomplete="off" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" size="small"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    </el-form-item>
                </el-form>
            </template>
        </el-card>
    </div>
</template>

<script>
    import api from "@/api";
    export default {
        name: "xgmm",
        components:{

        },
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                activeName:"second",
                ruleForm: {
                    id:this.$store.state.lablFrom.id,
                    username:this.$store.state.lablFrom.username,
                    oldpass:"",
                    password: '',
                    checkPass: '',
                },
                rules: {
                    oldpass:[{
                        required:true,message:"请输入旧密码", trigger: 'blur'
                    }],
                    password: [
                        { required:true,validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { required:true,validator: validatePass2, trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            getData(){
                // var data={
                //     username:this.ruleForm.username,
                //     password:this.ruleForm.password
                // }

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        api.login.lookLogin(this.ruleForm.id).then(res=>{
                            if(res.data.code==200){
                                if(res.data.data.password==this.ruleForm.oldpass){
                                    api.login.updateLogins("/"+this.ruleForm.id,this.ruleForm).then(res=>{
                                        if(res.data.code==200){
                                            this.$message({
                                                type:"success",
                                                message:"修改成功"
                                            })
                                            this.ruleForm={
                                                username:this.$store.state.lablFrom.username,
                                                oldpass:"",
                                                password: '',
                                                checkPass: '',
                                            };
                                        }else{
                                            this.$message({
                                                type:"error",
                                                message:"修改失败"
                                            })
                                        }
                                    }).catch(err=>{
                                        this.$message({
                                            type:"error",
                                            message:"修改失败"
                                        })
                                    })
                                }else{
                                    this.$message({
                                        type:"error",
                                        message:"旧密码有误，请重新输入！"
                                    })
                                }
                            }else{
                                this.$message({
                                    type:"error",
                                    message:"旧密码有误"
                                })
                            }
                        }).catch()
                    } else {
                        console.log('error submit!!');
                        alert('失败');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .xgmm .box-card{
        width: 500px;
        /*height: 22px;*/
        /*padding:20px;*/
        margin-top:20px;
    }
    .xgmm .el-card__body{
        padding: 0;
    }
    .xgmm .el-input{
        width:300px;
        float: left;
    }
    .xgmm .el-button--primary{
        width: 200px;
        float: left;
    }

</style>
<style>
    .xgmm .el-form-item__error{
        margin-left:70px;
    }
    .xgmm .el-button{
        margin-left:90px;
    }
</style>
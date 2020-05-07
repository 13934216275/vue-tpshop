<template>
    <div class="dbj">
        <div class="login">
            <div class="login-header">
                <img src="http://121.42.234.123:8080/public/static/images/logo/admin_login_logo_default.png" alt="">
            </div>
            <div class="login-denglu">
                <div class="form-title">
                    管理中心
                </div>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item prop="username" class="name">
                        <el-row :gutter="40">
                            <el-col :span="2">
                                <div class="names"></div>
                            </el-col>
                            <el-col :span="16">
                                <el-input v-model.number="ruleForm.username" placeholder="用户名"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-row :gutter="40">
                            <el-col :span="2">
                                <div class="pass"></div>
                            </el-col>
                            <el-col :span="16">
                                <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="密码"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item prop="yzm">
                    <el-row :gutter="40">
                    <el-col :span="2">
                    <div class="repass"></div>
                    </el-col>
                    <el-col :span="10">
                    <el-input type="text" v-model="ruleForm.yzm" autocomplete="off" class="yzm" placeholder="验证码"></el-input>
                    </el-col>
                    <el-col :span="8">
                    <div class="login-code" @click="refreshCode">
                    <s-identify :identifyCode="identifyCode"></s-identify>
                    </div>
                    </el-col>
                    </el-row>
                    </el-form-item>
                    <div class="wangji">忘记密码?</div>
                    <el-form-item>
                        <el-row>
                            <el-col :span="12">
                                <el-button type="warning" @click="submitForm('ruleForm')" class="submit">提交</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="dbj-banner">
            <div class="swiper-container swiper1">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" style="width: 100%;height: 100%">
                        <img src="http://121.42.234.123:8080/public/static/images/banner_1.jpg" alt="">
                    </div>
                    <div class="swiper-slide" style="width: 100%;height: 100%">
                        <img src="http://121.42.234.123:8080/public/static/images/banner_2.jpg" alt="">
                    </div>
                    <div class="swiper-slide" style="width: 100%;height: 100%">
                        <img src="http://121.42.234.123:8080/public/static/images/banner_3.jpg" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from "swiper";
    import api from "@/api";
    import SIdentify  from '@/components/yzm/tzm.vue'
    export default {
        name: "index",
        components:{
            SIdentify,
        },
        data() {
            return {
                identifyCodes: "1234567890",
                identifyCode: "",
                ruleForm: {
                    username:'',
                    password: '',
                    repassword: '',
                    yzm:"",
                },
                rules: {
                    password: [
                        { required:true, message:"请输入密码",  trigger: 'blur' }
                    ],
                    repassword: [
                        { required:true, message:"请输入验证码",  trigger: 'blur' }
                    ],
                    username: [
                        { required:true, message:"请输入用户名", trigger: 'blur' }
                    ]
                },

            };
        },
        mounted(){
            new Swiper('.swiper1',{
                autoplay: {
                    delay:2000,
                    stopOnLastSlide: false,
                    disableOnInteraction: true,
                },
                speed:600,
                effect:"fade"
            });
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        created(){
            this.refreshCode();
        },
        methods: {
            submitForm(formName) {
                if(this.ruleForm.yzm==""){
                    this.$message.error('请输入验证码！');
                    return
                }
                if(this.identifyCode!== this.ruleForm.yzm){
                    this.ruleForm.yzm="";
                    this.refreshCode();
                    this.$message.error('请输入正确的验证码！');
                    return;
                }

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        api.login.checkLogin(this.ruleForm).then(res=>{
                            console.log(res);
                            if(res.data.code==200){
                                this.$store.commit("tokens",res.data.data.token);
                                this.$store.commit('logins',{
                                    last_ip:res.data.data.last_ip,
                                    last_time:res.data.data.last_time,
                                    username:res.data.data.username,
                                    id:res.data.data.user_id,
                                });
                                this.$message({
                                    message:res.data.msg,
                                    type: 'success'
                                });
                                this.$router.push("./index");

                            }else{
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        });

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                        this.randomNum(0, this.identifyCodes.length)
                        ];
                }
                console.log(this.identifyCode);
            },
        }
    }
</script>

<style scoped>
    .dbj{
        width: 100%;
        height: 100%;
    }
    .login{
        width: 418px;
        height: 539px;
        /*background: red;*/
        position: fixed;
        top:calc((100% - 539px)/2);
        left:50%;
    }
    .login-header{
        width: 220px;
        height: 82px;
        /*background: green;*/
        margin:0 auto;
    }
    .login-header img{
        width: 100%;
        height: 100%;
    }
    .login-denglu{
        width: 100%;
        height: 424px;
        background-image: url("http://121.42.234.123:8080/public/static/images/login_formBg.png");
        margin-top:33px;
    }
    .form-title{
        width: 100%;
        height: 31px;
        padding:25px 0;
        text-align: center;
        color: #fff;
        font-size: 24px;
        background: url("http://121.42.234.123:8080/public/static/images/xianbg.png") bottom no-repeat;
    }
    .demo-ruleForm{
        margin-top:10px;
    }
    .dbj-banner{
        width: 100%;
        height: 100%;
        position: fixed;
        left:0;
        top:0;
        z-index: -1;
    }
    .dbj-banner img{
        width: 100%;
        height: 100%;
    }
    .name{
        width: 100%;
        /*background: red;*/
        text-align: left;
    }

    .names{
        width: 30px;
        height: 30px;
        background: url("http://121.42.234.123:8080/public/static/images/login_icon.png");
        background-position: 0 4px;
    }
    .pass{
        width: 30px;
        height: 30px;
        background: url("http://121.42.234.123:8080/public/static/images/login_icon.png");
        background-position: 0 -35px;
    }
    .repass{
        width: 30px;
        height: 30px;
        background: url("http://121.42.234.123:8080/public/static/images/login_icon.png");
        background-position: 0 -68px;
    }
    .wangji{
        width: 80px;
        height: 40px;
        margin-top:0;
        margin-bottom:-20px;
        margin-left:230px;
        font-size: 13px;
        color:#fff;
        cursor: pointer;
    }
    .wangji:hover{
        color:#ec5051;
    }

</style>
<style>
    .el-form-item__content{
        width: 100%;
        margin-left:30px  !important;
        margin-top:10px;
    }
    .dbj .el-row{
        margin: 0 0 0 20px !important;
    }
    .el-form-item{
        margin-bottom:10px;
    }
    .el-form-item__error{
        margin-left:90px;
    }
    .el-input__inner{
        height: 50px;
    }
    .submit{
        width: 200px;
        margin-left:70px;
    }
    .el-col-8{
        padding:0!important;
        margin-top:5px;
        margin-left:-10px;
        float: left!important;
    }
</style>
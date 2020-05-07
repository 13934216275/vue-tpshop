<template>
    <div class="lbtgl">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-button type="primary" size="mini" @click="addBanner = true">添加轮播图</el-button>
                <div style="margin-top: 15px;" class="search-first">
                    <el-input placeholder="请输入内容" v-model="input" size="mini">
                        <el-button slot="append" icon="el-icon-search" class="search-firsts"></el-button>
                    </el-input>
                </div>
            </div>
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
                            prop="title"
                            label="标题">
                    </el-table-column>
                    <el-table-column
                            prop="image"
                            label="缩略图">
                        <template slot-scope="scope">
                            <img :src="$store.state.host+scope.row.image" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="是否轮播">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.is_enable" :active-value="1" :inactive-value="0"></el-switch>
                        </template>>
                    </el-table-column>
                    <el-table-column
                            prop="create_time"
                            label="时间">
                    </el-table-column>
                    <el-table-column
                            prop="url"
                            label="地址">
                    </el-table-column>
                    <el-table-column
                            label="位置">
                        <template slot-scope="scope">
                            <p>{{scope.row.image}}</p>
                        </template>>
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button size="small" @click="editBanner(scope.row)">编辑</el-button>
                            <el-button size="small" @click="deleteBanner(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-card>
        <!--添加轮播图开始-->
        <el-dialog title="添加轮播图" :visible.sync="addBanner" width="50%">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules" status-icon>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title" class="input-first" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="图片地址" prop="url">
                    <el-input v-model="form.url" class="input-first" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="缩略图">
                    <el-upload
                            class="avatar-uploader"
                            action="http://www.jiaju.com/upload"
                            name="image"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="form.image" :src="$store.state.host + form.image" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="是否轮播">
                    <el-switch v-model="form.is_enable" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button @click="addBannerss">取 消</el-button>
                    <el-button type="primary" @click="addBanners('ruleForm')">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--添加轮播图结束-->

        <!--编辑轮播图开始-->
        <el-dialog title="编辑轮播图" :visible.sync="editBanners" width="50%">
            <el-form ref="form" :model="editform" label-width="80px" :rules="rules" status-icon>
                <el-form-item label="图片名称" prop="title">
                    <el-input v-model="editform.title" class="input-first" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="图片地址" prop="url">
                    <el-input v-model="editform.url" class="input-first" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="缩略图">
                    <el-upload
                            class="avatar-uploader"
                            action="http://www.jiaju.com/upload"
                            :show-file-list="false"
                            name="image"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="editform.image" :src="$store.state.host+editform.image" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="是否轮播">
                    <el-switch v-model="editform.is_enable" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button @click="editBanners = false">取 消</el-button>
                    <el-button type="primary" @click="editsForm('ruleForm')">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--编辑轮播图结束-->
    </div>
</template>

<script>
    import api from "@/api";
    export default {
        name: "lbtgl",
        data(){
            return{
                input:"",
                //修改数据状态
                editBanners:false,
                //展示数据
                tableData:[],
                // 添加数据状态
                addBanner:false,
                //添加数据
                form: {
                    title: '',
                    image: '',
                    is_enable:1,
                    url:""
                },
                //修改数据
                editform: {
                    title: '',
                    image: '',
                    is_enable:"",
                    url:""
                },
                //必填规则
                rules:{
                    title:[{required:true, message:"请输入标题", trigger: 'blur'}],
                    url:[{required:true, message:"请输入url", trigger: 'blur'}]
                }
            }
        },
        methods:{
            //删除
            deleteBanner(row){
                api.carousel.deletecarousel("/"+row['id']).then(res=>{
                    if(res){
                        this.$message({
                            message:"删除成功！",
                            type: 'success'
                        });
                        this.getData();
                    }else{
                        this.$message({
                            message:"删除失败！",
                            type: 'error'
                        });
                    }
                });
            },
            //添加的时候获取图片
            handleAvatarSuccess(data) {
                if(this.addBanner){
                    this.form.image = data.data.image;
                }else{
                    this.editform.image = data.data.image;
                }

            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            //修改数据
            editBanner(row){
                this.editBanners=true;
                this.editform=JSON.parse(JSON.stringify(row));
            },
            editsForm(form) {
                this.$refs["form"].validate((valid) => {
                    if (valid) {
                        api.carousel.updatecarousel("/"+this.editform.id,this.editform).then(res=>{
                            if(res.data.code===200){
                                this.$message({
                                    message:res.data.msg,
                                    type: 'success'
                                });
                                this.getData();
                                this.editBanners=false;
                            }else{
                                this.$message({
                                    message:res.data.msg,
                                    type: 'error'
                                });
                            }
                        }).catch(err=>{
                            this.$message({
                                type:"error",
                                message:err
                            })
                        })
                    } else {
                        this.$message({
                            message:"未知的错误！",
                            type: 'error'
                        });
                        return false;
                    }
                });
            },
            //定义获取数据的函数，方便每次调用
            getData(){
                api.carousel.lookcarousel().then(res=>{
                    if(res.data.code===200){
                        this.tableData=res.data.data;
                    }else{
                        this.$message({
                            message:"获取失败",
                            type: 'error'
                        });
                    }
                })
            },
            //添加
            addBanners(form){
                this.$refs["form"].validate((valid) => {
                    if (valid) {
                        api.carousel.Addcarousel(this.form).then(res=>{
                            if(res.data.code === 200){
                                this.$message({
                                    message:res.data.msg,
                                    type: 'success'
                                });
                                this.getData();
                                this.addBanner=false;
                                this.form.title='';
                                this.form.is_enable=1;
                                this.form.image='';
                                this.form.url='';
                            }else{
                                this.$message({
                                    message:res.data.msg,
                                    type: 'error'
                                });
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            addBannerss(){
                this.addBanner=false;
                this.form.title='';
                this.form.is_enable=1;
                this.form.image='';
                this.form.url='';
            }
        },
        mounted() {
            //加载页面的时候初始化数据
            this.getData();
        }
    }
</script>

<style scoped>
    .lbtgl .search-first{
        width: 30%;
        margin-top:0 !important;
        float: right;
    }
    .lbtgl .el-table__row img{
        width: 50px;
        height: 50px;
    }
    .lbtgl .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .lbtgl .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .lbtgl .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .lbtgl .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .lbtgl .input-first{
        width: 80%;
    }
    .lbtgl .btn{
        text-align: right;
        margin-top:20px;
        margin-right: 200px;
    }
</style>
<style>
    .lbtgl .el-upload{
        border: 1px dashed #d9d9d9;
    }
    .lbtgl .el-form-item__content{
        margin-top:10px;
    }
    .lbtgl .el-form-item__label{
        margin-top:10px;
    }
    .lbtgl .el-form-item__error{
        margin-left:50px;
    }
</style>
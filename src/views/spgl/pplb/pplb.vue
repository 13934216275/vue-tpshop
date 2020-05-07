<template>
    <div class="pplb">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>品牌列表</span>
                <p>(共0条记录)</p>
                <el-tooltip content="刷新数据" placement="bottom" effect="light">
                    <i class="el-icon-refresh"></i>
                </el-tooltip>
                <div style="margin-top: 15px;" class="search-first">
                    <el-input placeholder="请输入内容" v-model="input" size="small">
                        <el-button slot="append" icon="el-icon-search" class="search-firsts"></el-button>
                    </el-input>
                </div>
            </div>
            <div class="text item">
                <div class="item-header">
                    <el-button type="primary" size="small" @click="addpinpai">新增品牌</el-button>
                    <el-button type="danger" size="small">批量删除</el-button>
                </div>
                <template>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="ppid"
                                label="品牌ID"
                                width="70">
                        </el-table-column>
                        <el-table-column
                                label="LOGO">
                            <template slot-scope="scope">
                                <img :src="scope.row.logo" alt="">
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="ppfl"
                                label="品牌分类">
                        </el-table-column>
                        <el-table-column
                                prop="sftj"
                                label="是否推荐">
                        </el-table-column>
                        <el-table-column
                                prop="sort"
                                label="排序">
                        </el-table-column>
                        <el-table-column
                                label="品牌分类">
                            <template slot-scope="scope">
                                <el-button size="small" @click="editpinpai(scope.row)">编辑</el-button>
                                <el-button size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </el-card>
        <el-dialog title="添加品牌列表" :visible.sync="addpinpais">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="LOGO" prop="logo">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="品牌分类" prop="ppfl">
                    <el-input type="text" v-model="ruleForm.ppfl" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item label="是否推荐" prop="sftj">
                    <el-switch
                            v-model="ruleForm.sftj"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input type="text" v-model="ruleForm.sort" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addpinpais = false">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑品牌列表" :visible.sync="editpinpais">
            <el-form :model="editruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="LOGO" prop="logo">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="品牌分类" prop="ppfl">
                    <el-input type="text" v-model="editruleForm.ppfl" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item label="是否推荐" prop="sftj">
                    <el-switch
                            v-model="editruleForm.sftj"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input type="text" v-model="editruleForm.sort" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="editpinpais = false">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "pplb",
        data() {

            return {
                imageUrl: '',
                append:false,
                value: true,
                addpinpais:false,
                editpinpais:false,
                input:"",
                tableData: [
                    {
                        ppid: '1',
                        logo: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3300305952,1328708913&fm=27&gp=0.jpg',
                        ppfl: '上海市普陀区金沙江路 1518 弄',
                        sftj: '上海市普陀区金沙江路 1518 弄',
                        sort: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        ppid: '1',
                        logo: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3300305952,1328708913&fm=27&gp=0.jpg',
                        ppfl: '上海市普陀区金沙江路 1518 弄',
                        sftj: '上海市普陀区金沙江路 1518 弄',
                        sort: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        ppid: '1',
                        logo: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3300305952,1328708913&fm=27&gp=0.jpg',
                        ppfl: '上海市普陀区金沙江路 1518 弄',
                        sftj: '上海市普陀区金沙江路 1518 弄',
                        sort: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        ppid: '1',
                        logo: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3300305952,1328708913&fm=27&gp=0.jpg',
                        ppfl: '上海市普陀区金沙江路 1518 弄',
                        sftj: '上海市普陀区金沙江路 1518 弄',
                        sort: '上海市普陀区金沙江路 1518 弄'
                    }
                ],
                ruleForm: {
                    logo: '',
                    ppfl: '',
                    sftj: true,
                    sort:""
                },
                editruleForm: {
                    logo: '',
                    ppfl: '',
                    sftj: true,
                    sort:""
                },
                rules: {
                    ppfl: [
                        { required: true, message:"请输入品牌分类", trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            addpinpai(){
                this.addpinpais=true;
            },
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
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
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
            editpinpai(){
                this.editpinpais=true;
            }
        },
    }
</script>

<style scoped>
    .pplb .text {
        font-size: 14px;
    }

    .pplb .item {
        margin-bottom: 18px;
    }

    .pplb .clearfix:before,
    .pplb .clearfix:after {
        display: table;
        content: "";
    }
    .pplb .clearfix span{
        float: left;
    }
    .pplb .clearfix p{
        float: left;
        font-size: 12px;
        line-height: 27px;
        margin-left:5px;
    }
    .pplb .clearfix:after {
        clear: both
    }

    .pplb .box-card {
        width: 100%;
    }
    .pplb .flbtn{
        width: 40px;
        height: 20px;
        text-align: center;
        padding:0;
        margin-left:10px;
        color:#0ba4da;
        border-color:#0ba4da;
        border-radius: 5px;
    }
    .pplb .clearfix i{
        margin-left:20px;
        color:#999;
        font-weight: 800;
        line-height: 27px;
    }
    .pplb .addfl{
        width: 70px;
        height: 30px;
        padding:0 10px;
        margin-left:20px;
    }
    .pplb .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    .pplb .custom-tree-node span{
        text-align: right;
    }
    .pplb .search-first{
        float: right;
    }
    .pplb .item-header{
        width: 100%;
        height: 50px;
        /*background: red;*/
    }
    .pplb .el-table__row img{
        width: 50px;
        height: 50px;
        margin-left:60px;
    }
    .pplb .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .pplb .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .pplb .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .pplb .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .pplb .el-input{
        width: 30%;
    }
    .pplb .search-first .el-input{
        width: 100%;
    }
</style>
<style>
    .pplb .el-form-item__content{
        margin-left:0 !important;
        line-height: 50px !important;
    }
    .pplb .el-input{
        float: left;
        margin-top:-15px;
    }
    .pplb .el-switch{
        /*margin-top:10px;*/
        float: left;
    }
    .pplb .el-form-item:nth-child(3) .el-form-item__content{
        text-align: right !important;
    }
    .pplb .el-dialog{
        border-radius: 5px;
    }
    .pplb .el-upload{
        border: 1px dashed #d9d9d9;
    }
    .pplb .el-form-item__error{
        margin-left:100px;
    }
</style>
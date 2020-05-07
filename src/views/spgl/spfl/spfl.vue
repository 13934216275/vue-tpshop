<template>
    <div class="spfl">
        <div class="czts">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>商品分类列表</span>
                    <el-tooltip content="帮助" placement="bottom" effect="light">
                        <el-button size="mini" class="flbtn">
                            帮助
                        </el-button>
                    </el-tooltip>
                    <el-tooltip content="刷新数据" placement="bottom" effect="light">
                    <i class="el-icon-refresh"></i>
                    </el-tooltip>
                </div>
                <div class="text item">
                    <div class="custom-tree-container">
                        <div class="block">
                            <el-tree
                                    :data="data"
                                    show-checkbox
                                    node-key="id"
                                    :props="{label:'name'}"
                                    :expand-on-click-node="false">
                                  <span class="custom-tree-node" slot-scope="{ node, data }">
                                        <span>{{ node.label }}</span>
                                            <span>
                                                <el-button
                                                   type="text"
                                                   size="mini"
                                                   @click="addappend(data)">
                                                    添加
                                                </el-button>
                                                <el-button
                                                     type="text"
                                                     size="mini"
                                                     @click="editappend(data)">
                                                    编辑
                                                </el-button>
                                                <el-button
                                                   type="text"
                                                   size="mini"
                                                   @click="() => remove(node, data)">
                                                    删除
                                                </el-button>
                                            </span>
                                  </span>
                            </el-tree>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
        <!--添加分类弹窗开始-->
        <el-dialog title="添加分类"
                   :visible.sync="append"
                   width="26%">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="分类名称" prop="name">
                    <el-input type="text" v-model="ruleForm.name" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item label="父级ID" prop="pid">
                    <el-cascader
                            :options="datas"
                            :props="{ checkStrictly: true ,label:'name',value:'id'}"
                            clearable
                            size="small"
                            v-model="ruleForm.pid">
                    </el-cascader>
                </el-form-item>
                <el-form-item>
                    <el-button @click="append = false">取 消</el-button>
                    <el-button type="primary" @click="addappends">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--添加分类弹窗结束-->
        <!--编辑分类弹窗开始-->
        <el-dialog title="编辑分类"
                   :visible.sync="editappends"
                   width="26%">
            <el-form :model="editruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="分类名称" prop="name">
                    <el-input type="text" v-model="editruleForm.name" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item label="父级ID" prop="pid">
                    <el-cascader
                            :options="datas"
                            :props="{ checkStrictly: true ,label:'name',value:'id'}"
                            clearable
                            size="small"
                            v-model="editruleForm.pid">
                    </el-cascader>
                </el-form-item>
                <el-form-item>
                    <el-button @click="editappends = false">取 消</el-button>
                    <el-button type="primary" @click="editCategory">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--编辑分类弹窗结束-->
    </div>
</template>

<script>
    import api from "@/api";
    export default {
        name: "spfl",
        data() {
            return {
                data : [],
                datas:[],
                append:false,
                editappends:false,
                pids:"",
                ruleForm: {
                    name: '',
                    pid:[]
                },
                editruleForm: {
                    id:"",
                    name: '',
                    pid:[]
                },
                rules: {
                    name: [
                        { required:true, message:"请输入分类名称", trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            remove(node, data) {
                api.category.deleteCategory("/"+data.id).then(res=>{
                    if(res.data.code===200){
                        this.$message({
                            type:"success",
                            message:res.data.msg
                        })
                        this.getCategory();
                    }else{
                        this.$message({
                            type:"error",
                            message:res.data.msg
                        })
                    }
                })
            },
            //修改
            editappend(data){
                this.editappends=true;
                this.editruleForm.id=data.id;
                this.editruleForm.pid=[data.pid];
                this.editruleForm.name=data.name;
            },
            editCategory(){
                if(this.editruleForm.name){
                    var datass={
                        id:this.editruleForm.id,
                        name:this.editruleForm.name,
                        pid:this.editruleForm.pid.pop()
                    };
                    var id=this.editruleForm.id;
                    api.category.updateCategory("/"+id,datass).then(res=>{
                        if(res.data.code===200){
                            this.$message({
                                type:"success",
                                message:res.data.msg
                            })
                            this.editappends=false;
                            this.getCategory();
                        }else{
                            this.$message({
                                type:"error",
                                message:res.data.data
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
                        message:"请输入分类名称"
                    })
                }

            },
            //添加
            addappend(data){
                this.append=true;
                this.ruleForm.pid=JSON.parse(JSON.stringify(data.id));
            },
            addappends(){
                if(this.ruleForm.name){
                    if(Array.isArray(this.ruleForm.pid)){
                        this.ruleForm.pid=this.ruleForm.pid.pop();
                    }
                    this.$refs["ruleForm"].validate((valid) => {
                        if (valid) {
                            api.category.addCategory(this.ruleForm).then(res=>{
                                if(res.data.code===200){
                                    this.$message({
                                        type:"success",
                                        message:res.data.msg,
                                    });
                                    this.append=false;
                                    this.getCategory();
                                    this.ruleForm={
                                        name:"",
                                        pid:""
                                    }
                                }else{
                                    this.$message({
                                        type:"error",
                                        message:res.data.msg
                                    })
                                }
                            })
                        }else{
                            this.$message({
                                type:"error",
                                message:"添加失败"
                            });
                        }
                    })
                }else{
                    this.$message({
                        type:"error",
                        message:"请选择分类"
                    })
                }

            },
            getCategory(){
                api.category.lookCategory().then(res=>{
                    if(res.data.code===200){
                        this.data=res.data.data;
                        this.datas=JSON.parse(JSON.stringify(res.data.data));
                        this.datas.unshift({
                            id:"0",
                            name:"顶级分类",
                            pid:0,
                        });
                    }
                }).catch(err=>{
                    this.$message({
                        type:"error",
                        message:err+"未知的错误"
                    })
                })
            },

        },
        mounted() {
           this.getCategory();
        }
    }
</script>

<style scoped>
    .spfl .text {
        font-size: 14px;
    }

    .spfl .item {
        margin-bottom: 18px;
    }

    .spfl .clearfix:before,
    .spfl .clearfix:after {
        display: table;
        content: "";
    }
    .spfl .clearfix:after {
        clear: both
    }

    .spfl .box-card {
        width: 100%;
    }
    .spfl .flbtn{
        width: 40px;
        height: 20px;
        text-align: center;
        padding:0;
        margin-left:10px;
        color:#0ba4da;
        border-color:#0ba4da;
        border-radius: 5px;
    }
    .spfl .clearfix i{
        margin-left:20px;
        color:#999;
        font-weight: 800;
    }
    .spfl .addfl{
        width: 70px;
        height: 30px;
        padding:0 10px;
        margin-left:20px;
    }
    .spfl .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    .spfl .custom-tree-node span{
        text-align: right;
    }

</style>
<style>
    .spfl .el-form-item__content{
        margin-left:0 !important;
        line-height: 50px !important;
    }
    .spfl .el-input{
        width: 50%;
        float: left;
        margin-top:-15px;
    }
    .spfl .el-switch{
        margin-top:-30px;
        margin-left:10px;
    }
    .spfl .el-form-item:nth-child(3) .el-form-item__content{
        text-align: right !important;
    }
    .spfl .el-dialog{
        border-radius: 5px;
    }

    .el-input--suffix{
        width: 200px!important;
    }
</style>
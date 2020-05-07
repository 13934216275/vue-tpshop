<template>
    <div class="addsplb">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加商品</span>
            </div>
            <div class="text item">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="商品编号" prop="number">
                        <el-input  v-model="ruleForm.number" size="small" style="width: 60%"></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称" prop="name">
                        <el-input v-model="ruleForm.name" size="small" style="width: 60%"></el-input>
                    </el-form-item>
                    <el-form-item label="商品描述" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.desc" size="small" class="jianjie"></el-input>
                    </el-form-item>
                    <el-form-item label="商品图片">
                        <el-upload
                                :action="$store.state.host+'upload'"
                                list-type="picture-card"
                                name="image"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="cat_id">
                        <el-cascader
                                v-model="ruleForm.cat_id"
                                size="small"
                                :options="options"
                                :props="{label:'name',value:'id'}"
                                @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="是否包邮" prop="is_rarcel" class="huohao">
                        <el-switch
                                v-model="ruleForm.is_rarcel"
                                active-value="1"
                                inactive-color="0">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="是否上架" prop="is_up" class="huohao">
                        <el-switch
                                v-model="ruleForm.is_up"
                                active-value="1"
                                inactive-value="0">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="推荐位">
                        <el-checkbox-group v-model="recom">
                            <el-checkbox v-for="v in checkList" :label="v.id">{{v.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="商品SKU" class="sku">
                        <div>
                            <el-form-item label="规格"  size="small">
                                <el-select v-model="guigess" placeholder="请选择">
                                    <el-option
                                            v-for="item in tableData"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-button type="primary" @click="addtype" class="add-btn">
                                    添加
                                </el-button>
                            </el-form-item>
                            <div>
                                <el-form-item :label="v.type+':'" v-for="v in guige" :key="v.id"
                                              class="Specifications"
                                              label-width="90"
                                              label-position="right 20px">
                                    <el-radio-group v-model="guiges[v.type]" size="small" class="xuanxiang">
                                        <el-radio-button :label="val" v-for="val in v.list" :value="v.type" :key="val.id"></el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <div style="margin-left:120px;">
                                    <el-button type="primary" size="small" @click="tjbtn">提交</el-button>
                                    <table width="80%">
                                        <tr>
                                            <th width="130">规格</th>
                                            <th>商品编号</th>
                                            <th>市场价格</th>
                                            <th>本店价格</th>
                                            <th>库存</th>
                                            <th>操作</th>
                                        </tr>
                                        <tr v-for="v in tjData">
                                            <td>{{Object.values(v.specs).join(" ")}}</td>
                                            <td>
                                                <p>{{v.number}}</p>
                                            </td>
                                            <td>
                                                <input type="number" v-model="v.market_price" style="width: 90%" size="small">
                                            </td>
                                            <td>
                                                <input type="number" v-model="v.shop_price" style="width: 90%">
                                            </td>
                                            <td style="margin-left:10px;">
                                                <input type="number" v-model="v.stock" style="width: 90%">
                                            </td>
                                            <td>
                                                <el-button type="danger" class="del-btn" @click="delbtn(v)">
                                                    删除
                                                </el-button>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="商品属性">
                        <el-select v-model="attrs" placeholder="请选择"
                                   @change="selections"
                                    size="small">
                            <el-option
                                    v-for="item in tableDatas"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-form-item  v-for="(v, i) in specstype"
                                       :label="i"
                                       class="qwe"
                                       :key="i">
                            <el-input v-model="specstype[i]" class="asaa" size="small"></el-input>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="商品详情" class="xiangqings">
                        <div id="editorElem"></div>
                    </el-form-item>
                    <el-form-item class="anniu">
                        <el-button type="primary" @click="submitForm('ruleForm')">确认提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    import api from "@/api";
    import E from "wangeditor";
    export default {
        name: "addsplb",
        data(){
            return{
                content:null,
                editorOption:{},
                uploadUrl: this.$store.state.host + "/upload",//文件上传接口
                //图片列表
                imglist:[],
                //规格
                tableData:[],
                guige:[],
                guiges:{},
                guigess:"",
                //推荐位
                checkList:[],
                recom:[],
                //提交data
                tjData:[],
                //富文本
                fwb:"",
                //属性
                tableDatas:[],
                attrs:"",
                specstype:[],
                //添加数据的对象
                ruleForm: {
                    number:"",
                    name:"",
                    desc:"",
                    images:"",
                    cat_id:"",
                    attrs:"",
                    is_rarcel:"1",
                    is_up:"1",
                    content:null,
                },
                //级联下拉对象
                options: [],
                //规则
                rules: {
                    name: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' },
                    ],
                    desc: [
                        { required: true, message: '请输入商品描述', trigger: 'change' }
                    ],
                    cat_id: [
                        { required: true, message: '请选择分类', trigger: 'change' }
                    ],
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var spu=JSON.parse(JSON.stringify(this.ruleForm));
                        spu.specs=this.tjData;
                        spu.attrs=this.specstype;

                        spu.images=JSON.stringify(spu.images);
                        spu.attrs=JSON.stringify(spu.attrs);
                        var sku=JSON.parse(JSON.stringify(this.tjData));

                        for (var i = 0; i < sku.length; i++) {
                            sku[i].specs = JSON.stringify(sku[i].specs);
                        }
                        var recom=this.recom;
                        api.goods.AddGoods({
                            sku,spu,recom
                        }).then(res=>{
                            if(res.data.code==200){
                                this.$message({
                                    type:"success",
                                    message:res.data.msg
                                })
                                this.$router.push({name:"splb"})
                            }else{
                                this.$message({
                                    type:"error",
                                    message:res.data.msg
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleChange(value) {
                this.ruleForm.cat_id=value.pop();
            },
            //添加属性
            addtype(){
                let id = this.guigess;
                var data=[];
                api.specstype.lookspecstype().then(res=>{
                    res.data.data.forEach(ele=>{
                        if(ele.sid==id){
                            data.push(ele);
                        }
                    })
                    for(var i=0;i<data.length;i++){
                        data[i].list=data[i].value.split(",");
                        this.$set(this.guiges,[data[i].type],data[i].list[0])
                    }
                    this.guige=data;
                }).catch(err=>{});

            },


            //选择好属性后动态创建表格
            selections(val){
                let obj={};
                var arr=val.split(',');
                arr.forEach(ele=>{
                    obj[ele]=""
                })
                this.specstype=obj;
            },

            //图片处理
            handleAvatarSuccess(data,file,fileList) {
                this.imglist=[];
                fileList.forEach(ele=>{
                    this.imglist.push(ele.response.data.image);
                })
                this.ruleForm.images=this.imglist;
                // this.ruleForm.images=fileList.map(v=>{
                //     return v.response.data.image;
                // });
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

            //点击提交
            tjbtn(){
                var flag=false;
                var data=this.tjData;
                for(var i=0;i<data.length;i++){

                    var flag2=false;
                    var specs=this.tjData[i].specs;
                    for(let v  in specs){
                        if(specs[v]!==this.guiges[v]){
                            flag2=true;
                        }
                    }
                    if(flag2==false){
                        flag=true;
                        break;
                    }
                }
                if(flag==true){
                    this.$message.warning("该规格已存在！");
                    this.guiges={};
                    return false;
                }
                this.tjData.push({
                    "specs":JSON.parse(JSON.stringify(this.guiges)),
                    "number":"",
                    "market_price":0,
                    "shop_price":0,
                    "stock":0,
                });
                this.guiges={};
            },

            //删除
            delbtn(dats){
                this.tjData.splice(this.tjData.indexOf(dats),1);
            },


            //页面重新获取数据
            getData(){
                //获取属性
                api.attribute.lookattribute().then(res=>    {
                    if(res.data.code==200){
                        this.tableDatas=res.data.data;
                    }else{
                        this.$message.error("属性获取失败");
                    }
                });
                //获取规格
                api.specstpl.lookspecstpl().then(res=>{
                    if(res.data.code===200){
                        this.tableData=res.data.data;
                    }else{
                        this.$message.error("规格获取失败");
                    }
                });
                //获取分类
                api.category.lookCategory().then(res=>{
                    if(res.data.code==200){
                        this.options=res.data.data;
                    }else{
                        this.$message.error("分类获取失败");
                    }
                });
                //推荐位
                api.recom.lookRecom().then(res=>{
                    if(res.data.code==200){
                        this.checkList=res.data.data;
                    }else{
                        this.$message.error("推荐位获取失败");
                    }
                })
            }
        },
        mounted() {
            var that = this;
            var editor = new E("#editorElem");
            // 配置服务器端地址
            editor.customConfig.uploadFileName = "image";
            editor.customConfig.uploadImgServer = this.$store.state.host + "/upload";
            editor.customConfig.uploadImgHooks = {
                customInsert: function(insertImg, result, editor) {
                    console.log(result);
                    var url = that.$store.state.host + result.data.image;
                    insertImg(url);

                    // result 必须是一个 JSON 格式字符串！！！否则报错
                }
            };

            editor.customConfig.onchange = html => {
                this.ruleForm.content=html;
            };
            editor.create();
            this.getData();
        },

    }
</script>

<style scoped>
    .addsplb .box-card{
        position: relative;
        padding-bottom:50px;
    }
    .addsplb .jianjie{
        width: 60%;
    }
    .addsplb .el-radio{
        margin-right:0;
    }
    .addsplb .huohao p{
        margin-left:90px;
        color:#e0e0e0;
    }
    .addsplb .huohao p:hover{
        color:#2cbca3;
    }
    .addsplb .zhongliang p{
        margin-left:90px;
        color:#e0e0e0;
    }
    .addsplb .zhongliang p:hover{
        color:#2cbca3;
    }
    .addsplb .tiji p{
        margin-left:90px;
        color:#e0e0e0;
    }
    .addsplb .tiji p:hover{
        color:#2cbca3;
    }
    .addsplb .guanjian p{
        margin-left:90px;
        color:#e0e0e0;
    }
    .addsplb .guanjian p:hover{
        color:#2cbca3;
    }
    .addsplb .xiaoshou p{
        margin-left:90px;
        color:#e0e0e0;
    }
    .addsplb .xiaoshou p:hover{
        color:#2cbca3;
    }
    .addsplb .shoucang p{
        margin-left:90px;
        color:#e0e0e0;
    }
    .addsplb .shoucang p:hover{
        color:#2cbca3;
    }
    .addsplb .miaoshu{
        width: 80%;
        height: 900px;
        float: left;
    }
    .addsplb .anniu{
        position: absolute;
        left:110px;
        bottom:10px;
    }
    .addsplb .Specifications{
        margin-left:80px;
        margin-top:10px;
    }
    .addsplb .add-btn{
        margin-left:10px;
    }
    .addsplb .xuanxiang{
        margin-left:10px;
    }
    .addsplb .asaa{
        width: auto;
        margin-top:10px;
    }

</style>
<style>
    .addsplb .pinpai{
        height: 10px;
    }
    .addsplb .el-form-item__content{
        margin-top:0!important;
    }
    .addsplb .sku .el-form-item__label{
        width: 100px!important;
        text-align: right;
    }
    .addsplb .qwe .el-form-item__label{
        margin-top:10px!important;
    }
    .addsplb .xiangqings .el-form-item__content{
        width: 80%;
    }
    .addsplb .xiangqings .w-e-text-container{
        margin-left:90px;
    }
    .el-popper{
        z-index: 9999999!important;
    }
</style>
<template>
    <div id="Ueditor" style="margin:10px">
        <script id="editor" type="text/plain"></script>
        <br>
        <el-button @click="getUEContent">带标签提交</el-button>
        <el-button @click="getUEText">纯文本提交</el-button>
    </div>
</template>
<script>
    import {quillRedefine} from 'vue-quill-editor-upload'//引入图片上传
    export default {
        name:'Ueditor',
        data(){
            return{
                editor: null
            }
        },
        props: {
            defaultMsg: {
                type: String
            },
            config: {
                //我们在编辑器中上传图片或者视频，也会出现响应的报错，这是因为没有配置服务器的请求接口，在ueditor.config.js中，对serverUrl进行配置：
                serverUrl: 'http://172.16.254.49:83/File/UEditor',   //地址管你们后端要去
                type: Object
            }
        },
        mounted() {
            const _this = this;
            this.editor = UE.getEditor('editor', this.config); // 初始化UE
            this.editor.addListener("ready", function () {
                _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
            });
        },
        methods: {
            getUEContent() { // 获取内容方法,包含html标签比如加粗<strong>11111</strong>
                console.log(this.editor.getContent())
                return this.editor.getContent()
            },
            getUEText(){//获取纯文本内容,会保留段落格式
                console.log(this.editor.getPlainTxt())
                return this.editor.getPlainTxt()
            }
        },
        destroyed() {
            console.log('destroy')
            this.editor.destroy();
        },
        created() {
            this.editorOption = quillRedefine(//修改富文本编辑器图片上传路径
                {
                    // 图片上传的设置
                    uploadConfig: {
                        action: this.uploadUrl,  // 必填参数 图片上传地址
                        res: (respnse) => {
                            return respnse.data.src;//return图片url
                        },
                        name: 'image'  // 图片上传参数名
                    }
                })
        }
    }
</script>
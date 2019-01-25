<template>
    <box-modal :title="title" :visible="true" transition="roll">
        <div class="edit-wrp">
            <div class="control">
                <div class="control">
                    <input name="title" v-model="Thetitle" class="input" type="text" placeholder="课堂标题">
                </div>
            </div>
            <div class="edit-box">
                <div id="editor" v-model="content"></div>
                <!-- <quill-editor ref="myTextEditor"
                              v-model="content"
                              :config="editorOption"
                              @blur="onEditorBlur($event)"
                              @focus="onEditorFocus($event)"
                              @ready="onEditorReady($event)"
                >
                </quill-editor> -->
            </div>
            <div class="edit-images">
                <template>
                    <div class="positionimg-warp positionimg">
                        <div class="positionimg">
                            <ul v-if="images.length === 1">
                                <li>
                                    <img :src="images[0]" @click='delImage(0)' />
                                    <a href="#" style="position: absolute;" @click='delImage(0)'>
                                        <span class="glyphicon glyphicon-remove"></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" style="position: absolute;" @click='delImage(1)'>
                                        <span class="glyphicon glyphicon-remove"></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" style="position: absolute;" @click='delImage(2)'>
                                        <span class="glyphicon glyphicon-remove"></span>
                                    </a>
                                </li>
                            </ul>
                            <ul v-if="images.length === 2">
                                <li>
                                    <img :src="images[0]" @click='delImage(0)' />
                                    <a href="#" style="position: absolute;" @click='delImage(0)'>
                                        <span class="glyphicon glyphicon-remove"></span>
                                    </a>
                                </li>
                                <li>
                                    <img :src="images[1]" @click='delImage(1)' />
                                    <a href="#" style="position: absolute;" @click='delImage(1)'>
                                        <span class="glyphicon glyphicon-remove"></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" style="position: absolute;" @click='delImage(2)'>
                                        <span class="glyphicon glyphicon-remove"></span>
                                    </a>
                                </li>
                            </ul>
                            <ul v-if="images.length === 3">
                                <li>
                                    <img :src="images[0]" @click='delImage(0)' />
                                    <a href="#" style="position: absolute;" @click='delImage(0)'>
                                        <span class="glyphicon glyphicon-remove"></span>
                                    </a>
                                </li>
                                <li>
                                    <img :src="images[1]" @click='delImage(1)' />
                                    <a href="#" style="position: absolute;" @click='delImage(1)'>
                                        <span class="glyphicon glyphicon-remove"></span>
                                    </a>
                                </li>
                                <li>
                                    <img :src="images[2]" @click='delImage(2)' />
                                    <a href="#" style="position: absolute;" @click='delImage(2)'>
                                        <span class="glyphicon glyphicon-remove"></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="uploadimg-warp">
                        <!--<div class="uploadimg" v-if="!image">
                            <input type="file" @change="onFileChange">
                        </div>
                        <div class="uploadimg" v-if="!image">
                            <input type="file" @change="onFileChange">
                        </div>
                        <div class="uploadimg" v-if="!image">
                            <input type="file" @change="onFileChange">
                        </div>-->
                        <ali-upload :items.sync="imageUrls" :dir.sync="dirdata" :columns.sync="columnsnumber"></ali-upload>
                    </div>
                </template>

            </div>
            <div class="by-option">
                <p class="control is-expanded">
                    <el-select v-model="value7" placeholder="请选择类别">
                            <el-option-group
                                v-for="group in tClass"
                                :label="group.label">
                                <!-- <el-option
                                    v-for="item in tClass"
                                    :label="item.className"
                                    :value="item.classId">
                                </el-option> -->
                            <el-option
                                    v-for="item in group.options"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-option-group>
                    </el-select>
                </p>
            </div>
            <div class="button-group" style="text-align: right;">
                <div class="control" style="display: inline-block;">
                    <button @click="doCancel" type="submit" class="button is-cancel">取消</button>
                </div>
                <div class="control" style="display: inline-block;">
                    <button type="submit" @click="NewAdd" class="button is-primary">提交</button>
                </div>
            </div>
        </div>
    </box-modal>
</template>
<style lang="scss">
    .edit-wrp{
        min-height: 30rem;
        padding: .6rem 2rem;
        .edit-box{
            position: relative;
            .ql-container{
                .ql-editor {
                    min-height: 20em;
                    padding-bottom: 1em;
                    max-height: 25em;
                }
            }
            .html {
                height: 9em;
                overflow-y: auto;
                border: 1px solid #ccc;
                border-top: none;
                resize: vertical;
            }
            .ql-tooltip{
                left: 0 !important;
                top: 100px !important;
            }
        }
        .button-group{
            margin-top: 1rem;
        }
        .label{
            font-weight: normal;
        }
    }
</style>
<style>
    .edit-images{
        width: 100%;
        border: 1px solid #ccc;
        /*height: 13rem;*/
        position: relative;
        border-top: none;
    }
    .edit-images ul{
        width: 100%;
        height: 100%;
        display: box;
        display:-moz-box;
        display:-webkit-box;
    }
    .edit-images ul li{
        -moz-box-flex:1;
        -webkit-box-flex:1;
        box-flex:1;
        height: 100%;
        widows: 100%;
        position: relative;
    }
    .edit-images ul li img{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 999;
    }
    .edit-images ul li a{
        display: block;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }
    .uploadimg-warp{
       /* height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        display: box;*/
        display: -moz-box;
        display: -webkit-box;
    }
    .uploadimg{
        display: block;
        height: 100%;
        /* width: 30%; */
        -moz-box-flex: 1;
        -webkit-box-flex: 1;
        box-flex: 1;
        background-image: url(../../assets/upload.png);
        background-size: 100% 100%;
    }
    .uploadimg input{
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    .positionimg{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .by-option{
        margin-top: 10px;
    }
</style>
<script>
    var contents = ''
    import BoxModal from '../Com/BoxModal.vue'
    import auth from '../../js/auth'
    /*import { quillEditor } from 'vue-quill-editor'*/
    //    import upload from '../../js/upload'
    import aliUpload from '../Com/AliOssUpload.vue'

    export default{
        name:'newMsg',
        data(){
            return{
                title:'新建资讯',
                msg:'hello vue',
                Thetitle:'',
                content: '',
                tClass: [{
                    label: '请选择类别',
                    options: [{
                        value: 1,
                        label: '健康'
                    }, {
                        value: 2,
                        label: '科学'
                    }, {
                        value: 3,
                        label: '社会'
                    }, {
                        value: 4,
                        label: '语言'
                    }, {
                        value: 5,
                        label: '艺术'
                    }]
                }],
                value7: '',
                base64s:[],
                images: [],
                columnsnumber:10,
                dirdata:'static/images/classroom/',
                imageUrls: [],
                assistImageurls: [],
                /*editorOption: {
                    theme: 'snow',
                    placeholder: "输入任何内容，支持html",
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'align': [] }],
                            ['link', 'image','video'],
                            ['clean']
                        ]
                    }
                }*/
            }
        },
        props:{
            successaide:Object,
        },
        methods:{
            /*onEditorBlur(editor) {
                console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            },
            onEditorChange({ editor, html, text }) {
                // console.log('editor change!', editor, html, text)
                this.content = html
            },*/
            doCancel:function () {
                document.querySelector(".modal-close").click()
            },
            test () {
                var vm = this
                console.log(vm.message)
            },
            addPic () {
                $('input[type=file]').trigger('click')
                return false
            },
            onFileChange (e) {
                var files = e.target.files || e.dataTransfer.files
                if (!files.length) return
                this.createImage(files)
            },
            createImage (file) {
                var vm = this
                var reader = null
                var leng = file.length
                for (var i = 0; i < leng; i++) {
                    reader = new window.FileReader()
                    reader.readAsDataURL(file[i])
                    reader.onload = function (e) {
                        vm.images.push(e.target.result)
                    }
                }
                console.log(this.images)
            },
            delImage: function (index) {
                this.images.splice(index,1)
                console.log(this.images.length);
            },


            getBase64Image:function(img) {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, img.width, img.height);
                var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
                var dataURL = canvas.toDataURL("image/"+ext);
                return dataURL;
            },
            removeBrackets:function (val) {
                if(val.length < 1){
                    return ""
                }
                var s = ""
                for (var i = 0; i < val.length; i++) {
                    s += val[i] + ","
                }
                console.log(s)
                return s.substring(0,s.length -1)
            },
            NewAdd:function(){
                this.content = contents
                console.log(this.content)
                var arr=[];
                for (var i = 0; i < this.imageUrls.length; i++) {
                    var str = this.imageUrls[i];
                    var index = str.lastIndexOf("\/");
                    str  = str.substring(index + 1, str.length);
                    arr.push(str);
                }
                this.assistImageurls = arr;
                if(this.Thetitle.trim() == ""){
                    this.$notify({title: '提示',message: '课堂标题不能为空',type: 'warning'});
                    return
                }
                if(this.value7 == ''){
                    this.$notify({title: '提示',message: '请选择类别',type: 'warning'});
                    return
                }
                var nesImgs = this.removeBrackets(this.assistImageurls);
                var url          = 'classroomAssist/insert'
                var reqData      = {}
                reqData.title    = this.Thetitle
                reqData.content  = this.content
                reqData.type = this.value7;
                reqData.imgs = nesImgs

                this.$http.post(url, reqData).then(function (res){
                    if(res.body.code == '200'){
                        this.$notify({title: '成功',message: '新建课堂成功',type: 'success'});
                        this.doCancel();
                        this.successaide();
                    }
                })
            },
            getsts:function () {
                upload.get_signature(function (data) {
                    console.log("JSON signature \n" + JSON.stringify(data))
                })
            }
        },
        mounted () {
            require(['../../config/wangEditor.js'], function (E) {
                var editor = new E('#editor')
                editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
                editor.customConfig.onchange = function (html) {
                    // html 即变化之后的内容
                    contents = editor.txt.html()
                    console.log(html)
                }
                editor.create()
            })
        },
        components:{
            'box-modal':BoxModal,
            /*'quillEditor':quillEditor,*/
            'ali-upload':aliUpload,
        }
    }
</script>
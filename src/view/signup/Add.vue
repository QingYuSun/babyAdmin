<template>
    <box-modal :title="title" :visible="true" transition="roll">
        <div class="edit-wrp">
             <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label">标题:</label>
                </div>
                <div class="control is-grouped by-is-grouped">
                    <p class="control is-expanded">
                        <input name="device" v-model="Thetitle" class="input" type="text" placeholder="报名标题">
                    </p>
                </div>
            </div>
            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label">内容:</label>
                </div>
                <div class="control">
                    <!-- <div class="edit-box"> -->
                    <div id="editor" v-model="content"></div>
                        <!-- <quill-editor ref="myTextEditor"
                                      v-model="content"
                                      :config="editorOption"
                                      @blur="onEditorBlur($event)"
                                      @focus="onEditorFocus($event)"
                                      @ready="onEditorReady($event)"
                        >
                        </quill-editor> -->
                    <!-- </div> -->
                </div>
            </div>
            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label">时间:</label>
                </div>
                <div class="control is-grouped by-is-grouped">
                    <p class="control is-expanded">
                        <input name="name" v-model="newtime" type="date" class="input" placeholder="截止时间"></input>
                    </p>
                </div>
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
                    min-height: 10em;
                    padding-bottom: 1em;
                    max-height: 15em;
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
            white-space: nowrap;
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
        top: 0;*/
        display: box;
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
    .newminus{
        line-height: 30px;
    }
    .newminus input{
        margin: 0 5px;
        width: 40px;
        text-align: center;
    }
    #editor {
        margin: auto;
        width: 100%;
    }
    #editor  li{
        list-style: inherit !important;
    }
    .by-is-grouped{
        flex-grow: 8.2 !important;
    }
    @media screen and (max-height: 590px) {
      .by-is-grouped{
        flex-grow: 11 !important;
    } }
</style>
<script>
    var contents = ''
    import BoxModal from '../Com/BoxModal.vue';
    /*import { quillEditor } from 'vue-quill-editor'*/
    import auth from '../../js/auth'

    export default{
        name:'newMsg',
        data(){
            return{
                title:'新建报名',
                msg:'hello vue',
                Thetitle:'',
                note:'',
                content: '输入任何内容，支持html',
                value7: '',
                images: [],
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
                },*/
                smallclass:0,
                centreclass:0,
                bigclass:0,
                newtime:''
            }
        },
        props:{
            callbacklist:Object,
        },
        created:function () {
            var d1 = new Date();
            this.newtime = moment(d1).format('YYYY-MM-DD');
            console.log(d1);
            console.log(this.newtime);

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
            NewAdd:function(){
                this.content = contents
                console.log(this.content)
                let that         = this
                var url          = 'registerManage/plan/insert'
                var reqData      = {}
                    reqData.name = that.Thetitle
                    reqData.content = that.content
                    reqData.endTime = that.newtime

                that.$http.post(url, reqData).then(function (res){
                    if(res.body.code == '200'){
                        that.doCancel();
                        this.callbacklist();
                    }
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
            /*'quillEditor':quillEditor*/
        }
    }
</script>


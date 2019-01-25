<template>
    <box-modal :title="title" :visible="true" transition="roll">
        <div class="msg-wrp">
            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label">标题:</label>
                </div>
                <div class="control is-grouped">
                    <p class="control is-expanded">
                        <input name="device" v-model="Thetitle" class="input" type="text" placeholder="标题">
                    </p>
                </div>
            </div>
            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label">添加链接:</label>
                </div>
                <div class="control is-grouped">
                    <p class="control is-expanded">
                        <input name="device" v-model="interlinkage" class="input" type="text" placeholder="链接">
                    </p>
                </div>
            </div>
            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label"></label>
                </div>
                <div style="margin-bottom: 10px;" class="control is-grouped">
                    <p class="control is-expanded">
                        <span style="color: #666;">只能分享成功声明原创的微信文章链接</span>
                    </p>
                </div>
            </div>
            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label">添加封面:</label>
                </div>
                <div class="control">
                    <div class="is-fullwidth newuploadimg">
                        <!-- <input type="file"> -->
                        <input type="file" name="file" id="index" class="bytext-file" @change="FileChange"/> 
                        <label for="index">上传图片</label>
                    </div>
                </div>
            </div>
            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label"></label>
                </div>
                <div class="control is-grouped">
                    <p class="control is-expanded newportrait">
                        <img :src="bgimgUrl">
                    </p>
                </div>
            </div>
            <div class="button-group">
                <div class="control pull-left">
                    <button @click="doCancel" type="submit" class="button is-cancel">取消</button>
                </div>
                <div class="control pull-right">
                    <button type="submit" @click="submitAdd" class="button is-primary">提交</button>
                </div>
            </div>
        </div>
    </box-modal>
</template>
<style type="text/css">
    .bytext-file{
        display: none;
    }
    .newportrait{
        display: inline-table;
        width: 15em;
        height: 8em;
        background-image: url(../../assets/upload.png);
        background-size: 100% 100%;
    }
    .newportrait img{
        width: 100%;
        height: 100%;
    }
    .newuploadimg input{
        display: none;
    }
    .newuploadimg label{
        display: block;
        width: 80px;
        text-align: center;
        line-height: 25px;
        background-color: #f8b62d;
        color: #fff;
    }
</style>
<script>
    import BoxModal from '../Com/BoxModal.vue'
    import { quillEditor } from 'vue-quill-editor'
    import aliUpload from '../Com/AliOssUpload.vue'

    export default{
        name:'newMsg',
        data(){
            return{

                region:'cn-hangzhou',
                bucket:'hellobaobei',
                endpoint:'oss-cn-shanghai.aliyuncs.com',
                imgUrl:{},
                bgimgUrl:{},
                deleteIndex:-1,
                showMask:false,
                showLoading:false,
                upLoading:false,
                showAddFlag:true,
                fileType: ["jpg","png","bmp","jpeg",'gif'],   // 上传文件的类型
                fileSize: 1024 * 1024 * 10,                  // 上传文件的大小 10M

                msg:'hello vue',
                title:'新建分享图文',
                Thetitle:'',
                interlinkage: '',
                bgimgUrl: [],
            }
        },
        props:{
            successtextadd:Object,
            columns:{
                type: Number,
                default: 3
            },
            dir:{
                type:String,
                default:'static/images/info/'
            },
            bjdir:{
                type:String,
                default:'static/images/schoolBackGroundImg/'
            },
            items:{
                type:Array,
                default:[]
            },
        },
        methods:{
            doCancel:function () {
                document.querySelector(".modal-close").click();
            },
            submitAdd:function(){
                if(this.Thetitle.trim() == ""){
                    this.$notify({title: '提示',message: '资讯标题不能为空',type: 'warning'});
                    return
                }

                /*var nesImgs = this.removeBrackets(this.assistImageurls);*/
                var url          = 'tInfo/insertOtherInfoJson'
                var reqData      = {}
                reqData.title    = this.Thetitle
                reqData.detailsUrl  = this.interlinkage
                reqData.imgs = this.bgimgUrl

                this.$http.post(url, reqData).then(function (res){
                    if(res.body.code == '200'){
                        this.$notify({title: '成功',message: '新建资讯成功',type: 'success'});
                        this.successtextadd();
                        this.doCancel();
                    }
                })
            },
            FileChange (e) {
              var n =  1
              var files = e.target.files || e.dataTransfer.files
              if (!files.length) return
              this.textImage(files)
            },
            /*createImage (file) {
              var vm = this
              var reader = null
              var leng = file.length
              for (var i = 0; i < leng; i++) {
                reader = new window.FileReader()
                reader.readAsDataURL(file[i])
                reader.onload = function (e) {
                  vm.bgimgUrl = e.target.result
                }
              }
            },*/
            textImage:function (files) {
//                console.log("guid" + this.guid())
//                return
               //var fileDocu = document.getElementById("file");
                var fileList = files; //获取的图片文件


                var numUp = this.items.length;
                var totalNum = numUp + fileList.length;  //总的数量
                if(fileList.length > this.columns || totalNum > this.columns ){
                    alert("上传图片数目不可以超过" + this.columns +　"个，请重新选择");  //一次选择上传超过5个 或者是已经上传和这次上传的到的总数也不可以超过5个
                }
                else if(numUp < this.columns){
                    this.showLoading = true
                    this.upLoading = true
                    fileList = this.validateUp(fileList);
                    //console.log("validateUp finish")

                    const _this = this;
                    //babyAdminServer/
                    _this.$http.get('ali/sts').then((response) => {

                        const result = response.body.data
                        //console.log(result)

                        const client = new OSS.Wrapper({
                            // region:_this.region,
                            endpoint: _this.endpoint,
                            accessKeyId: result.accessKeyId,
                            accessKeySecret: result.accessKeySecret,
                            stsToken: result.securityToken,
                            bucket: _this.bucket
                        })
                        for(var i = 0;i<fileList.length;i++){
                            var file = fileList[i]
                            const storeAs = _this.bjdir + _this.guid() + _this.get_suffix(file.name);
                            client.multipartUpload(storeAs, file).then(function (result) {

                                /*var str = result.name;
                                var index = str .lastIndexOf("\/");  
                                str  = str .substring(index + 1, str .length);
                                _this.bgImageurlname = str*/
                                var bgimgUrl =　"http://" +  _this.bucket + "." + _this.endpoint + "/" + result.name;
//                                var item = {"src":imgUrl}
                                _this.bgimgUrl = bgimgUrl
                                console.log(_this.imgUrl);
                            }).catch(function (err) {
                                //console.log(err);
                            });
                        }
//                        this.showLoading = false
                        this.upLoading = false
                    })

/*

                    for(var i = 0;i<fileList.length;i++){
                        var imgUrl = window.URL.createObjectURL(fileList[i]);
                        var item = {"src":imgUrl, "name":fileList[i].name}
                        this.items.push(item)

                    }
*/


                }

            },
            validateUp:function(files){
                console.log("validateUp  start" )
                var arrFiles = [];//替换的文件数组
                for(var i = 0, file; file = files[i]; i++){
                    //获取文件上传的后缀名
                    var newStr = file.name.split("").reverse().join("");
                    if(newStr.split(".")[0] != null){
                        var type = newStr.split(".")[0].split("").reverse().join("");
                        console.log(type+"===type===");
                        if(this.inArray(type, this.fileType) > -1){
                            // 类型符合，可以上传
                            if (file.size >= this.fileSize) {
                                // alert(file.size);
                                alert('您这个"'+ file.name +'"文件大小过大');
                            } else {
                                // 在这里需要判断当前所有文件中
                                arrFiles.push(file);
                            }
                        }else{
                            alert('您这个"'+ file.name +'"上传类型不符合');
                        }
                    }else{
                        alert('您这个"'+ file.name +'"没有类型, 无法识别');
                    }
                }
                console.log("validateUp  end" )
                return arrFiles;
            },
            inArray:function (search,arr) {
                var str = arr.toString();
                return str.indexOf(search)
            },
            guid:function () {
                function S4() {
                    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
                }
                return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
            },
            get_suffix(filename){
                var pos = filename.lastIndexOf(".")
                var suffix = ''
                if(pos != -1){
                    suffix = filename.substring(pos)
                }
                return suffix
            },
        },
        components:{
            'box-modal':BoxModal,
            'quillEditor':quillEditor,
            'ali-upload':aliUpload,
        }
    }
</script>

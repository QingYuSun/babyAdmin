<template>
    <box-modal :title="title" :visible="true" transition="roll">

        <div class="img-box full">
            <section class=" img-section">
                <div class="z_photo upimg-div clear">
                    <section class="up-section fl" :class="{ loading:showLoading }" v-for="(item,index) in items">
                        <span class="up-span"></span>
                        <img src="../../assets/img/a7.png" class="close-upimg" @click="delPic(index)">
                        <!-- <img src="/img/buyerCenter/3c.png" class="type-upimg" alt="添加标签"> -->
                        <img :src="item" class="up-img">
                        <!--<p class="img-name-p">{{item.name}}</p>-->
                        <input id="taglocation" name="taglocation" value="" type="hidden">
                        <input id="tags" name="tags" value="" type="hidden">
                    </section>
                    <section class="z_file fl" :class="{ loading:upLoading }" v-if="showAdd">
                        <img src="../../assets/img/a12.png" class="add-img">
                        <input type="file" name="file" id="file" class="file" value="" :disabled="upLoading"
                               accept="image/jpg,image/jpeg,image/png,image/bmp" multiple="" @change="onFileChange" >
                    </section>
                </div>
            </section>
        </div>
        <aside class="mask works-mask" v-if="showMask">
            <div class="mask-content">
                <p class="del-p ">您确定要删除作品图片吗？</p>
                <p class="check-p"><span class="del-com wsdel-ok" @click="confirmDelPic">确定</span><span class="wsdel-no" @click="cancel">取消</span></p>
            </div>
        </aside>

    </box-modal>
</template>


<script>
    export default{
        name:'ali-upload',
        props:{
            columns:{
                type: Number,
                default: 3
            },
            dir:{
                type:String,
                default:'static/images/test/'
            },
            items:{
                type:Array,
                default:[]
            },
        },
        data(){
            return{
                region:'cn-hangzhou',
                bucket:'hellobaobei',
                endpoint:'oss-cn-shanghai.aliyuncs.com',
                imgUrl:[],
                deleteIndex:-1,
                showMask:false,
                showLoading:false,
                upLoading:false,
                showAddFlag:true,
                fileType: ["jpg","png","bmp","jpeg",'gif'],   // 上传文件的类型
                fileSize: 1024 * 1024 * 10,                  // 上传文件的大小 10M
            };
        },
        computed:{
            showAdd:function () {
                return (this.items.length < this.columns) && this.showAddFlag
            }
        },
        methods:{
            delPic:function (idx) {
                this.deleteIndex = idx
                this.showMask = true

            },
            confirmDelPic:function () {
                this.items.splice(this.deleteIndex, 1);
                this.showMask = false
            },
            cancel:function () {
                this.showMask = false
            },
            onFileChange:function () {
//                console.log("guid" + this.guid())
//                return
                var fileDocu = document.getElementById("file");
                var fileList = fileDocu.files; //获取的图片文件


                var numUp = this.items.length;
                var totalNum = numUp + fileList.length;  //总的数量
                if(fileList.length > this.columns || totalNum > this.columns ){
                    alert("上传图片数目不可以超过" + this.columns +　"个，请重新选择");  //一次选择上传超过5个 或者是已经上传和这次上传的到的总数也不可以超过5个
                }
                else if(numUp < this.columns){
                    this.showLoading = true
                    this.upLoading = true
                    fileList = this.validateUp(fileList);
                    console.log("validateUp finish")

                    const _this = this;
                    //babyAdminServer/
                    _this.$http.get('ali/sts').then((response) => {

                        const result = response.body.data
                        console.log(result)

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
                            const storeAs = _this.dir + _this.guid() + _this.get_suffix(file.name);
                            client.multipartUpload(storeAs, file).then(function (result) {
                                console.log(result);
                                var imgUrl =　"http://" +  _this.bucket + "." + _this.endpoint + "/" + result.name;

//                                var item = {"src":imgUrl}
                                _this.items.push(imgUrl)
                            }).catch(function (err) {
                                console.log(err);
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

    };
</script>

<style type="text/css">
    /*上传图片插件的样式*/
    .img-box{
        margin-top: 40px;
    }
    .img-box .up-p{
        margin-bottom: 20px;
        font-size: 16px;
        color: #555;
    }
    .z_photo{
        padding-top: 3px;
        /*padding-right: 18px;*/
        padding-bottom: 3px;
        padding-left: 3px;
        /*border:2px dashed #E7E6E6;*/
    }
    .z_photo .z_file{
        position: relative;
    }
    .z_file  .file{
        width: 100%;
        height: 100%;
        opacity: 0;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 100;
    }
    .z_photo .up-section{
        position: relative;
        margin-right: 10px;
        /*margin-bottom: 20px;*/
    }
    .up-section .close-upimg{
        position: absolute;
        top: 6px;
        right: 8px;
        display: none;
        z-index: 10;
    }
    .up-section .up-span{
        display: block;
        width: 100%;
        height: 100%;
        visibility: hidden;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 9;
        background: rgba(0,0,0,.5);
    }

    .up-section:hover .close-upimg{
        display: block;
    }
    .up-section:hover .up-span{
        visibility: visible;
    }
    .z_photo .up-img{
        display: block;
        width: 100%;
        height: 100%;
    }

    .up-opcity{
        opacity: 0;
    }
    .img-name-p{
        display: none;
    }
    .upimg-div .up-section {
        width: 180px;
        height: 160px;
    }
    .img-box .upimg-div .z_file {
        width: 180px;
        height: 160px;
    }
    .z_file .add-img {
        display: block;
        width: 180px;
        height: 160px;
    }
    /*遮罩层样式*/
    .mask{
        z-index: 10000000;
        /*display: none;*/
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.4);
    }
    .mask .mask-content{
        width: 500px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -250px;
        margin-top: -80px;
        background: white;
        height: 160px;
        text-align: center;
    }
    .mask .mask-content .del-p{
        color: #555;
        height: 94px;
        line-height: 94px;
        font-size: 18px;
        border-bottom: 1px solid #D1D1D1;
    }
    .mask-content .check-p{
        height: 66px;
        line-height: 66px;
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
    }
    .mask-content .check-p span{
        width: 49%;
        display:inline-block;
        text-align: center;
        color:#d4361d ;
        font-size: 18px;
    }
    .check-p .del-com{
        border-right: 1px solid #D1D1D1;
    }


    .clear {
        clear: both;
    }
    .full{
        width: 586px;
        min-width: 586px;
        margin: 0 auto;
    }
    ::-webkit-input-placeholder {
        color: #777;
        font-size: 14px;
    }
    :-moz-placeholder {
        /* Firefox 18- */
        color: #777;
        font-size: 14px;
    }
    ::-moz-placeholder {
        /* Firefox 19+ */
        color: #777;
        font-size: 14px;
    }
    :-ms-input-placeholder {
        color:#777;
        font-size: 14px;
    }
    /* ====clear float====== */
    /*nav a:visited{color: rgb(65,65,65);}
    aside a:visited{color: rgb(65,65,65);}*/
    .fl {
        float: left;
    }
    .fr {
        float: right;
    }
    .clear:after {
        content: '';
        display: block;
        clear: both;
    }
    /* reset */
    p{
        margin: 0;
        padding: 0;
    }

</style>

<template>
    <div class="account-set">
        <expand-box :title="title">
            <div slot="body">
                <div class="box-body no-padding">
                    <div class="columns">
                        <div class="column is-6 is-parent">
                            <div class="info-wrp">
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">公司ID:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <!-- <p class="control control-label">
                                            <span>{{school.schoolId}}</span>
                                        </p> -->
                                        <p class="control is-expanded">
                                            <input class="input" v-model="company.companyId" type="text" placeholder="" value="1">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">Logo:</label>
                                    </div>
                                    <div class="control">
                                        <div class="is-fullwidth newuploadimg" v-if="!image">
                                            <!-- <input type="file"> -->
                                            <input type="file" name="file" id="index" class="file" @change="onFileChange"/> 
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
                                            <img :src="imgUrl">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label star">
                                        <label class="label"><i>*</i>名称:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" v-model="company.companyName" type="text" placeholder="">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label star">
                                        <label class="label"><i>*</i>电话:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" v-model="company.companyPhone" type="text" placeholder="">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">所在地区:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <!-- <p class="control is-expanded">
                                            <input class="input" v-model="company.region" type="text" placeholder="所在地区">
                                        </p> -->
                                        <select v-model="selectedRegion" class="by-setcity">
                                            <option v-for="region in regions " :value="region.code">
                                                {{region.name}}
                                            </option>
                                        </select>
                                        <select v-model="street" class="by-setcity">
                                            <option v-for="item in towns " :value="item.code">
                                                {{item.name}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label star">
                                        <label class="label"><i>*</i>地址:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" v-model="company.companyAddress" type="text" placeholder="">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">邮编:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" v-model="company.zipCode" type="text" placeholder="">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">传真:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" v-model="company.fax" type="text" placeholder="">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">网站:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" v-model="company.webUrl" type="text" placeholder="">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">成立时间:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" v-model="company.foundingTime" type="text" placeholder="">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">公司简介:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <!-- <input class="input" v-model="school.foundingTime" type="text" placeholder="成立时间"> -->
                                            <textarea class="textbox" v-model="company.introduction"></textarea>
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">公司图片:</label>
                                    </div>
                                    <div class="control">
                                        <div class="is-fullwidth newuploadimg" v-if="!image">
                                            <!-- <input type="file"> -->
                                            <input type="file" id="imagesChange" class="file" @change="FileChange"/> 
                                            <label for="imagesChange">上传图片</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label"></label>
                                    </div>
                                    <!-- <div class="control is-grouped">
                                        <p v-for="(item,key) in group" class="control is-expanded newportrait">
                                            <img :src="item">
                                        </p>
                                    </div> -->
                                    <div class="control is-grouped">
                                        <p class="control is-expanded newportrait">
                                            <img :src="bgimgUrl">
                                        </p>
                                    </div>
                                </div>
                                <div class="control admin is-horizontal">
                                    <div class="control-label">
                                        <label class="label">管理员:</label>
                                    </div>
                                    <div class="control is-grouped">
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label star">
                                        <label class="label"><i>*</i>姓名:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" v-model="administrator.teacherName" type="text" placeholder="">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label star">
                                        <label class="label"><i>*</i>职位:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" v-model="administrator.position" type="text" placeholder="">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label star">
                                        <label class="label"><i>*</i>电话:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" v-model="administrator.phoneNum" type="text" placeholder="">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label star">
                                        <label class="label"><i>*</i>邮箱:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" v-model="administrator.teacherEmail" type="text" placeholder="">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label"></label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <button @click="doUpdate" class="button btn-primary">保存</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </expand-box>
    </div>
</template>
<style lang="scss">
    @import "../../scss/skins.scss";

    .account-set{
        padding-bottom:4rem;
        .link-edit{
            color: #F8BF48 ;
        }
        .link-delete{
            color: #E83828;
        }
        .table thead th{
            border-width: 0 0 1px;
        }

        .label{
            width: 9rem;
        }

        .controls {
            padding: 10px;

            .btn {
                border-radius: 3px;
                -webkit-box-shadow: none;
                box-shadow: none;
                border: 1px solid transparent;
                margin-right: 1rem;
            }
        }
    }


    .info-wrp{
        margin: 2rem 0 0 1rem;
        .label{
            font-weight: normal;
        }
        .admin{
            margin-top: 2rem;
        }
    }

    .table-striped>tbody>tr:nth-of-type(odd) {
        background-color: #f9f9f9;
    }
    .table>thead>tr>th, .table>tbody>tr>th, .table>tfoot>tr>th, .table>thead>tr>td, .table>tbody>tr>td, .table>tfoot>tr>td {
        border-top: 1px solid #f4f4f4;
    }
    .table{
        margin-bottom: 0;
    }
    .table td{
        padding: 20px 10px;
    }
    .mailbox-messages{
        .fa{
            vertical-align: middle;
        }
        a {
            color: #3c8dbc;
        }
    }
    .star i{
        color: red;
        padding: 0 0.3rem;
    }
    .newman{
        line-height: 30px;
        margin-right: 5em;
    }
    .newman label{
        margin-right: 1em;
    }
    .newman input{
        margin-right: 0.8em;
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
    .newportrait{
        width: 13em;
        display: inline-table;
        height: 13em;
    }
    .newportrait img{
        width: 100%;
        height: 100%;
    }
    .textbox{
        -webkit-appearance: none;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-color: #fff;
        border: 1px solid #dbdbdb;
        border-radius: 3px;
        color: #363636;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        font-size: 14px;
        height: 50px;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        line-height: 24px;
        padding-left: 8px;
        padding-right: 8px;
        position: relative;
        vertical-align: top;
        box-shadow: inset 0 1px 2px rgba(10,10,10,.1);
        width: 100%;
    }
    .by-setcity{
        width: 15%;
        margin-right: 10px;
    }
</style>
<script>
    import ExpandBox from '../Com/ExpandBox.vue'
    import auth from '../../js/auth'


    let company = {}
    let administrator = {}
    export default{
        name:'ali-upload',
        props:{
            columns:{
                type: Number,
                default: 3
            },
            dir:{
                type:String,
                default:'static/images/schoolHead/'
            },
            bjdir:{
                type:String,
                default:'static/images/tcompany/'
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
                title:'校园设置',
                company:company,
                administrator:administrator,
                images:{},
                headImageurlname:'',
                bgImageurlname:'',

                towns:[],
                regions:[],
                selectedRegion:'',
                defaultCity:'331000',
                streets:'',
                street:'331024200',
                chus:0
/*                schoolimages:[],
                toschoolimages:[]*/
            }
        },
        created:function(){
            /*this.city();*/

            var self = this
            setTimeout(function () {
                console.log('公司设置')
                self.city();
            }, 100);
        },
         computed:{
            showAdd:function () {
                return (this.items.length < this.columns) && this.showAddFlag
            }
        },
        watch:{
            selectedRegion:function () {
                this.getTowns();
            },
            street:function(){
                console.log(this.street)
            }
        },
        methods:{
            onFileChange (e) {
              var files = e.target.files || e.dataTransfer.files
              if (!files.length) return
              this.onFile(files)
            },
            getTowns: function(){
                // this.$store.commit('TREE_SELECT',0)
                let that    = this
                let url     = 'tarea/selectAreas'
                var reqData     = {
                    code:this.selectedRegion
                };

                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        that.towns   = data[0].data
                        if (that.chus==0) {
                            that.chus++
                            that.street = that.streets
                        }else{
                            that.street   = that.towns[0].code
                        }
                        
                    }
                },function(res){
                    // 响应错误回调
                    console.log("/tarea/selectAreas   error")
                });
            },
            city(){
                // this.$store.commit('TREE_SELECT',0)
                let that    = this
                let url     = 'tarea/selectAreas'
                var reqData     = {
                    code:this.defaultCity
                };

                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        var city    = res.body.data;
                        if(typeof city != 'undefined' && city.length > 0){
                            this.regions   = city[0].data
                            this.beforeRouteEnter();

                        }else {
                            this.$notify({title: '提示',message: '区域数据获取失败请重新刷新',type: 'info'});
                        }

                    }

                },function(res){
                    // 响应错误回调
                    console.log("/tarea/selectAreas   error")
                });
            },
            createImage (file) {
              var vm = this
              var reader = null
              var leng = file.length
              for (var i = 0; i < leng; i++) {
                reader = new window.FileReader()
                reader.readAsDataURL(file[i])
                reader.onload = function (e) {
                  vm.school.headImageurl = e.target.result
                }
              }
              console.log(this.images)
            },
            FileChange (e) {
              var n =  1
              var files = e.target.files || e.dataTransfer.files
              if (!files.length) return
              this.onFile(files,n)
            },
            schoolImage (file) {
              /*var vm = this
              var reader = null
              var leng = file.length
              for (var i = 0; i < leng; i++) {
                reader = new window.FileReader()
                reader.readAsDataURL(file[i])
                reader.onload = function (e) {
                  vm.schoolimages.push(e.target.result)
                }
              }
              this.change();
              console.log(JSON.stringify(this.schoolimages));*/
              var vm = this
              var reader = null
              var leng = file.length
              for (var i = 0; i < leng; i++) {
                reader = new window.FileReader()
                reader.readAsDataURL(file[i])
                reader.onload = function (e) {
                  vm.school.bgImageurl = e.target.result
                }
              }
              console.log(vm.school.bgImageurl)
            },
            sexFormat:function (val) {
                let res = 1 == val ? '男' :'女'
                return res
            },
            change:function () {
                var arr1 = this.schoolimages
                console.log(arr1.length);
                console.log(JSON.stringify(arr1));
                var arr2 = [];
                var k=0;
                for ( var i = 0; i < arr1.length/3; i++) {
                    arr2[i] = arr2[i] || [];
                    for ( var j = 0; j < 3; j++) {
                        if (arr1[k]) {
                            arr2[i][j] = arr1[k];
                            k++
                        }
                    }
                }
                this.toschoolimages = arr2

            },
            doUpdate:function () {
                var url         = 'tcompany/updateCompany'
                let company      = this.company
                if (company.companyName == '') {
                    alert('公司名称不能为空');
                    return;
                }
                var companyPhoneMobile = company.companyPhone
                if(!(/^1[34578]\d{9}$/.test(companyPhoneMobile))){
                    alert("不是完整的11位手机号或者正确的手机号前七位"); 
                    return;
                }
                if (company.companyAddress == '') {
                    alert('请填写公司地址');
                    return;
                }
                if (administrator.teacherName == '') {
                    alert('请填写管理员姓名');
                    return;
                }
                if (administrator.position == '') {
                    alert('请填写管理员职位');
                    return;
                }
                var adminphoneNumMobile = administrator.phoneNum
                if(!(/^1[34578]\d{9}$/.test(adminphoneNumMobile))){
                    alert("管理员手机不是完整的11位手机号或者正确的手机号前七位"); 
                    return;
                }
                if (administrator.teacherEmail == '') {
                    alert('请填写管理员邮箱');
                    return;
                }
                let administrator       = this.administrator
                var formData = new FormData();
                formData.append('companyId',company.companyId)
                formData.append('companyName',company.companyName)
                formData.append('companyAddress',company.companyAddress)
                formData.append('companyPhone',company.companyPhone)
                formData.append('zipCode',company.zipCode)
                formData.append('fax',company.fax)
                formData.append('webUrl',company.webUrl)
                formData.append('foundingTime',company.foundingTime)
                formData.append('region',this.street)
                formData.append('headImageurl',this.headImageurlname)
                formData.append('teacherId',administrator.teacherId)
                formData.append('name',administrator.teacherName)
                formData.append('position',administrator.position)
                formData.append('phoneNum',administrator.phoneNum)
                formData.append('email',administrator.teacherEmail)
                formData.append('bgImageurl',this.bgImageurlname)
                formData.append('introduction',company.introduction)
                this.$http.post(url, formData,{emulateHTTP:true,emulateJSON:false}).then(function (res){
//                  console.log(res.body);
                    if(res.body.msg.toUpperCase() == 'OK'){
                        this.$notify({title: '成功',message: '信息修改成功',type: 'success'});
                    }

                })
            },
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
            onFile:function (files,num) {
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
                        if (num == 1) {
                            for(var i = 0;i<fileList.length;i++){
                                var file = fileList[i]
                                const storeAs = _this.bjdir + _this.guid() + _this.get_suffix(file.name);
                                client.multipartUpload(storeAs, file).then(function (result) {
                                    console.log('pp');
                                    console.log(result);
                                    var str = result.name;
                                    var index = str .lastIndexOf("\/");  
                                    str  = str .substring(index + 1, str .length);
                                    _this.bgImageurlname = str
                                    var bgimgUrl =　"http://" +  _this.bucket + "." + _this.endpoint + "/" + result.name;
    //                                var item = {"src":imgUrl}
                                    _this.bgimgUrl = bgimgUrl
                                    console.log(_this.imgUrl);
                                }).catch(function (err) {
                                    //console.log(err);
                                });
                            }
                        }else{
                            for(var i = 0;i<fileList.length;i++){
                                var file = fileList[i]
                                const storeAs = _this.dir + _this.guid() + _this.get_suffix(file.name);
                                client.multipartUpload(storeAs, file).then(function (result) {
                                    console.log('pp');
                                    console.log(result);
                                    var str = result.name;
                                    var index = str .lastIndexOf("\/");  
                                    str  = str .substring(index + 1, str .length);
                                    _this.headImageurlname = str
                                    var imgUrl =　"http://" +  _this.bucket + "." + _this.endpoint + "/" + result.name;
    //                                var item = {"src":imgUrl}
                                    _this.imgUrl = imgUrl
                                    console.log(_this.imgUrl);
                                }).catch(function (err) {
                                    //console.log(err);
                                });
                            }
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
            beforeRouteEnter (to, from, next) {
                let vm = this
                let url     = 'tcompany/selectCompany'
                var reqData     = {
                    companyId:auth.getSchoolId()
                };
                console.log('tt',Vue)
                Vue.http.post(url,reqData).then(function (res) {
                    if(res.body.msg.toUpperCase() == "OK") {
                        let company          = res.body.data.company
                        company.foundingTime = moment(company.foundingTime).format("YYYY-MM-DD")
                        vm.company           = company
                        vm.administrator     = res.body.data.administrator
                        vm.imgUrl  = `http://hellobaobei.oss-cn-shanghai.aliyuncs.com/static/images/schoolHead/${res.body.data.company.headImageurl}`
                        vm.bgimgUrl  = `http://hellobaobei.oss-cn-shanghai.aliyuncs.com/static/images/tcompany/${res.body.data.company.bgImageurl}`
                        vm.headImageurlname = res.body.data.company.headImageurl
                        vm.bgImageurlname = res.body.data.company.bgImageurl
                        vm.streets = res.body.data.company.region
                        vm.selectedRegion = res.body.data.company.region.substr(0,6)
                    }else{
                        next()
                    }

                },function(res){
                    console.log('222')
                    next()
                    // 响应错误回调
                });
            },
        },
        components:{
            'expand-box':ExpandBox
        },
        beforeCreate:function () {
//            console.log(this.$router)
//            let url     = '/tschool/selectSchool'
//            let reqData = {
//                schoolId:1
//            }
//            let that = this
//            that.$http.post(url, reqData).then((response) => {
//                if('OK' == response.body.msg.toUpperCase()){
//                    that.school = response.body.school
//                }
//            });
        },

    }
</script>


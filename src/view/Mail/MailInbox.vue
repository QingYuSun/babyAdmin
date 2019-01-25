<template>
    <expand-box :title="title">
        <div slot="body">
            <div class="box-body no-padding">
                <div class="mailbox-controls" v-if="this.selectedMail.index > 30 && cutword == 0">
                    <!-- Check all button -->
                    <!-- /.btn-group -->
                    <button type="button" @click="renovate" class="btn btn-default btn-sm" ><i class="fa fa-refresh"></i></button>
                    <div class="has-feedback">
                        <input type="text" class="form-control" placeholder="搜索邮件" v-model="word">
                        <span class="form-control-feedback"></span>
                    </div>
                    <div class="pull-right">
                        <span v-if="sumpage.total > 14" class="pages-controls">{{firstCPages}}-{{lastCPages}}/{{sumpage.total}}</span>
                        <span v-if="sumpage.total <= 14" class="pages-controls">{{firstCPages}}-{{sumpage.total}}/{{sumpage.total}}</span>
                        <span v-else class="pages-controls"></span>
                        <div class="btn-group">
                            <button type="button" @click="subtract" class="btn btn-default btn-sm"><i class="fa fa-chevron-left"></i></button>
                            <button type="button" @click="adds" class="btn btn-default btn-sm"><i class="fa fa-chevron-right"></i></button>
                        </div>
                        <!-- /.btn-group -->
                    </div>
                    <!-- /.pull-right -->
                </div>
                <div class="mailbox-controls" v-if="this.selectedMail.index < 30 && cutword == 0">
                    <!-- Check all button -->
                    <button v-model="checkAll" @click="handleCheckAll" class="btn btn-default btn-sm checkbox-toggle"><i class="fa fa-square-o"></i>
                    </button>
                    <button type="button" @click="editmain" class="btn btn-default btn-sm"><i class="fa fa-trash-o"></i></button>
                        <!-- <button type="button" class="btn btn-default btn-sm"><i class="fa fa-reply"></i></button>
                        <button type="button" class="btn btn-default btn-sm"><i class="fa fa-share"></i></button> -->
                    <!-- /.btn-group -->
                    <button type="button" @click="renovate" class="btn btn-default btn-sm"><i class="fa fa-refresh"></i></button>
                    <div class="pull-right">
                        <span v-if="sumpage.total > 14" class="pages-controls">{{firstCPages}}-{{lastCPages}}/{{sumpage.total}}</span>
                        <span v-if="sumpage.total <= 14" class="pages-controls">{{firstCPages}}-{{sumpage.total}}/{{sumpage.total}}</span>
                        <span v-else class="pages-controls"></span>

                        <div class="btn-group">
                            <button type="button" @click="subtract" class="btn btn-default btn-sm"><i class="fa fa-chevron-left"></i></button>
                            <button type="button" @click="adds" class="btn btn-default btn-sm"><i class="fa fa-chevron-right"></i></button>
                        </div>
                        <!-- /.btn-group -->
                    </div>
                    <!-- /.pull-right -->
                </div>
                <div class="mailbox-controls" v-if="cutword == 1"">
                    <!-- Check all button -->
                    <button type="button" @click="goback" class="btn btn-default btn-sm"><i class="fa fa-chevron-left"></i></button>
                    <!-- /.btn-group -->
                    <!-- /.pull-right -->
                </div>
                <div class="table-responsive mailbox-messages">
                    <table class="table table-hover table-striped">
                        <thead v-if="cutword == 0">
                            <tr>
                                <th class="two-choose" v-if="this.selectedMail.index == 10"></th>
                                <th :class="{'two-originator':this.selectedMail.index!=10}">发件人</th>
                                <th>标题</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th class="two-time">时间</th>
                            </tr>
                        </thead>
                        <tbody>
                        <!-- <tr>
                            <td v-if="this.selectedMail.index > 30">
                            </td>
                            <td v-else>
                                <div class="icheckbox_flat-blue" aria-checked="false" aria-disabled="false" style="position: relative;">
                                    <input type="checkbox" id="checkbox_a3" class="chk_1" /> 
                                    <label for="checkbox_a3"></label>
                                </div>
                            </td>
                            <td class="mailbox-star">
                                <a href="javascript:void;">
                                    <i class="fa fa-star-o text-yellow"></i>
                                </a>
                            </td>
                            <td class="mailbox-name">
                                <a href="javascript:void;read-mail.html">夏晴</a>
                            </td>
                            <td class="mailbox-subject">
                                <b>哈喽宝贝幼儿园</b>
                                - 哈喽宝贝3.0开始内部测试，暂定上线时间为...

                            </td>
                            <td class="mailbox-attachment"></td>
                            <td class="mailbox-date">28 分钟前</td>
                        </tr> -->
                        <template v-if="cutword == 0" v-for="(item,index) in items">
                            <tr>
                                <!-- <td class="two-choose" >
                                </td> -->
                                <td class="two-choose" v-if="selectedMail.index < 30">
                                    <!-- <div class="icheckbox_flat-blue" aria-checked="false" aria-disabled="false" style="position: relative;">
                                        <input type="checkbox" style="position: absolute; opacity: 0;">
                                        <ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins>
                                    </div> -->
                                    <div class="icheckbox_flat-blue" aria-checked="false" aria-disabled="false" style="position: relative;">
                                        <input type="checkbox" :id="index" class="chk_1" :value="item.messageIds" v-model="checkArr" /> 
                                        <label :for="index"></label>
                                    </div>
                                </td>
                                <!-- <td class="mailbox-star">
                                    <a href="javascript:void;">
                                        <i class="fa fa-star text-yellow"></i>
                                    </a>
                                </td> -->
                                <td class="mailbox-name" v-if="selectedMail.index == 10">
                                    <a class="noline-feed" href="javascript:void;read-mail.html">{{item.sendName}}</a>
                                </td>
                                <td class="mailbox-name two-originator" v-if="selectedMail.index == 40">
                                    <a class="noline-feed" href="javascript:void;read-mail.html">{{item.uName}}</a>
                                </td>
                                <td class="mailbox-name two-originator" v-if="selectedMail.index == 50">
                                    <a class="noline-feed" href="javascript:void;read-mail.html">{{item.teacherName}}</a>
                                </td>
                                <td class="mailbox-name" v-if="selectedMail.index !==40 && selectedMail.index !==50 && selectedMail.index !==10">
                                    <a class="noline-feed" href="javascript:void;read-mail.html">夏晴</a>
                                </td>
                                <td  @click="mainword(index)" class="mailbox-subject">
                                    <span class="flottitle">{{item.title}}</span>
                                    <!-- <span class="flotcontent">- {{item.content}}</span> -->
                                </td>
                                <td class="mailbox-attachment"></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td class="mailbox-date noline-feed two-time">{{ timeAgo(item.sendTime) }}</td>
                            </tr>
                        </template>
                        <template v-if="cutword == 1">
                            <div class="main-word">
                                <dl>
                                    <dt>
                                        <p>{{mainlist.title}}</p>
                                    </dt>
                                    <dd v-if="this.selectedMail.index == 10">
                                        <span>发件人:</span>
                                        <span>{{mainlist.sendName}}</span>
                                    </dd>
                                    <dd v-if="this.selectedMail.index == 40">
                                        <span>发件人:</span>
                                        <span>{{mainlist.uName}}</span>
                                    </dd>
                                    <dd v-if="this.selectedMail.index == 50">
                                        <span>发件人:</span>
                                        <span>{{mainlist.teacherName}}</span>
                                    </dd>
                                    <dd>
                                        <span>时间:</span>
                                        <span>{{mainlist.sendTime}}</span>
                                    </dd>
                                    <dd v-if="this.selectedMail.index == 10">
                                        <span>收件人:</span>
                                        <span>{{mainlist.receiveNames}}</span>
                                    </dd>
                                    <dd v-if="this.selectedMail.index == 40">
                                        <span>收件人:</span>
                                        <span>{{mainlist.teacherName}}</span>
                                    </dd>
                                    <dd v-if="this.selectedMail.index == 50">
                                        <span>收件人:</span>
                                        <span>{{mainlist.classNames}}</span>
                                    </dd>
                                    <dd>
                                        <hr>
                                    </dd>
                                    <dd>
                                        <p>{{mainlist.content}}</p>
                                    </dd>
                                    <!-- <dd>
                                        <span>署名</span>
                                    </dd>
                                    <dd>
                                        <span>联系我们:</span>
                                        <span>用户名xxxxxx@xxxxx.com</span>
                                    </dd>
                                    <dd>
                                        <span>服务热线:</span>
                                        <span>0576-88888888</span>
                                    </dd> -->
                                </dl>
                            </div>
                            <div v-if="lastmain == 0" class="next-main">
                                <span>下一封:</span>
                                <a @click="mainwordlist" >{{mainlistadd.title}}</a>
                            </div>
                            <div v-else class="next-main">
                                <span>最后一封</span>
                            </div>
                        </template>
                        </tbody>
                    </table>
                    <!-- /.table -->
                </div>
                <!-- /.mail-box-messages -->
            </div>
        </div>
    </expand-box>
</template>
<style lang="scss" scoped>
    @import "../../scss/skins.scss";
    .mailbox-controls {
        padding: 8px;
        padding-left: 17px;
        border-bottom: 1px solid #f4f4f4;
        .btn-group{
            position: relative;
            display: inline-block;
            vertical-align: middle;
        }
        .btn {
            border-radius: 3px;
            -webkit-box-shadow: none;
            box-shadow: none;
            border: 1px solid transparent;
        }
        .btn-default {
            background-color: #f4f4f4;
            color: #444;
            border-color: #ddd;
        }
        .btn-sm {
            padding: 5px 10px;
            font-size: 12px;
            line-height: 1.5;
            border-radius: 3px;
        }
        .pages-controls{
            font-size: 12px;
        }
        .fa{
            vertical-align: middle;
        }
    }
    .table-striped>tbody>tr:nth-of-type(odd) {
        background-color: #f9f9f9;
    }
    .table>thead>tr>th, .table>tbody>tr>th, .table>tfoot>tr>th, .table>thead>tr>td, .table>tbody>tr>td, .table>tfoot>tr>td {
        /*border-top: 1px solid #f4f4f4;*/
        border: 1px solid #f4f4f4;
        border-width: 0 0 1px !important;
        
    }
    .table{
        margin-bottom: 0;
    }
    .table td{
        padding: 19px 10px;
    }
    .mailbox-messages{
        .fa{
            vertical-align: middle;
        }
        a {
            color: #000;
        }
    }
    .icheckbox_flat-blue, .iradio_flat-blue {
        /*display: inline-block;
        vertical-align: middle;
        margin: 0;
        padding: 0;
        width: 20px;
        height: 20px;
        background: url(../../assets/blue.png) no-repeat;
        border: none;
        cursor: pointer;*/
    }
    .icheckbox_flat-blue.checked {
        background-position: -22px 0;
    }
    @media only screen and (-webkit-min-device-pixel-ratio: 1.5){
        .icheckbox_flat-blue, .iradio_flat-blue {
            background-image: url(../../assets/blue@2x.png);
            -webkit-background-size: 176px 22px;
            background-size: 176px 22px;
        }
    }
    .icheckbox_flat-blue label{
        /*background-position: 0 0;
        display: inline-block;
        vertical-align: middle;
        margin: 0;
        padding: 0;
        width: 20px;
        height: 20px;
        background: url(../../assets/blue.png) no-repeat; 
        border: none;
        cursor: pointer;*/
    }

    .chk_1 { 
    display: none; 
} 
 
.chk_1 + label { 
    background-position: 0 0;
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    padding: 0;
    width: 20px;
    height: 20px;
    background: url(../../assets/blue.png) no-repeat; 
    border: none;
    cursor: pointer;
} 
.chk_1:checked + label:after {
    background: url(../../assets/blue.png) no-repeat;
    background-position: -22px 0;
    content:"";
    display:inline-block;
    height:100%;
    width:100%;
}
.noline-feed{
    white-space: nowrap;
}
.main-word{
    border-top: 1px solid #ccc;
    padding: 0 15px 20px 15px;
}
.main-word dt{
    margin: 15px 0 5px 0;
    color: #000;
    font-size: 1.1em;
    font-weight: bold;
}
.main-word dd{
    line-height: 20px;
}
.main-word dd span{
    line-height: 20px;
    
}
.main-word dd p{
    line-height: 20px;
    line-height: 20px;
    margin: 15px 0;
    min-height: 15em;
}
.main-word dd hr{
    background-color: #ccc;
}
.next-main{
    padding: 0 15px;
    line-height: 45px;
    border-top: 1px solid #ccc;
    font-size: 1.1em;
    color: #000;
}
.next-main a{
    color: #000;
}
.flottitle{
    float: left;
}
.flotcontent{
    width: 100%;
    float: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 410px;
}
.form-control{
    padding: 5px;
    outline: none;
}
.has-feedback{
    position: relative;
    display: inline-block;
}
.form-control-feedback{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    display: block;
    line-height: 34px;
    text-align: center;
    pointer-events: none;
    width: 30px;
    height: 30px;
    background-image: url(../../assets/ss.png);
    background-size: 100% 100%;
}
.two-choose{
    width: 20px;
    padding-left: 18px !important;
}
.two-time{
    text-align: right;
    padding-right: 20px !important;
}
.two-originator{
    padding-left: 18px !important;
}
</style>
<script>
    let moment = require('moment')
    import ExpandBox from '../Com/ExpandBox.vue'
    import auth from '../../js/auth'
    let lists = [
        {
            id: 1,
            from:'夏晴',
            marked:true,
            checked:true,
            title:'哈喽宝贝幼儿园',
            content:'哈喽宝贝3.0开始真机测试，收集bug进行修复...',
            time:1483081261000

        },
        {
            id: 2,
            from:'夏晴',
            marked:false,
            checked:false,
            title:'哈喽宝贝幼儿园',
            content:'哈喽宝贝3.0开始真机测试，收集bug进行修复...',
            time:1480662061000

        },
        {
            id: 3,
            from:'夏晴',
            marked:false,
            checked:false,
            title:'哈喽宝贝幼儿园',
            content:'哈喽宝贝3.0接口调试基本完成，开始进行联调...',
            time:1480662061000

        },
        {
            id: 4,
            from:'夏晴',
            marked:false,
            checked:false,
            title:'哈喽宝贝幼儿园',
            content:'哈喽宝贝3.0页面开发基本完成，开始调试接口...',
            time:1480662061000

        },
        {
            id: 5,
            from:'夏晴',
            marked:false,
            checked:false,
            title:'哈喽宝贝幼儿园',
            content:'哈喽宝贝3.0UI设计定稿，开发框架搭建基本完成...',
            time:1478761261000

        },
        {
            id: 8,
            from:'夏晴',
            marked:false,
            checked:false,
            title:'哈喽宝贝幼儿园',
            content:'哈喽宝贝3.0需求定稿，开始进行UI设计和开发阶段...',
            time:1478761261000

        },
        {
            id: 7,
            from:'夏晴',
            marked:false,
            checked:false,
            title:'哈喽宝贝幼儿园',
            content:'哈喽宝贝3.0正式立项，深入台州幼儿园进行市场调研...',
            time:1475391661000
        },

    ]
    export default{
        props:{
            selectedMail:Object,
            change:'',
        },
        data(){
            return{
                msg:'hello vue',
                title:'发件箱',
                items:[],         //拉取消息数据
                checkAll: true,  //判断是否全选
                checkArr: [],     //全选数据
                webpage:1,        //初始页数
                firstCPages:1,    //初始第一页到15页
                lastCPages:15,    //初始第一页到15页
                sumpage:{},       //拉取出的页数数据
                cutword:0,        //切换消息列表和内容
                mainlist:{},      //当前一封消息数据
                mainlistadd:{},   //下一封消息的数据
                lists:0,          //判断是第几封消息
                lastmain:0,        //判断是不是最后一封消息
                word:'',          //搜索内容
                judgeword:0       //判断是不是搜索的数据
            }
        },
        watch:{
            selectedMail:function () {
                //数据selectedMail发送变化执行
                this.webpage=1;
                this.firstCPages=1;
                this.lastCPages=15;
                this.cutword = 0;
                this.word = '';
                this.title = this.selectedMail.type;
                this.Rendering();
            },
            checkArr:function () {
                //数据checkArr发送变化执行
                if (this.checkArr.length === this.items.length) {
                    this.checkAll = false
                } else {
                    this.checkAll = true
                }
            },
            change:function () {
                this.Rendering();
            },
            word:function(){
                this.webpage = 1;
                this.firstCPages=1;
                this.lastCPages=15;
                if (this.word == '') {
                    this.judgeword = 0
                }
                if (this.selectedMail.index == 40) {
                    this.TeacherBySearch();
                }else if (this.selectedMail.index == 50) {
                    this.ToUserBySearch();
                }
            }
        },
        created:function () {
            //加载页面执行
            /*this.campusoutbox();*/
            var self = this
            setTimeout(function () {
                console.log('消息中心')
                self.campusoutbox()
            }, 200);

            if (this.sumpage.total < 15) {
                console.log(this.sumpage.total);
                this.lastCPages = this.sumpage.total
                console.log(this.lastCPages);

            }
          console.log('tt');
          console.log(JSON.stringify(this.selectedMail));
        },
        methods:{
            handleCheckAll() {
                //判断全选和反选
                if (this.checkAll) {
                    this.checkArr = this.items.map(item => {
                        console.log('yy')
                    return item.messageIds
                    })
                   } else {
                        console.log('kk')
                    this.checkArr = []
                }
                console.log(this.checkArr);
                console.log(JSON.stringify(this.checkArr))
            },
            removeBrackets:function (val) {
                //合并数组
                var s = ""
                for (var i = 0; i < val.length; i++) {
                    s += val[i] + ","
                }

                return s.substring(0,s.length -1)
            },
            renovate(){
                //刷新页面执行
                this.word = '';
                this.Rendering();
            },
            Rendering:function(){
                //判断是哪个数据
                if (this.judgeword == 0) {
                    if (this.selectedMail.index == 40) {
                        this.refreshinbox();
                    }else if (this.selectedMail.index == 50) {
                        this.refreshoutbox();
                    }else if (this.selectedMail.index == 10) {
                        this.campusoutbox();
                    }
                }else if (this.judgeword == 1) {
                    this.TeacherBySearch();
                }else if (this.judgeword == 2) {
                    this.ToUserBySearch();
                }
                
            },
            subtract(){
                //点击向右加下一页
                if (this.webpage > 1) {
                    var jj = (this.lastCPages+1) - this.firstCPages; //判断一个多少条数据
                    this.webpage--
                    this.firstCPages-=15;
                    this.lastCPages-=jj;
                    this.Rendering();
                }
            },
            adds(){
                //点击向左加上一页
                if (this.webpage < this.sumpage.pages) {
                    this.webpage++;
                    this.firstCPages+=15;
                    if (this.webpage == this.sumpage.pages) {
                        this.lastCPages = this.sumpage.total;
                     }else{
                        this.lastCPages+=15;
                     }
                    this.Rendering();
                }
            },
            editmain:function(){
                let that = this
                this.$confirm('删除邮件, 是否继续?', '提示', {
                    lockScroll:false,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url     = 'tMessage/deleteSendMessageOfSchoolRep'
                    let reqData = {}
                        reqData.messageIds = this.removeBrackets(that.checkArr);
                    that.$http.post(url, reqData).then(function (res){
                        if(res.body.code == 200){
                            this.Rendering();
                        }
                    })
                    /*this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });*/
                    this.$notify({title: '成功',message: '删除成功',type: 'success'});
                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });*/
                    this.$notify.info({title: '取消',message: '已取消删除',type: 'success'});
                });
            },
            goback:function(){
                //消息详情中后退执行
                this.cutword = 0;
                /*this.Rendering();*/
            },
            mainword:function(list){
                //消息点击情况
                this.lastmain = 0;
                this.lists = list;
                this.cutword = 1;
                if (this.sumpage.pages == 1 && this.lists == 14) {  
                    //分页只有一页点击最后一个“下一封”显示“最后一封”
                    this.mainlist = this.items[this.lists];
                    this.lastmain = 1;
                }else if(this.sumpage.pages == this.webpage && this.lists == this.items.length-1){
                    //分页最后一个“下一封”显示“最后一封”
                    this.mainlist = this.items[this.lists];
                    this.lastmain = 1;
                }else if( this.lists == 14){
                    //分页下一封
                    this.mainlist = this.items[this.lists];
                    this.mainlistadd = this.items[0];
                }else{
                    //分页下一封下一页
                    this.mainlist = this.items[this.lists];
                    this.mainlistadd = this.items[this.lists+1];
                }
            },
            mainwordlist:function(){
                //下一封点击情况
                this.lastmain = 0;
                if (this.webpage >= this.sumpage.pages) {
                    //最后一页或者只有一页
                    this.lists++
                    if (this.lists == this.items.length-1){
                        this.mainlist = this.items[this.lists];
                        this.lastmain = 1;
                    }
                    this.mainlist = this.items[this.lists];
                    this.mainlistadd = this.items[this.lists];
                }else{
                    //不是最后一页或者不是只有一页的情况
                    this.lists++;
                    if (this.lists == 15) {
                        //最后一封消息点击
                        this.webpage++;
                        this.firstCPages+=15;
                        if (this.webpage == this.sumpage.pages) {
                            this.lastCPages = this.sumpage.total;
                         }else{
                            this.lastCPages+=15;
                         }
                        this.Rendering();
                        this.lists = 0;
                    }else{
                        //正常点击不是最后一封消息
                        this.mainlist = this.items[this.lists];
                        this.mainlistadd = this.items[this.lists+1];
                    }
                }
            },
            timeAgo:function (val) {
                //返回距离现在时间
                return moment(val).fromNow()
            },
            campusoutbox:function () {
                //校园-发件箱列表-学校管理员发给班级和教师的信息
                this.$store.commit('TREE_SELECT',0)
                let that    = this
                let url     = 'tMessage/getSendMessageFromSchool'
                var reqData     = {}
                reqData.schoolId = auth.getSchoolId();
                reqData.pageNum = this.webpage;
                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data.result;
                        let pages    = res.body.data.page;
                        that.items   = data;
                        that.sumpage  = pages
                        if (this.webpage == this.sumpage.pages) {
                                this.lastCPages = this.sumpage.total;
                            }
                    }else{
                        if (this.webpage != 1) {
                            this.webpage = 1
                            this.Rendering();
                            this.firstCPages=1;    //初始第一页到15页
                            this.lastCPages=15;    //初始第一页到15页
                        }else{
                            that.firstCPages=0;
                            that.items   = [];
                            that.sumpage  = {}
                        }
                    }

                },function(res){
                    // 响应错误回调
                });
            },
            refreshinbox:function () {
                //班级消息-获取家长发送的收件箱消息
                this.$store.commit('TREE_SELECT',0)
                let that    = this
                let url     = 'tMessage/getReceiveMessageListUserToTeacher'
                var reqData     = {}
                reqData.schoolId = auth.getSchoolId();
                reqData.pageNum = this.webpage;
                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data.result;
                        let pages    = res.body.data.page;
                        that.items   = data;
                        that.sumpage  = pages
                    }else{
                        if (res.body.data == null) {
                            that.firstCPages=0;
                            that.items   = [];
                            that.sumpage  = {}
                        }
                    }

                },function(res){
                    // 响应错误回调
                });
            },
            refreshoutbox:function () {
                //班级消息-获取发送给家长的发件箱列表
                this.$store.commit('TREE_SELECT',0)
                let that    = this
                let url     = 'tMessage/getSendMessageListTeacherToUser'
                var reqData     = {}
                reqData.schoolId = auth.getSchoolId();
                reqData.pageNum = this.webpage;
                that.$http.post(url,reqData).then(function (res) {
                    // 响应成功回调
                    if(res.body.code == "200") {
                        let data    = res.body.data.result;
                        let pages    = res.body.data.page;
                        that.items   = data;
                        that.sumpage  = pages
                    }else{
                        if (res.body.data == null) {
                            that.firstCPages=0;
                            that.items   = [];
                            that.sumpage  = {}
                        }
                    }

                },function(res){
                    // 响应错误回调
                });
            },
            TeacherBySearch:function () {
                //搜索
                this.$store.commit('TREE_SELECT',0)
                this.judgeword = 1
                let that    = this
                let url     = 'tMessage/getReceiveMessageListUserToTeacherBySearch'
                var reqData     = {}
                reqData.schoolId = auth.getSchoolId();
                reqData.keyword = this.word;
                reqData.pageNum = this.webpage;
                that.$http.post(url,reqData).then(function (res) {
                    // 响应成功回调
                    if(res.body.code == "200") {
                        let data    = res.body.data.result;
                        let pages    = res.body.data.page;
                        that.items   = data;
                        that.sumpage  = pages
                    }

                },function(res){
                    // 响应错误回调
                });
            },
            ToUserBySearch:function () {
                //搜索
                this.$store.commit('TREE_SELECT',0)
                this.judgeword = 2
                let that    = this
                let url     = 'tMessage/getSendMessageListTeacherToUserBySearch'
                var reqData     = {}
                reqData.schoolId = auth.getSchoolId();
                reqData.keyword = this.word;
                reqData.pageNum = this.webpage;
                that.$http.post(url,reqData).then(function (res) {
                    // 响应成功回调
                    if(res.body.code == "200") {
                        let data    = res.body.data.result;
                        let pages    = res.body.data.page;
                        that.items   = data;
                        that.sumpage  = pages
                    }

                },function(res){
                    // 响应错误回调
                });
            }
        },
        components:{
            'expand-box':ExpandBox
        }
    }
</script>

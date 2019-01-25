<template>
    <expand-box :title="title">
        <div slot="body">
            <div class="box-body no-padding">
                <div class="mailbox-controls two-aide">
                    <!-- 搜索 -->
                    <div class="has-feedback">
                        <input type="text" class="form-control" placeholder="Search Mail" v-model="word">
                        <span class="form-control-feedback"></span>
                    </div>
                    <div class="pull-right">
                        <span v-if="items.total > 14" class="pages-controls">{{firstCPages}}-{{lastCPages}}/{{items.total}}</span>
                        <span v-else class="pages-controls">{{firstCPages}}-{{items.total}}/{{items.total}}</span>
                        <div class="btn-group">
                            <button type="button" @click="subtract" class="btn btn-default btn-sm"><i class="fa fa-chevron-left"></i></button>
                            <button type="button" @click="adds" class="btn btn-default btn-sm"><i class="fa fa-chevron-right"></i></button>
                        </div>
                        <!-- /.btn-group -->
                    </div>
                    <!-- /.pull-right -->
                </div>
                <div class="table-responsive mailbox-messages">
                    <table class="table table-hover table-striped">
                        <tbody>
                        <template v-for="(item,index) in items.list">
                            <tr @click="compile(item)" @dblclick="dbari(item.detailsUrl)" :class="{activebj : activeIndexrecipe == item.assistId}">
                                <!-- <td  @click="mainword(index)" class="mailbox-subject"> -->
                                <td  class="mailbox-subject two-aide">
                                    <span class="flottitle">{{item.title}}</span>
                                    <!-- <div class="flotcontent" v-html="item.content"></div> -->
                                    <!-- <span class="flotcontent">- {{item.content}}</span> -->
                                </td>
                                <td class="mailbox-attachment"></td>
                                <td class="mailbox-date noline-feed by-senttime">{{ timeAgo(item.createTime) }}</td>
                            </tr>
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
<script>
    let moment = require('moment')
    import ExpandBox from '../Com/ExpandBox.vue'
    import auth from '../../js/auth'

    export default{
        props:{
            selectedMail:Object,
            changeaide:'',
        },
        data(){
            return{
                msg:'hello vue',
                title:'课堂助手',
                items:[],         //拉取消息数据
                /*checkAll: false,  //判断是否全选
                checkArr: [],     //全选数据*/
                webpage:1,        //初始页数
                firstCPages:1,    //初始第一页到15页
                lastCPages:15,    //初始第一页到15页
                /*sumpage:{},*/       //拉取出的页数数据
               /* mainlist:{},      //当前一封消息数据
                mainlistadd:{},   //下一封消息的数据
                lists:0,          //判断是第几封消息
                lastmain:0,        //判断是不是最后一封消息*/
                word:'',          //搜索内容
                judgeword:0,       //判断是不是搜索的数据
                activeIndexrecipe:''
            }
        },
        watch:{
            word:function(){
                this.webpage = 1;
                this.firstCPages=1;
                this.lastCPages=15;
                if (this.word == '') {
                    this.judgeword = 0
                }
                this.ToUserBySearch();
            },
            changeaide:function(){
                this.campusoutbox();
            },
        },
        created:function () {
            //加载页面执行
            /*this.campusoutbox();*/
            var self = this
            setTimeout(function () {
                console.log('课堂助手')
                self.campusoutbox();
            }, 200);

            if (this.items.total < 15) {
                console.log(this.items.total);
                this.lastCPages = this.items.total
                console.log(this.lastCPages);

            }
          console.log('tt');
          console.log(JSON.stringify(this.selectedMail));
        },
        methods:{
            compile(e){
                this.activeIndexrecipe = e.assistId;
                this.$emit('successcompile',e)
            },
            dbari(url){
                window.open(url)
            },
            Rendering:function(){
                //判断是哪个数据
                this.campusoutbox();
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
                if (this.webpage < this.items.pages) {
                    this.webpage++;
                    this.firstCPages+=15;
                    if (this.webpage == this.items.pages) {
                        this.lastCPages = this.items.total;
                     }else{
                        this.lastCPages+=15;
                     }
                    this.Rendering();
                }
            },
            /*mainword:function(list){
                //消息点击情况
                this.lastmain = 0;
                this.lists = list;
                if (this.items.pages == 1 && this.lists == 14) {  
                    //分页只有一页点击最后一个“下一封”显示“最后一封”
                    this.mainlist = this.items[this.lists];
                    this.lastmain = 1;
                }else if(this.items.pages == this.webpage && this.lists == this.items.length-1){
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
            },*/
            /*mainwordlist:function(){
                //下一封点击情况
                this.lastmain = 0;
                if (this.webpage >= this.items.pages) {
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
                        if (this.webpage == this.items.pages) {
                            this.lastCPages = this.items.total;
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
            },*/
            timeAgo:function (val) {
                //返回距离现在时间
                return moment(val).fromNow()
            },
            campusoutbox:function () {
                //获取平台资讯列表
                this.$store.commit('TREE_SELECT',0)
                let that    = this
                let url     = 'classroomAssist/list'
                var reqData     = {}
                reqData.pageNum = this.webpage;
                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        /*let pages    = res.body.data.page;*/
                        that.items   = data;
                        /*that.sumpage  = pages*/
                    }

                },function(res){
                    // 响应错误回调
                });
                /*this.$store.commit('TREE_SELECT',0)
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
                    }

                },function(res){
                    // 响应错误回调
                });*/
            },
            ToUserBySearch:function () {
                //搜索
                this.$store.commit('TREE_SELECT',0)
                let that    = this
                let url     = 'classroomAssist/list'
                var reqData     = {}
                reqData.pageNum = this.webpage;
                reqData.title = this.word;

                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        /*let pages    = res.body.data.page;*/
                        that.items   = data;
                        /*that.sumpage  = pages*/
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
<style lang="scss" scoped>
    @import "../../scss/skins.scss";
    .mailbox-controls {
        padding: 5px;
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
        border-top: 1px solid #f4f4f4;
    }
    .table{
        margin-bottom: 0;
    }
    .table td{
        padding: 14px 10px;
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
.activebj{
    background-color: #ccc !important;
}
.by-senttime{
    text-align: right;
    padding-right: 30px !important;
}
.two-aide{
    padding-left: 18px !important;
}
</style>
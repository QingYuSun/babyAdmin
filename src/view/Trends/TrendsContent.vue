<template>
    <expand-box :title="title">
        <div slot="body">
            <div class="box-body no-padding">
                <div class="table-responsive mailbox-messages">
                    <ul class="trend-list">
                        <template v-for="(item,k) in items">
                            <li v-if="selectedItem.index == 10">
                                <div class="trend-wrp">
                                    <div class="avatar">
                                        <figure class="image is-48x48">
                                            <img v-if="isEmpty(schoolImg)" src="../../assets/avatar.png" class="newheight">
                                            <img v-else  :src="'http://hellobaobei.oss-cn-shanghai.aliyuncs.com/static/images/schoolHead/' + schoolImg" class="newheight">
                                        </figure>
                                    </div>
                                    <div class="trend-content">
                                        <a :href="item.detailsUrl" target='_blank' class="desc ms-yh newcolor" >{{item.title}}</a>
                                        <!-- <div v-if="selectedItem.index == 40" class="mailbox-subject new-event">
                                            <span>活动地点 : {{item.eventAddress}}</span><br>
                                            <span>活动时间 : {{ newtime(item.eventStartTime) }}</span>
                                        </div> -->
                                        <div class="album is-clearfix">
                                            <template v-for="(obj, j) in item.newInfoImageurls.split(',')">
                                                <figure v-if='j<3 && obj !=""' class="image is-96x96 pull-left zs-imgheight">
                                                    <!-- <img :src="'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=' + obj"> -->
                                                    <img :src="obj">
                                                </figure>
                                            </template>
                                            <!-- <figure class="image is-96x96 pull-left">
                                                <img src="../../assets/album-default.jpg">
                                            </figure>
                                            <figure class="image is-96x96 pull-left">
                                                <img src="../../assets/album-default.jpg">
                                            </figure>
                                            <figure class="image is-96x96 pull-left">
                                                <img src="../../assets/album-default.jpg">
                                            </figure>
                                            <figure class="image is-96x96 pull-left">
                                                <img src="../../assets/album-default.jpg">
                                            </figure> -->
                                        </div>
                                        <p class="info">来自于 {{schoolname}} {{ timeAgo(item.createTime) }}
                                            <!-- <span class="tag is-lunch">午餐</span> -->
                                            <a class="close">
                                                <i @click="deleteevent(item.newsinfoId)" class="fa fa-times fa-lg" aria-hidden="true"></i>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <!-- <div class="mailbox-star">
                                    <a href="#">
                                        <i class="fa fa-star text-yellow"></i>
                                    </a>
                                </div>
                                <div class="mailbox-name">
                                    <a href="read-mail.html">{{item.from}}</a>
                                </div>
                                <div class="mailbox-subject">
                                    <span>{{item.title}}</span>
                                    <span>- {{item.content}}</span>
                                </div>
                                <div class="mailbox-attachment"></div>
                                <div class="mailbox-date">{{ timeAgo(item.time) }}</div> -->
                            </li>
                            <li v-if="selectedItem.index == 20">
                                <div class="trend-wrp">
                                    <div class="avatar">
                                        <figure class="image is-48x48">
                                            <img v-if="isEmpty(schoolImg)" src="../../assets/avatar.png" class="newheight">
                                            <img v-else  :src="'http://hellobaobei.oss-cn-shanghai.aliyuncs.com/static/images/schoolHead/' + schoolImg" class="newheight">
                                        </figure>
                                    </div>
                                    <div class="trend-content">
                                        <a :href="item.detailsUrl" target='_blank' class="desc ms-yh newcolor" >{{item.description}}</a>
                                        <!-- <div v-if="selectedItem.index == 40" class="mailbox-subject new-event">
                                            <span>活动地点 : {{item.eventAddress}}</span><br>
                                            <span>活动时间 : {{ newtime(item.eventStartTime) }}</span>
                                        </div> -->
                                        <div class="album is-clearfix" v-if="item.coverImageurl == null">
                                            <template v-for="(obj, j) in item.imageurl.split(',')">
                                                <figure v-if='j<3' class="image is-96x96 pull-left zs-imgheight">
                                                    <img :src="'http://hellobaobei.oss-cn-shanghai.aliyuncs.com/static/images/dynamicImgs/' + obj">
                                                </figure>
                                            </template>
                                        </div>
                                        <div class="album is-clearfix" v-else>
                                            <template v-for="(obj, j) in item.imageurl.split(',')">
                                                <figure v-if='j<3' class="image is-200x200 pull-left">
                                                <video :src="'http://hellobaobei.oss-cn-shanghai.aliyuncs.com/static/images/dynamicSmallVideo/' + obj" style="height: 100%;"  width="320" height="100%" controls="controls">
                                                    </video>
                                                    <!-- <img :src="'http://hellobaobei.oss-cn-shanghai.aliyuncs.com/static/images/dynamicSmallVideo/' + obj"> -->
                                                </figure>
                                            </template>
                                        </div>
                                        <p class="info">来自于 {{schoolname}} {{ timeAgo(item.createTime) }}
                                            <!-- <span class="tag is-lunch">午餐</span> -->
                                            <!-- <a class="close">
                                                <i @click="deleteevent(item.classId)" class="fa fa-times fa-lg" aria-hidden="true"></i>
                                            </a> -->
                                        </p>
                                    </div>
                                </div>
                                <!-- <div class="mailbox-star">
                                    <a href="#">
                                        <i class="fa fa-star text-yellow"></i>
                                    </a>
                                </div>
                                <div class="mailbox-name">
                                    <a href="read-mail.html">{{item.from}}</a>
                                </div>
                                <div class="mailbox-subject">
                                    <span>{{item.title}}</span>
                                    <span>- {{item.content}}</span>
                                </div>
                                <div class="mailbox-attachment"></div>
                                <div class="mailbox-date">{{ timeAgo(item.time) }}</div> -->
                            </li>
                        </template>
                    </ul>
                    <!-- /.table -->
                </div>
                <!-- /.mail-box-messages -->
            </div>
        </div>
    </expand-box>
</template>
<style lang="scss" scoped>
    @import "../../scss/skins.scss";
    @import "../../scss/fonts.scss";
    .trend-list{
        .trend-wrp{
            padding: 1rem 0;
            display: flex;
            border-bottom: 1px solid #f4f4f4;
            .avatar{
                width: 120px;
                figure{
                    margin: 0 auto;
                    overflow: hidden;
                    border-radius: 5px;
                }
            }
            .trend-content{
                flex: 1;
                -webkit-flex: 1;
                .desc{
                    font-size: 16px;
                    font-weight: 600;
                    line-height: 26px;
                    margin: 0 1rem 0 0;
                }
                .album{
                    padding-right: 300px;
                    margin:.8rem 0;

                    figure{
                        overflow: hidden;
                        border-radius: 6px;
                        margin: 0 .4rem .8rem;
                    }
                }
                .info{
                    font-size: 14px;
                    position: relative;
                    margin-right: 1rem;
                    color: #666666;
                    .tag{
                        border-radius: 5px;
                        font-size: 10px;
                        height: 20px;
                        padding-left: 8px;
                        padding-right: 8px;
                        color: white;
                        margin-left: .6rem;
                    }
                    .close{
                        color: #E83828;
                        position: absolute;
                        right: 0;
                    }
                }
            }
        }
    }
    .newcolor{
        color: #666;
        font-weight: bold !important;
    }
    .new-event{
        margin: 10px 0;
        color: #000;
    }
    .newheight{
        height: 100% !important;
    }
    .zs-imgheight img{
        height: 100%;
    }
    .is-200x200{
        width: 200px;
        height: 200px;
    }
</style>
<script>
    let moment = require('moment')
    import ExpandBox from '../Com/ExpandBox.vue'
    import auth from '../../js/auth'
    export default{
        props:{
            selectedItem:Object,
            Change:Object,
        },
        data(){
            return{
                msg:'hello vue',
                title:'校园动态',
                items:[],
                trendspage:[],
                pageNum:1,
                schoolname:'',
                schoolImg:''
            }
        },
        watch:{
            selectedItem:function () {
                this.title = this.selectedItem.type
                this.refresh()
            },
            Change:function(){
                 this.refresh();
            }
        },
        created:function () {
          /*this.refresh();*/
          var self = this
            setTimeout(function () {
                console.log('校园动态')
                self.refresh()
            }, 200);
          this.schoolImg = auth.getschoolImg();
        },
        methods:{
            timeAgo:function (val) {
                return moment(val).fromNow()
            },
            newtime:function(el){
                return moment(el).format('YYYY年MM月DD')
            },
            isEmpty:function (val) {
                return val==""?true:false
            },
            refresh:function () {
                this.schoolname = auth.getSchoolName();
                this.$store.commit('TREE_SELECT',0)
                let that    = this
                let url     = 'tevet/selectEventOnTeacherPage'
                var reqData     = {}
                reqData.schoolId =auth.getSchoolId();
                reqData.type = this.selectedItem.index;
                reqData.pageNum = this.pageNum;
                reqData.teacherId = 1;
                console.log("tt")
                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data.result;
                        let pages    = res.body.data.page;
                        that.items   = data;
                        that.trendspage  = pages;
                    }else{
                        that.items   = [];
                        that.trendspage  = [];
                    }

                },function(res){
                    // 响应错误回调
                });
            },
            deleteevent:function(er){
                this.$confirm('删除动态, 是否继续?', '提示', {
                    lockScroll:false,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that    = this
                    let url     = 'tevet/deleteNewInfoById'
                    var reqData     = {}
                    reqData.newsInfoId = er;
                    console.log("tt")
                    that.$http.post(url,reqData).then(function (res) {
                        if(res.body.code == "200") {
                            this.refresh();
                            this.$notify({title: '成功',message: '批量删除成功',type: 'success'});
                        }
                    },function(res){
                        // 响应错误回调
                    });
                }).catch(() => {
                     this.$notify.info({title: '取消',message: '已取消删除',type: 'success'});
                });
            }
        },
       /* created:function () {
            this.$store.commit('TREE_SELECT',0)
            let that    = this
            let url     = '/tevet/selectEventByClassToOneBaby'
            var reqData     = {
                schoolId:1,
                type:0
            };
            console.log("tt")
            that.$http.post(url,reqData).then(function (res) {
                if(res.body.code == "200") {
                    let data    = res.body.data;
                    that.items   = data
                }

            },function(res){
                // 响应错误回调
            });
        },*/
        components:{
            'expand-box':ExpandBox
        }
    }
</script>

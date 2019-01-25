<template>
    <div>
       <div class="column">
            <!-- <iframe id="iframe" src="http://www.baidu.com"></iframe> -->
            <!-- <iframe src="https://cn.vuejs.org/v2/api/#functional" id="iframepage" name="iframepage" frameBorder=0 scrolling=no width="100%"></iframe> -->
            <iframe id="IFeditValue" :src="detaUrl"  scrolling="auto" height="800" width="100%" onload="this.h"></iframe>
            <!-- <div class="more-column">
                <h3 class="bitoti">{{title}}</h3>
                <span class="wordtime">{{date}}<em>哈喽baby</em></span>
                <div class="word" v-html="content"></div>
            </div> -->
            <div class="by-dot">
                <div class="by-comments">
                    <ul>
                        <li>
                            <a href="javascript:void(0)">
                                <i></i>{{like}}
                            </a>
                        </li>
                        <li class="by-Message">
                            <a href="javascript:void(0)">
                                <i></i>{{comment}}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="by-reply">
                    <ul>
                        <li v-for="item in commentList">
                            <img :src="'http://hellobaobei.oss-cn-shanghai.aliyuncs.com/static/images/userHead/' + item.headImageurl">
                            <div class="by-reply-text">
                                <span v-if="item.toReplyUid == null">{{item.name}}:回复{{item.toName}}:{{item.commentContent}}</span>
                                <span v-else>{{item.name}}：{{item.commentContent}}</span>
                                <span>{{newtime(item.createTime)}}</span>
                            </div>
                        </li>
                        <!-- <li>
                            <img src="../../assets/avatar.png">
                            <div class="by-reply-text">
                                <span>谁谁：回复谁事儿：哈哈哈哈哈</span>
                                <span>06-07 17:00</span>
                            </div>
                        </li>
                        <li>
                            <img src="../../assets/avatar.png">
                            <div class="by-reply-text">
                                <span>谁谁：回复谁事儿：哈哈哈哈哈</span>
                                <span>06-07 17:00</span>
                            </div>
                        </li> -->
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import auth from '../../js/auth'
    import md5 from 'md5'

    export default{
        'name':'Login',
        data(){
            return{
                id:'-1',
                commentList:'',
                detaUrl:'',
                /*date:'',*/
                like:'',
                comment:'',
                iframenum:0

            }
        },
        created:function () {
            console.log('paras : ' +this.$route.params.id)
            this.id = this.$route.params.id
        },
        methods:{
            newtime:function(el){
                return moment(el).format('MM-DD HH:00')
            },
            getContent:function () {
                let that = this 
                var url         = 'tInfo/selectInfoDetailsWEB';

                var reqData     = {}
                    reqData.topicId = that.id
                    reqData.topicType = 1
                console.log('id' + that.id)
                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        that.detaUrl   = data.detailsUrl
                        that.comment   = data.commentNum
                        that.like   = data.likeNum
                        that.commentList   = data.commentList
                        /*that.date = moment(data.createTime).format('YYYY-MM-DD')*/
                        document.title = '哈喽宝贝';

                        document.getElementById("IFeditValue").onload = function() {
                            if (that.iframenum==0) {
                                that.ceshi();
                            }
                        };
                    }

                },function(res){
                    // 响应错误回调
                });


            },
            ceshi(){
                this.iframenum++;
                var  ss = "mp.weixin.qq.com"
                if (this.detaUrl.indexOf(ss) != -1) {
                    $.ajaxPrefilter( function (options) {
                      if (options.crossDomain && jQuery.support.cors) {
                        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                        options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
                      }
                    });

                    var share_link=this.detaUrl;//微信文章地址
                    $.get(
                        share_link,
                        function (response) {
                            console.log("> ", response); 
                            var html = response;
                            html=html.replace(/data-src/g, "src"); 
                            var html_src = 'data:text/html;charset=utf-8,' + html;
                            $("iframe").attr("src" , html_src);
                        }
                    );
                }
                 
            }
        },
        mounted:function () {
            let that = this
            setTimeout(function () {
                console.log('  login')
                that.getContent();
            }, 500);


        }
    }
</script>

<style type="text/css">
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td {margin: 0; padding: 0; border: 0; outline: 0; font-size: 100%; vertical-align: baseline; background: transparent;}
body {line-height: 1; font: 15px/normal Verdana, Arial, Helvetica, sans-serif;}
blockquote, q {quotes: none;}
blockquote:before, blockquote:after, q:before, q:after {content: ''; content: none;}
.main{
    width: 100%;
}
@media screen and (max-width: 420px) {
  .column{
    width: 90%;
    margin: 0 auto;}
}

@media screen and (min-width: 420px) {
  .column{
    width: 60%;
    margin: 0 auto;}
}

.more-column{
    width: 100%;
}
.bitoti{
    font-size: 2em;
    line-height: 2em;
    font-weight: bold;
    margin-top: 1em;
    clear: both;
    border-bottom: 1px solid #ccc;
}
.wordtime{
    display: block;
    color: #8c8c8c;
    font-size: 1.2rem;
    text-decoration: none;
    line-height: 18px;
    margin:1em 0;
}
.wordtime a{
    text-decoration:none;
    margin-left: 1em;
    color: #417fb9;
}
.wordtime em{
    margin-left: 1em;
    font-style: normal;
    color: #f49e1b;
}
.word{
    margin-top: 0.8em;
    font-size: 1.4em !important;
    padding-bottom: 2em;
}
.word p{
    margin: 1.6em 0;
}
.word img{
    margin: 1.6em auto;
    display: block;
}
.by-comments ul li{
    float: left;
}
.by-comments{
    overflow: hidden;
    padding: 1em 0;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
}
.by-comments ul li a{
    line-height: 20px;
    color: #000;
}
.by-comments ul li a i{
    width: 20px;
    height: 20px;
    display: inline-block;
    float: left;
    margin: 0 0.5em;
    background-image: url(../../assets/heart.png);
    background-size: 100%;
    background-repeat: no-repeat;
}
.by-Message i{
    background-image: url(../../assets/Message.png) !important;
}
.by-reply li{
    padding: 1em 0;
    overflow: hidden;
    border-bottom: 1px solid #ccc;
}
.by-reply img{
    float: left;
    width: 60px;
    height: 60px;
    border-radius: 5px;
}
.by-reply-text{
    margin-left: 5em;
}
.by-reply-text span{
    margin: 5px 0;
    display: block;
}
</style>

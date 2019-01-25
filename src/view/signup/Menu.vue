<template>
    <div class="grade-menu">
        <a @click="newsignup" class="addpading addhover mail-create btn btn-primary btn-block pf-sc-b">新建</a>
        <!-- <a class="mail-create btn btn-gray btn-block pf-sc-b">编辑</a> -->
            <!-- <grade-item :grade="item" v-on:selectedup="selectedup"></grade-item> -->
        <expand-box :title="title" v-on:successgoback='successgoback'>
            <div slot="body">
                <ul class="grade-item nav-pills nav-stacked">
                    <template v-for="(item,k) in items">
                        <li :class="{activet : activeMain == item.registerPlanId}" @click="signupselected(item)">
                            <a href="JavaScript:;">
                                {{ item.name }}
                                <span style="float: right;">{{timeAgo(item.createTime)}}</span>
                            </a>
                        </li>
                    </template>
                </ul>
            </div>
        </expand-box>
        <div id="qrcode" class="imgtext">
        </div>
        <div class="fenxiang">扫描二维码报名</div>
        <!-- <input type="text" id="getval"/> <button @click="send" id="send">点击更换验证码</button> -->
    </div>
</template>
<style lang="scss">
    @import "../../scss/skins.scss";
    @import "../../scss/fonts.scss";

    .grade-menu{
        .box-header{
            .box-title{
                font-family: 微软雅黑 !important
            }
        }
    }
    .btn-block {
        display: block;
        width: 100%;
    }
    .mail-create{
        padding: 6px 12px;
        border-color: #367fa9;
        color: white;
        margin-bottom: 20px;
        border-radius: 3px;
        -webkit-box-shadow: none;
        box-shadow: none;
        border: 1px solid transparent;
        text-align: center;
    }
    .grade-item{
        border-bottom: 1px solid #f4f4f4;
        margin: 0;
        li{
            border-bottom: 1px solid #f4f4f4;
            margin: 0;
            a{
                position: relative;
                display: block;
                padding: 18px 15px;
                border-radius: 0;
                border-top: 0;
                border-left: 3px solid transparent;
                color: #444;
                .fa{
                    vertical-align: middle;
                }
                .label {
                    display: inline;
                    padding: .2em .6em .3em;
                    font-size: 75%;
                    font-weight: 700;
                    line-height: 1;
                    color: #fff;
                    text-align: center;
                    white-space: nowrap;
                    vertical-align: baseline;
                    border-radius: .25em;
                    &.label-primary{
                         background-color: #f8b62d !important;
                     }
                }
            }
            &.activet{
                a{
                    background: #F7F8F8;
                    border-left: 3px solid transparent;
                    border-left-color: #f8b62d;
                }
            }
        }
    }
    .box-wrp{
        /*border-top: none !important;
        margin-bottom: 0.4px !important;*/
        .box-body{
            /*min-height: 100px;*/
        }
    }
    .addpading{
        padding: 11px 12px !important;
        font-size: 1.2rem;
    }
    .addhover:hover{
        background:#f7c766 !important;
        color: #fff;
    }
    .fenxiang{
        text-align: center;
        font-size: 14px;
        font-weight: 500;
    }
</style>
<script>
    import ExpandBox from '../Com/ExpandBox.vue'
    import Newsignup    from './Add.vue'
    import auth from '../../js/auth'

    const NewsignupComponent = Vue.extend(Newsignup);
    const opensignup = (propsData = {}) => {
        return new NewsignupComponent({
            el: document.createElement('div'),
            propsData
        })
    }

    var list = [
            {
                name:'哈喽宝贝幼儿园春季报名',
                id:11,
                active:false,
                time:'3分钟'
            },
            {
                name:'哈喽宝贝幼儿园春季报名1',
                id:12,
                active:false,
                time:'15分钟'
            },
            {
                name:'哈喽宝贝幼儿园春季报名2',
                id:13,
                active:false,
                time:'2017-05-19'
            }
    ]

    export default{
        data(){
            return{
                title:'',
                items:[],
                activeMain:9,
                number:0,
                schoolId:0
            }
        },
        created:function(){
            /*this.singuplist();*/
            var self = this
            setTimeout(function () {
                console.log('报名管理')
                self.singuplist();
            }, 200);

            this.title = auth.getSchoolName();
            this.schoolId = auth.getSchoolId();
        },
        components:{
            'expand-box':ExpandBox,
        },
        watch:{
            items:function(){
                this.signupselected(this.items[0]);
            }
        },
        methods:{
            send(val){

                    var f = document.getElementById("qrcode");
                    var childs = f.childNodes;
                    for(var i = childs.length - 1; i >= 0; i--) { 
                      f.removeChild(childs[i]); 
                    }
                
                    var qrcode = new QRCode(document.getElementById("qrcode"), {
                        width : 200,//设置宽高
                        height : 200
                    });
                    qrcode.makeCode(`http://192.168.1.175:8899/testhtml/displaySchoolInfo.html?schoolId=${this.schoolId}&planId=${this.activeMain}`);
            },
            successgoback:function(){
                this.singuplist();
            },
            timeAgo:function (val) {
                //返回距离现在时间
                return moment(val).fromNow()
            },
            getLocalTime(nS) {
                //时间戳转化
               return moment(nS).format('YYYY年MM月DD')
            },
            signupselected:function (item) {
                this.activeMain = item.registerPlanId;
                this.$emit('selectedup', item)
                this.send(item);
            },
            newsignup:function(){
                opensignup({visible:true,callbacklist:this.singuplist})
            },
            singuplist () {
                let that         = this
                var url          = 'registerManage/plan/list'
                var reqData      = ''
                this.$http.post(url, reqData).then(function (res){
                    if(res.body.code == '200'){
                        let data    = res.body.data;
                        that.items   = data
                    }
                })
            }
        }

    }
</script>

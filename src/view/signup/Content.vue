<template>
    <div class="student-list">
        <expand-box :title="title">
            <div slot="body">
                <!-- 宝贝列表 -->
                <div v-if="babydate == 0" class="box-body no-padding">
                    <div v-if="selectedMail.content != undefined" class="controls" v-html="selectedMail.content">
                    </div>
                    <div class="table-responsive mailbox-messages">
                        <table class="table table-hover table-striped">
                            <thead>
                                <tr class="two-thadd">
                                    <th class="two-singup"><p class="control"><input type="checkbox" v-model="checkAbb" @click="handleCheckAll"></p></th>
                                    <th>全选</th>
                                    <th><a @click="AgreedtoAll" class="mail-create btn btn-primary ms-yh newwhite">批量同意</a></th>
                                    <th>&nbsp;</th>
                                    <th>&nbsp;</th>
                                    <th>&nbsp;</th>
                                    <th>&nbsp;</th>
                                    <th>&nbsp;</th>
                                    <th>&nbsp;</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <th>&nbsp;</th>
                                    <th>姓名</th>
                                    <th>性别</th>
                                    <th>出生年月</th>
                                    <th>爸爸</th>
                                    <th>手机</th>
                                    <th>妈妈</th>
                                    <th>手机</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                        <tbody>
                            <template v-for="(item,k) in items">
                                <tr>
                                    <td class="two-singup">
                                        <p class="control">
                                            <input type="checkbox" :value="item.registerStudentId" v-model="checkArr">
                                        </p>
                                    </td>
                                    <td class="nameclick" @click="babydetailed(item.registerStudentId)">{{item.name}}</td>
                                    <td>{{sexFormat(item.gender)}}</td>
                                    <td>{{getLocalTime(item.birthday)}}</td>
                                    <td>{{item.father.name}}</td>
                                    <td>{{item.father.phoneNum}}</td>
                                    <td>{{item.mother.name}}</td>
                                    <td>{{item.mother.phoneNum}}</td>
                                    <td>{{stateFormat(item.state)}}</td>
                                    <td>
                                        <p>
                                            <a @click="Agreedto(item.registerStudentId)" class="link-edit">同意</a>
                                            <span>|</span>
                                            <a @click="Refusedto(item.registerStudentId)" class="link-delete">拒绝</a>
                                        </p>
                                    </td>
                                </tr>
                            </template>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- 宝贝详细情况 -->
                <div v-if="babydate == 1" class="box-body no-padding">
                    <div class="columns">
                        <div class="column is-6 is-parent">
                            <div class="info-wrp">
                            <button type="button" @click="goback" class="btn btn-default btn-sm signupdate"><i class="fa fa-chevron-left"></i></button>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label"></label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded newportrait">
                                            <!-- <img :src="'http://hellobaobei.oss-cn-shanghai.aliyuncs.com/static/images/headImageurl/' + babyitems.headImageurl">
                                            <img :src="'http://hellobaobei.oss-cn-shanghai.aliyuncs.com/static/images/headImageurl/' + babyitems.headImageurl"> -->

                                            <img v-if="isEmpty(babyitems.headImageurl)" src="http://hellobaobei.oss-cn-shanghai.aliyuncs.com/static/images/babyHead/register_baby_logo.png">
                                            <img v-else  :src="'http://hellobaobei.oss-cn-shanghai.aliyuncs.com/static/images/babyHead/' + babyitems.headImageurl">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">姓名:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" type="text" placeholder="姓名" :value="babyitems.name">
                                            <div class="is-fullwidth">
                                                <form v-if="babyitems.gender == 1" action="" method="get" class="newman">
                                                    <label><input name="Fruit" type="radio" value="" checked="checkbox" />男</label>
                                                    <label><input name="Fruit" type="radio" value="" />女</label>
                                                </form>
                                                <form v-if="babyitems.gender == 0" action="" method="get" class="newman">
                                                    <label><input name="Fruit" type="radio" value="" />男</label>
                                                    <label><input name="Fruit" type="radio" value="" checked="checkbox" />女</label>
                                                </form>
                                            </div>
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">出生年月:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" type="text" placeholder="出生年月" :value="getLocalTime(babyitems.birthday)">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">身份证:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" type="text" placeholder="身份证" :value="babyitems.idNum">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">地址:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" type="text" placeholder="地址" :value="babyitems.address">
                                        </p>
                                    </div>
                                </div>
                                <div class="control admin is-horizontal">
                                    <div class="control-label">
                                        <label class="label">联系人:</label>
                                    </div>
                                    <div class="control is-grouped">
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">父亲姓名:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" type="text" placeholder="父亲姓名" :value="babyitems.father.name">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">工作单位:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" type="text" placeholder="工作单位" :value="babyitems.father.company">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">职位:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" type="text" placeholder="职位" :value="babyitems.father.position">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">身份证:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" type="text" placeholder="身份证" :value="babyitems.father.idNum">
                                        </p>
                                    </div>
                                </div>
                                 <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">电话:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" type="text" placeholder="电话" :value="babyitems.father.phoneNum">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">母亲姓名:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" type="text" placeholder="母亲姓名" :value="babyitems.mother.name">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">工作单位:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" type="text" placeholder="工作单位" :value="babyitems.mother.company">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">职位:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" type="text" placeholder="职位" :value="babyitems.mother.position">
                                        </p>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">身份证:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" type="text" placeholder="身份证" :value="babyitems.mother.idNum">
                                        </p>
                                    </div>
                                </div>
                                 <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">电话:</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" type="text" placeholder="电话" :value="babyitems.mother.phoneNum">
                                        </p>
                                    </div>
                                </div>
                                <div class="control admin is-horizontal">
                                    <div class="control-label">
                                        <label class="label">其他:</label>
                                    </div>
                                    <div class="control is-grouped">
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">预防接种证:</label>
                                    </div>
                                    <div class="control">
                                        <div class="is-fullwidth">
                                            <p class="control is-expanded newcertificate">
                                                <img v-for="inoculate in babyitems.inoculateImgs" :src="'http://hellobaobei.oss-cn-shanghai.aliyuncs.com/static/images/inoculateImgs/' + inoculate">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">户籍证:</label>
                                    </div>
                                    <div class="control">
                                        <div class="is-fullwidth">
                                            <p class="control is-expanded newcertificate">
                                                <img v-for="native in babyitems.nativeImgs" :src="'http://hellobaobei.oss-cn-shanghai.aliyuncs.com/static/images/nativeImgs/' + native">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">出生证:</label>
                                    </div>
                                    <div class="control">
                                        <div class="is-fullwidth">
                                            <p class="control is-expanded newcertificate">
                                                <img v-for="birth in babyitems.birthImgs" :src="'http://hellobaobei.oss-cn-shanghai.aliyuncs.com/static/images/birthImgs/' + birth">
                                            </p>
                                        </div>
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

    .student-list{
        .link-edit{
            color: #F8BF48 ;
        }
        .link-delete{
            color: #E83828;
        }
        .table thead th{
            border-width: 0 0 1px;
        }
        .controls {
            padding: 18px !important;
            /*margin-bottom: 20px;*/
            .btn {
                border-radius: 3px;
                -webkit-box-shadow: none;
                box-shadow: none;
                border: 1px solid transparent;
                margin-right: 1rem;
            }
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
        padding: 19px 10px;
    }
    .mailbox-messages{
        .fa{
            vertical-align: middle;
        }
        a {
            color: #3c8dbc;
        }
    }
    .newwhite{
        margin-left: -2em;
        color: white !important;
    }
    .newwhite:hover{
        color: #55ab2e !important;
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
    .newportrait{
        width: 13em;
        display: inline-table;
        height: 13em;
    }
    .newportrait img{
        width: 100%;
        height: 100%;
    }
    .newcertificate{
        display: flex;
    }
    .newcertificate img{
        width: 8em;
        height: 8em;
        margin-right: 1em;
    }
    .signupdate{
        padding: 0.5em 1em;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .signupdate i{
        font-size: 1.1rem;
    }
    .nameclick{
        cursor: pointer;
    }
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
            width: 6rem;
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
        border-bottom: 1px solid #f4f4f4;
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
    .two-singup{
        width: 20px;
        padding-left: 18px !important;
    }
    .two-thadd{
        border-top: 1px solid #f4f4f4;
    }
    .two-thadd th{
        padding: 13px 10px;
    }
</style>
<script>
    import ExpandBox from '../Com/ExpandBox.vue'
    import AddStudent    from './Add.vue'
    export default{
        props:{
            selectedMail:Object
        },
        data(){
            return{
                msg:'hello vue',
                title:'学生报名',
                items:[],
                babydate:0,
                checkAll: true,  //判断是否全选
                checkArr: [],     //全选数据
                babyitems:[],
                checkAbb:false
            }
        },
        created:function () {
            var time = this.timeAgo(this.selectedMail.createTime);
            this.title = `${this.selectedMail.name}`;
            this.singupbabylist();
        },
        watch: {
            selectedMail:function(){
                this.checkAbb = false
                console.log(this.selectedMail.createTime);
            var time = this.timeAgo(this.selectedMail.createTime);
                this.title = `${this.selectedMail.name}`;
                this.singupbabylist();
            },
            checkArr:function () {
                //数据checkArr发送变化执行
                if (this.checkArr.length === this.items.length) {
                    this.checkAll = false
                    this.checkAbb = true
                } else {
                    this.checkAll = true
                    this.checkAbb = false
                }
            }
        },
        methods:{
            isEmpty:function (val) {
                return val==""?true:false
            },
            goback:function(){
                //消息详情中后退执行
                this.babydate = 0;
                /*this.Rendering();*/
            },
            handleCheckAll() {
                //判断全选和反选
                if (this.checkAll) {
                    this.checkArr = this.items.map(item => {
                    return item.registerStudentId
                    })
                   } else {
                    this.checkArr = []
                }
            },
            babydetailed:function(num){
                this.babydate = 1
                this.title = '个人信息'

                let that         = this
                var url          = 'registerManage/stdnt/selectByStudentId'
                var reqData      = {}
                    reqData.registerStudentId = num
                this.$http.post(url, reqData).then(function (res){
                    if(res.body.code == '200'){
                        let data    = res.body.data;
                        that.babyitems   = data
                    }
                })
            },
            sexFormat:function (val) {
                if(val == null)
                    return '未知'
                let res = 1 == val ? '男' :'女'
                return res
            },
            stateFormat:function (val) {
                let state
                if(val == 0){
                    state = '申请'
                }else if (val == 1) {
                    state = '通过'
                }else if (val == 2) {
                    state = '拒绝'
                }
                return state
            },
            AgreedtoAll:function(){
                let that         = this
                var url          = 'registerManage/stdnt/batchPass'
                var reqData      = {}
                    reqData.registerStudentIds = JSON.stringify(this.checkArr);
                this.$http.post(url, reqData).then(function (res){
                    this.singupbabylist();
                    this.checkArr = []
                    this.checkAbb = false
                    if(res.body.code == '200'){
                    }
                })
            },
            timeAgo:function (val) {
                //返回距离现在时间
                return moment(val).fromNow()
            },
            getLocalTime(nS) {
                //时间戳转化
               return moment(nS).format('YYYY.MM.DD')     
            },
            Agreedto:function(ago){
                let that         = this
                var url          = 'registerManage/stdnt/checkPass'
                var reqData      = {}
                    reqData.registerStudentId = ago
                this.$http.post(url, reqData).then(function (res){
                    this.singupbabylist();
                    if(res.body.code == '200'){
                        
                    }
                })
                event.stopPropagation();
            },
            Refusedto:function(re){
                let that         = this
                var url          = 'registerManage/stdnt/checkReject'
                var reqData      = {}
                    reqData.registerStudentId = re
                this.$http.post(url, reqData).then(function (res){
                    this.singupbabylist();
                    if(res.body.code == '200'){
                        
                    }
                })
                event.stopPropagation();
            },
            singupbabylist () {
                this.babydate = 0
                let that         = this
                var url          = 'registerManage/stdnt/list'
                var reqData      = {}
                    reqData.registerPlanId = this.selectedMail.registerPlanId
                    reqData.pageNum = 1
                    reqData.pageSize = 15
                this.$http.post(url, reqData).then(function (res){
                    if(res.body.code == '200'){
                        let data    = res.body.data;
                        that.items   = data
                    }
                })
            }
        },
        components:{
            'expand-box':ExpandBox
        }
    }
</script>

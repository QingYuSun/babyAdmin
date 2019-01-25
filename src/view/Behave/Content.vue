<template>
    <div class="student-list">
        <expand-box :title="title">
            <div slot="body">
                <div class="box-body no-padding">
                    <div class="columns">
                        <div class="column is-6 is-parent new-performance">
                            <div class="baby-top two-adjust">
                                <input name="name" v-model="form.date" type="date" @input="setMinDate" class="input" placeholder="学校名称"></input>
                            </div>
                            <div class="table-responsive mailbox-messages split">
                                <table class="table table-hover table-striped">
                                    <tbody>
                                    <template v-for="(item,k) in items">
                                        <tr @click="child(item.babyId,item.score)">
                                            <td class="two-adjust">{{item.babyName}}</td>
                                            <td>
                                                <div class="star-wrp pull-right">
                                                    <span class="star medium">{{item.score}}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </template>
                                    </tbody>
                                </table>
                                <!-- /.table -->
                            </div>
                        </div>
                        <div class="column is-6 is-parent">
                             <div v-if="bianliang == 1" class="detail-wrp">
                                <p class="center" style="margin-left: -60px;">
                                    <span class="star big">
                                        <div class="num-wrp">
                                            <span class="num">{{combination}}</span>
                                            <i class="slash">/</i>
                                            <span class="den">15</span>
                                        </div>
                                    </span>
                                </p>
                                <ul>
                                    <li v-if="babyitems.eating == 0 || babyitems.length == 0">
                                        <span class="label">吃饭</span>
                                        <span class="star small gray"></span>
                                        <span class="star small gray"></span>
                                        <span class="star small gray"></span>
                                    </li>
                                    <li v-if="babyitems.eating ==1">
                                        <span class="label">吃饭</span>
                                        <span class="star small"></span>
                                        <span class="star small gray"></span>
                                        <span class="star small gray"></span>
                                    </li>
                                    <li v-if="babyitems.eating ==2">
                                        <span class="label">吃饭</span>
                                        <span class="star small"></span>
                                        <span class="star small"></span>
                                        <span class="star small gray"></span>
                                    </li>
                                    <li v-if="babyitems.eating ==3">
                                        <span class="label">吃饭</span>
                                        <span class="star small"></span>
                                        <span class="star small"></span>
                                        <span class="star small"></span>
                                    </li>
                                    <li v-if="babyitems.drinking == 0 || babyitems.length == 0">
                                        <span class="label">喝水</span>
                                        <span class="star small gray"></span>
                                        <span class="star small gray"></span>
                                        <span class="star small gray"></span>
                                    </li>
                                    <li v-if="babyitems.drinking ==1">
                                        <span class="label">喝水</span>
                                        <span class="star small"></span>
                                        <span class="star small gray"></span>
                                        <span class="star small gray"></span>
                                    </li>
                                    <li v-if="babyitems.drinking ==2">
                                        <span class="label">喝水</span>
                                        <span class="star small"></span>
                                        <span class="star small"></span>
                                        <span class="star small gray"></span>
                                    </li>
                                    <li v-if="babyitems.drinking ==3">
                                        <span class="label">喝水</span>
                                        <span class="star small"></span>
                                        <span class="star small"></span>
                                        <span class="star small"></span>
                                    </li>
                                    <li v-if="babyitems.noonbreak == 0 || babyitems.length == 0">
                                        <span class="label">午休</span>
                                        <span class="star small gray"></span>
                                        <span class="star small gray"></span>
                                        <span class="star small gray"></span>
                                    </li>
                                    <li v-if="babyitems.noonbreak ==1">
                                        <span class="label">午休</span>
                                        <span class="star small"></span>
                                        <span class="star small gray"></span>
                                        <span class="star small gray"></span>
                                    </li>
                                    <li v-if="babyitems.noonbreak ==2">
                                        <span class="label">午休</span>
                                        <span class="star small"></span>
                                        <span class="star small"></span>
                                        <span class="star small gray"></span>
                                    </li>
                                    <li v-if="babyitems.noonbreak ==3">
                                        <span class="label">午休</span>
                                        <span class="star small"></span>
                                        <span class="star small"></span>
                                        <span class="star small"></span>
                                    </li>
                                    <li v-if="babyitems.toilet == 0 || babyitems.length == 0">
                                        <span class="label">上厕所</span>
                                        <a class="star small gray"></a>
                                        <a class="star small gray"></a>
                                        <a class="star small gray"></a>
                                    </li>
                                    <li v-if="babyitems.toilet ==1">
                                        <span class="label">上厕所</span>
                                        <a class="star small"></a>
                                        <a class="star small gray"></a>
                                        <a class="star small gray"></a>
                                    </li>
                                    <li v-if="babyitems.toilet ==2">
                                        <span class="label">上厕所</span>
                                        <a class="star small"></a>
                                        <a class="star small"></a>
                                        <a class="star small gray"></a>
                                    </li>
                                    <li v-if="babyitems.toilet ==3">
                                        <span class="label">上厕所</span>
                                        <a class="star small"></a>
                                        <a class="star small"></a>
                                        <a class="star small"></a>
                                    </li>
                                    <li v-if="babyitems.activity == 0 || babyitems.length == 0">
                                        <span class="label">活动</span>
                                        <span class="star small gray"></span>
                                        <span class="star small gray"></span>
                                        <span class="star small gray"></span>
                                    </li>
                                    <li v-if="babyitems.activity ==1">
                                        <span class="label">活动</span>
                                        <span class="star small"></span>
                                        <span class="star small gray"></span>
                                        <span class="star small gray"></span>
                                    </li>
                                    <li v-if="babyitems.activity ==2" >
                                        <span class="label">活动</span>
                                        <span class="star small"></span>
                                        <span class="star small"></span>
                                        <span class="star small gray"></span>
                                    </li>
                                    <li v-if="babyitems.activity ==3">
                                        <span class="label">活动</span>
                                        <span class="star small"></span>
                                        <span class="star small"></span>
                                        <span class="star small"></span>
                                    </li>
                                </ul>
                                <p v-if="babyitems.activity == 0 || babyitems.length == 0" class="remark">评语:<span>宝宝要加油哦!</span></p>
                                <p v-else class="remark">评语:<span>{{babyitems.remark}}</span></p>
                        </div>
                        <div v-else class="detail-wrp">
                        </div>
                        </div>

                    </div>
                    <!-- /.mail-box-messages -->
                </div>
            </div>
        </expand-box>
    </div>
</template>
<style lang="scss">
    @import "../../scss/skins.scss";

    .student-list{
        .center{
            text-align: center;
        }
        ul{
            margin-top: 1.8rem;
        }
        li{
            line-height: 22px;
        }
        .star{
            display: inline-block;
            text-align: center;
            vertical-align: middle;
            font-size: 10px;
            font-weight: normal;
            color: white;

            background-image: url("../../assets/red-star.svg");
            background-repeat: no-repeat;
            background-size: cover;
            /*text-indent: -2px;*/
            &.medium{
                 height: 28px;
                 width:28px;
                 line-height: 30px;
             }
            &.big{
                 height: 70px;
                 width:70px;
            }
            &.small{
                 height: 22px;
                 width:22px;
                 margin: 0 .8rem;
            }
        }
        .gray{
            background-image: url("../../assets/gray-star.svg");
        }
        .label{
            display: inline-block;
            width: 6rem;
            padding-left: 2rem;
        }
        .num-wrp{
            margin-top: 1.6rem;
            position: relative;
        }
        .num{
            position: relative;
            top: -4px;
            left: 4px;
        }
        .den{
            position: relative;
            top: 4px;
            left: -4px;
        }
        .slash{
            font-size: 18px;
            color: #fff;
            text-align: center;
        }
        .detail-wrp{
            margin: 8rem auto;
            width: 60%;
        }
        .table thead th{
            border-width: 0 0 1px;
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

        .split{
            border-right: 1px solid #f4f4f4;
            min-height: 100%;
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
    .new-performance{
        padding-bottom: 0;
    }
    .remark{
        padding-left: 2rem;
        color: #363636;
        font-weight: 500;
        font-size: 1.1rem;
        margin-top: 1.5rem;
    }
    .baby-top{
        margin: 10px 0;
    }
    .two-adjust{
        padding-left: 18px !important;
    }
</style>
<script>
    import ExpandBox from '../Com/ExpandBox.vue'
    import Doughnut  from '../Com/Doughnut.vue'
    let lists = [
        {
            id:1,
            name:'夏晴',
            status:1

        },
        {
            id:2,
            name:'夏雪',
            status:2

        },
        {
            id:3,
            name:'李白',
            status:3

        },
        {
            id:4,
            name:'张飞',
            status:1

        },
        {
            id:5,
            name:'关羽',
            status:1

        },
    ]
    export default{
        props:{
            classId:Number,
        },
        data(){
            return{
                msg:'hello vue',
                title:'在校表现',
                items:[],
                form:{
                    date:Object
                },
                bianliang:0,
                babyitems:[],
                combination:''
            }
        },
        watch:{
            classId:function () {

                this.bianliang = 0;
                this.refresh();
                this.babyitems = [];
            }
        },
        created:function () {
            this.form.date = moment(new Date().valueOf()).format("YYYY-MM-DD");

            /*this.refresh();*/
            var self = this
            setTimeout(function () {
                console.log('在校表现')
                self.refresh();
            }, 200); 
            console.log(JSON.stringify(this.items)) 
        },
        methods:{
            sexFormat:function (val) {
                let res = 1 == val ? '男' :'女'
                return res
            },
            child:function(val,nme){
                this.babyitems = []
                this.combination = nme
                this.bianliang =1
                let that    = this
                let url     = 'Tevaluation/selectTevaluationAllBybabyid'
                var reqData     = {
                    babyId:val,
                    time:this.form.date,
                    type:5
                }
                console.log("tt")
                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        that.babyitems   = data;
                    }

                },function(res){
                    // 响应错误回调
                });
            },
            setMinDate:function(){
                this.bianliang = 0;
                this.refresh();
                this.babyitems = [];
            },
            refresh:function () {
                let that    = this
                let url     = 'Tevaluation/selectTevaluationScore'
                var reqData     = {
                    classId:this.classId,
                    time:this.form.date,
                    type:5
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
            }
        },

        components:{
            'expand-box':ExpandBox,
            'doughnut':Doughnut
        }
    }
</script>

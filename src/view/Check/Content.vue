<template>
    <div class="student-list">
        <expand-box :title="title">
            <div slot="body">
                <div class="box-body no-padding">
                    <div class="columns">
                        <div class="column is-5 is-parent">
                            <div class="baby-top two-adjust">
                                <input name="name" v-model="form.date" type="date" class="input" placeholder="学校名称" @input="setMinDate" ></input>
                            </div>
                            <doughnut :doughnutData.sync="chartData"></doughnut>
                        </div>
                        <div class="column is-7 is-parent">
                            <div class="table-responsive mailbox-messages split baby-top">
                                <table class="table table-hover table-striped">
                                    <thead>
                                    <tr class="clearpadding">
                                        <th class="new-clear">
                                            <td :class="{forenoon : forIndex == 0}" style="left: 0;" @click="forenoondate">上午</td>
                                            <td :class="{forenoon1 : forIndex == 1}" style="left: 62px;" @click="afternoondate">下午</td>
                                            <td :class="{forenoon2 : forIndex == 2}" style="left: 124px;" @click="Picksend">接送</td>
                                        </th>
                                        <th v-if="gettoschool == 1">
                                            <div class="circle-wrp pull-right wanadd">
                                                <span class="oneright">到校</span>
                                                <span>离校</span>
                                            </div>
                                        </th>
                                        <th v-else>
                                            <div class="circle-wrp pull-right">
                                                <span class="circle is-reach">到</span>
                                                <span class="circle not-reach">未</span>
                                                <span class="circle is-leave">假</span>
                                            </div>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <template v-for="(item,k) in items">
                                        <tr>
                                            <td class="two-adjust">{{item.babyName}}</td>
                                            <td v-if="gettoschool == 1">
                                                <div v-if="item.dataType ==0" class="circle-wrp pull-right">
                                                    <span></span><span></span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                </div>
                                                <div v-if="item.dataType ==1" class="circle-wrp pull-right">
                                                    <span>&nbsp;</span><span>请假</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                </div>
                                                <div v-if="item.dataType ==2" class="circle-wrp pull-right new-hr">
                                                    <span>{{newtime(item.enterTime)}}</span><hr><span>{{newtime(item.outTime)}}</span>
                                                </div>
                                            </td>
                                            <td v-else>
                                                <div class="circle-wrp pull-right">
                                                    <span class="circle" :class="item.state == 1 ? 'is-reach':'is-default'"></span>
                                                    <span class="circle" :class="item.state == 2 ? 'not-reach':'is-default'"></span>
                                                    <span class="circle" :class="item.state == 3 ? 'is-leave':'is-default'"></span>
                                                </div>
                                            </td>
                                        </tr>
                                    </template>
                                    </tbody>
                                </table>
                                <!-- /.table -->
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
        .circle{
            display: inline-block;
            border-radius: 50%;
            height: 20px;
            width:20px;
            background: orange;
            text-align: center;
            vertical-align: middle;
            line-height: 20px;
            font-size: 10px;
            font-weight: normal;
            color: white;
            margin: 0 .4rem;
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

        .is-leave{
            background: #F8B62D;
        }
        .tis-leave{
            background: #5d5b57;
        }
        .not-reach{
            background:#F76969;
        }
        .is-reach{
            background:#6EE8AF;
        }
        .is-default{
            background: #DCDDDD;
        }
        .circle-wrp{
            margin-right: 1rem;
        }

        .split{
            border-left: 1px solid #f4f4f4;
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
    .clearpadding{
        background-color: #f9f9f9;
        height: 46px;
    }
    .clearpadding th{
        border: none !important;
        border-bottom: 1px solid #f4f4f4 !important;
        border-top: 1px solid #f4f4f4 !important;
    }
    .new-clear{
        padding: 0 !important;
        position: relative;
    }
    .new-clear td{
        border: none;
        padding: 14px 18px !important;
        cursor: pointer;
        position: absolute;
        top: 0;
        white-space: nowrap;
    }
    .clearpadding th .forenoon{
        background-color: #fff !important;
        border-bottom: 1px solid #fff !important;
        border-right: 1px solid #f4f4f4;
    }
    .clearpadding th .forenoon1{
        background-color: #fff !important;
        border-bottom: 1px solid #fff !important;
        border-right: 1px solid #f4f4f4;
        border-left: 1px solid #f4f4f4;
    }
    .clearpadding th .forenoon2{
        background-color: #fff !important;
        border-bottom: 1px solid #fff !important;
        border-right: 1px solid #f4f4f4;
        border-left: 1px solid #f4f4f4;
    }
    .wanadd{
        padding-top: 5px;
    }
    .oneright{
        margin-right: 3em;
    }
    .new-hr hr{
        display: inline-block;
        width: 20px;
        margin: 4px 5px;
        background-color: #656464;
    }
    .new-hr span{
        min-width: 35px;
        display: -webkit-inline-box;
    }
    .baby-top{
        margin-top: 10px;
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
                title:'班级点名',
                items:[],
                form:{
                    date:Object
                },
                chartData:Object,
                forIndex:0,     //判断点击的是上午、下午、接送显示效果
                gettoschool:0, //判断是接送还是上午下午
                panless:0,     //时间判断加载什么(上午、下午、接送)
            }
        },
        watch:{
            classId:function () {
                this.forenoondate()
            }
        },
        created:function () {
            this.form.date = moment(new Date().valueOf()).format("YYYY-MM-DD");
            /*this.forenoondate();*/
            var self = this
            setTimeout(function () {
                console.log('考勤管理')
                self.forenoondate()
            }, 200);
        },
        methods:{
            newtime:function(el){
                if (el == null) {
                    return ''
                }
                return moment(el).format('HH:mm')
            },
            getLocalTime:function (val) {
                if (val == null) {
                    return null
                }
                return moment(val).format("HH:mm")
            },
            sexFormat:function (val) {
                let res = 1 == val ? '男' :'女'
                return res
            },
            setMinDate:function(){
                if (this.panless == 0) {
                    this.forenoondate();
                }
                if (this.panless == 1) {
                    this.afternoondate();
                }
                if (this.panless == 2) {
                    this.Picksend();
                }
            },
            Picksend:function(){
                this.gettoschool = 1
                this.panless = 2
                console.log(this.gettoschool);
                let that    = this
                let url     = 'tTimeCard/selectBabyTimeCardByClass'
                var reqData     = {};
                var typedata = 0;
                reqData.classId   = this.classId;
                    this.forIndex = 2;
                reqData.searchTime = this.form.date;

                this.$http.post(url, reqData).then(function (res){
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        that.items   = data
                        // forEach()
                    }
                })
            },
            forenoondate:function(){
                this.gettoschool = 0
                let that    = this
                let url     = 'tBabyattendance/selectAttendanceByClassIdAndType'
                var reqData     = {};
                var typedata = 0;
                reqData.classId   = this.classId;
                this.forIndex = 0;
                this.panless = 0
                reqData.type = typedata;
                reqData.searchTime = this.form.date;
                var d=0;
                var wd=0;
                var qj=0;
                this.$http.post(url, reqData).then(function (res){
                    if(res.body.code == "200") {
                        let data    = res.body.data;


                        
                        data.forEach(function(val){

                            // console.log(this._name + " knows " + f));
                            if(val.state ===1){
                                d++
                            }else if(val.state ===2){
                                wd++
                            }else if (val.state ===3) {
                                qj++
                            } 
                        })
                        
                         that.chartData = {
                            labels: [
                                "到"+' '+'('+d+')',
                                "未"+' '+'('+wd+')',
                                "假"+' '+'('+qj+')'
                            ],
                            datasets: [
                                {
                                    data: [d, wd, qj],
                                    backgroundColor: [
                                        "#6EE8AF",
                                        "#F76969",
                                        "#F8B62D"
                                    ],
                                    hoverBackgroundColor: [
                                        "#6EE8AF",
                                        "#F76969",
                                        "#F8B62D"
                                    ]
                                }]
                        }
                        that.items   = data
                        // forEach()
                        
                    }else if(res.body.code == "400") {
                        this.chartData = {
                            labels: [
                                "到"+' '+'('+d+')',
                                "未"+' '+'('+wd+')',
                                "假"+' '+'('+qj+')'
                            ],
                            datasets: [
                                {
                                    data: [0, 0, 0],
                                    backgroundColor: [
                                        "#6EE8AF",
                                        "#F76969",
                                        "#F8B62D"
                                    ],
                                    hoverBackgroundColor: [
                                        "#6EE8AF",
                                        "#F76969",
                                        "#F8B62D"
                                    ]
                                }]
                        }
                        that.items = []
                    }
                })
            },
            afternoondate:function(){
                this.gettoschool = 0
                let that    = this
                let url     = 'tBabyattendance/selectAttendanceByClassIdAndType'
                var reqData     = {};
                var typedata = 1;
                reqData.classId   = this.classId;
                this.forIndex = 1;
                this.panless = 1
                reqData.type = typedata;
                reqData.searchTime = this.form.date;

                this.$http.post(url, reqData).then(function (res){
                    if(res.body.code == "200") {
                        let data    = res.body.data;


                        var d=0;
                        var wd=0;
                        var qj=0;
                        data.forEach(function(val){

                            // console.log(this._name + " knows " + f));
                            if(val.state ===1){
                                d++
                            }else if(val.state ===2){
                                wd++
                            }else if (val.state ===3) {
                                qj++
                            } 
                        })
                        
                         that.chartData = {
                            labels: [
                                "到"+' '+'('+d+')',
                                "未"+' '+'('+wd+')',
                                "假"+' '+'('+qj+')'
                            ],
                            datasets: [
                                {
                                    data: [d, wd, qj],
                                    backgroundColor: [
                                        "#6EE8AF",
                                        "#F76969",
                                        "#F8B62D"
                                    ],
                                    hoverBackgroundColor: [
                                        "#6EE8AF",
                                        "#F76969",
                                        "#F8B62D"
                                    ]
                                }]
                        }
                        that.items   = data
                        // forEach()
                        
                    }else if(res.body.code == "400") {
                        this.chartData = {
                            labels: [
                                "到"+' '+'('+d+')',
                                "未"+' '+'('+wd+')',
                                "假"+' '+'('+qj+')'
                            ],
                            datasets: [
                                {
                                    data: [0, 0, 0],
                                    backgroundColor: [
                                        "#6EE8AF",
                                        "#F76969",
                                        "#F8B62D"
                                    ],
                                    hoverBackgroundColor: [
                                        "#6EE8AF",
                                        "#F76969",
                                        "#F8B62D"
                                    ]
                                }]
                        }
                        that.items = []
                    }
                })
            }
            /*refresh:function () {
                this.gettoschool = 0
                let that    = this
                let url     = 'tBabyattendance/selectAttendanceByClassId'
                var reqData     = {
                    classId:this.classId,
                    searchTime:this.form.date   
                };
                console.log("tt")
                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;


                        var d=0;
                        var wd=0;
                        var qj=0;
                        data.forEach(function(val){

                            // console.log(this._name + " knows " + f));
                            if(val.state ===1){
                                d++
                            }else if(val.state ===2){
                                wd++
                            }else if (val.state ===3) {
                                qj++
                            } 
                        })
                        
                         that.chartData = {
                            labels: [
                                "到",
                                "未",
                                "假"
                            ],
                            datasets: [
                                {
                                    data: [d, wd, qj],
                                    backgroundColor: [
                                        "#6EE8AF",
                                        "#F76969",
                                        "#F8B62D"
                                    ],
                                    hoverBackgroundColor: [
                                        "#6EE8AF",
                                        "#F76969",
                                        "#F8B62D"
                                    ]
                                }]
                        }
                        that.items   = data
                        
                    }else if(res.body.code == "400") {
                        this.chartData = {
                            labels: [
                                "到",
                                "未",
                                "假"
                            ],
                            datasets: [
                                {
                                    data: [0, 0, 0],
                                    backgroundColor: [
                                        "#6EE8AF",
                                        "#F76969",
                                        "#F8B62D"
                                    ],
                                    hoverBackgroundColor: [
                                        "#6EE8AF",
                                        "#F76969",
                                        "#F8B62D"
                                    ]
                                }]
                        }
                        that.items = []
                    }


                },function(res){
                    // 响应错误回调
                });
            }*/
        },

        components:{
            'expand-box':ExpandBox,
            'doughnut':Doughnut
        }
    }
</script>

<template>
    <div class="student-list">
        <expand-box :title="title">
            <div slot="body">
                <div class="box-body no-padding">
                    <div class="controls two-adjust two-bottom">
                        <a @click="tcheck" class="newtcheck mail-create btn btn-primary ms-yh ">考勤拉取</a>
                    </div>
                    <div class="columns">
                        <div class="column is-5 is-parent">
                            <div class="baby-top two-adjust">
                                <input name="name" v-model="form.date" type="date" class="input" placeholder="学校名称" @input="setMinDate" ></input>
                            </div>
                            <doughnut :doughnutData.sync="chartData"></doughnut>
                        </div>
                        <div class="column is-7 is-parent">
                            <div class="table-responsive mailbox-messages split baby-top">
                                <table class="table table-hover table-striped-beyond">
                                  <!-- <thead> -->
                                    <tr class="clearpadding">
                                        <th></th>
                                        <th></th>

                                        <th>
                                            <div class="get-school">
                                                <span>到校</span>
                                                <span>离校</span>
                                            </div>
                                        </th>
                                    </tr>
                                  <!--  </thead>
                                   <tbody> -->
                                        <template v-for="(item,k) in itemsthree">
                                            <tr @click="changingtime(item.teacherId)">
                                                <td class="two-adjust">{{item.teacherName}}</td>
                                                <td>
                                                    <div v-if="item.giveup !== undefined">
                                                        <span class="circle">假</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div v-if="item.check !== undefined || item.givecheck !== undefined" class="circle-wrp pull-right">
                                                        <span v-if="item.check == undefined"></span>
                                                        <span v-else>{{hhtime(item.check[0].createTime)}}-</span>
                                                        <span v-if="item.givecheck == undefined">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                        <span v-else>{{hhtime(item.givecheck[0].createTime)}}</span>
                                                    </div>
                                                    <div v-else class="circle-wrp pull-right">
                                                        <span>未签到</span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr v-if="item.check !== undefined" v-for="(itemcheck,k) in item.check" :class="displayblock == item.teacherId ? 'pppp':'dddd'" class="time-expand">
                                                <td class="two-adjust">
                                                    <div class="out-school">
                                                        <span>到校</span>
                                                        <span>{{hhtime(itemcheck.createTime)}}</span>
                                                    </div>
                                                </td>
                                               <td>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                            <tr v-if="item.givecheck !== undefined" v-for="(itemgivecheck,k) in item.givecheck" :class="displayblock == item.teacherId ? 'pppp':'dddd'" class="time-expand">
                                                <td  class="two-adjust">
                                                    <div class="out-school">
                                                        <span>离校</span>
                                                        <span>{{hhtime(itemgivecheck.createTime)}}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                            <tr v-if="item.giveup !== undefined" :class="displayblock == item.teacherId ? 'pppp':'dddd'" class="time-expand">
                                                <td colspan="3" class="two-adjust">
                                                    <div class="out-school">
                                                        <span>请假</span>
                                                        <span>{{ newtime(item.startTime)}}-{{ newtime(item.leaveTime)}}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </template>
                                    <!-- </tbody> -->
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
            padding: 13px;

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
            margin-right: 2rem;
        }

        .split{
            border-left: 1px solid #f4f4f4;
            min-height: 100%;
        }
    }


    .table-striped-beyond>tbody>tr:nth-of-type(odd) {
        background-color: #fff;
    }
    .table>thead>tr>th, .table>tbody>tr>th, .table>tfoot>tr>th, .table>thead>tr>td, .table>tbody>tr>td, .table>tfoot>tr>td {
        /*border-top: 1px solid #f4f4f4;*/
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
    .baby-top{
        margin-top: 10px;
    }
    .newtcheck{
        padding: 6px 12px;
    }
    /*.newtcheck:hover{
        background:#f7c766 !important;
        color: #fff;
    }*/
    .two-adjust{
        width: 150px;
        padding-left: 18px !important;
    }
    .two-bottom{
        padding-bottom: 3px !important;
    }
    .get-school{
        text-align: right;
        margin-right: 1em;
    }
    .get-school span{
        font-size: 1em;
        line-height: 42px;
        margin-right: 1em;
    }
    .time-expand{
        background-color: #f5f5f5;
        display: none;
    }
    .out-school span{
        margin-right: 1em;
    }
    .pppp{
        display: table-row;
    }
    .dddd{
        display: none;
    }
</style>
<script>
    import ExpandBox from '../Com/ExpandBox.vue'
    import Doughnut  from '../Com/Doughnut.vue'
    import auth from '../../js/auth'

     import check        from  './Add.vue'
    const checkModalComponent = Vue.extend(check);
    const opentcheck = (propsData = {}) => {
        return new checkModalComponent({
            el: document.createElement('div'),
            propsData
        })
    }


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
                title:'考勤管理',
                items:[],
                itemstwo:[],
                itemsthree:[],
                leavelist:[],
                form:{
                    date:Object
                },
                chartData:Object,
                panless:0,     //时间判断加载什么(上午、下午、接送)
                tgetdate:0,    //老师签到判断是上午还是下午
                tforIndex:0,    //老师签到判断点击的是上午、下午显示效果
                displayblock:-1,
                itemsadd:[],
            }
        },
        created:function () {
            this.form.date = moment(new Date().valueOf()).format("YYYY-MM-DD");
            /*this.forenoondate();*/
            var self = this
            setTimeout(function () {
                console.log('考勤管理')
                self.tamdate()
            }, 200);
        },
        methods:{
            newtime:function(el){
                return moment(el).format('YYYY-MM-DD HH:MM')
            },
            hhtime:function(el){
                return moment(el).format('HH:mm')
            },
            getLocalTime:function (val) {
                if (val == null) {
                    return null
                }
                return moment(val).format("HH:mm")
            },
            changingtime(id){
                if (this.displayblock == id) {
                    this.displayblock = -1
                }else{
                    this.displayblock = id
                }
            },
            tamdate(){
                this.tgetdate=0;
                this.tforIndex=0;
                this.panless = 3;
                this.itemsadd=[];
                let that    = this
                /*let url     = 'attendanceMachine/selectTeacherAttendanceByDate'*/
                let url     = 'attendanceMachine/selectLeaveListWEB'
                var reqData     = {};
                reqData.schoolId = auth.getSchoolId(),
                reqData.date = this.form.date;
                var d=0;
                var wd=0;
                var qj=0;
                this.$http.post(url, reqData).then(function (res){
                    if(res.body.code == "200") {
                        let data    = res.body.data.attendanceList;
                        let Approvaldata    = res.body.data.ApprovalList;
                        let teacherList    = res.body.data.teacherList;

                        
                        that.items   = data;
                        that.itemstwo   = Approvaldata;
                        that.itemsthree   = teacherList;
                        for (let i = 0; i < that.itemstwo.length; i++) {
                            let obj = that.itemstwo[i];
                            let num = obj.teacherId;
                            for (let y = 0; y < that.itemsthree.length; y++) {
                                let aj = that.itemsthree[y];
                                let n = aj.teacherId;
                                if (n == num) {
                                    let jsonarray = that.itemsthree[y];
                                    let arr  = that.itemstwo[i];
                                    jsonarray.giveup = arr;
                                    that.itemsthree[y] = jsonarray;
                                    console.log(that.itemsthree[y]);
                                }
                            }
                        }

                        for (let i = 0; i < that.items.length; i++) {
                            let obj = that.items[i];
                            let num = obj.teacherId;
                            let am = obj.amstate;

                            for (let y = 0; y < that.itemsthree.length; y++) {
                                let aj = that.itemsthree[y];
                                let n = aj.teacherId;
                                if (n == num && am == 1) {

                                    let jsonarray = that.itemsthree[y];
                                    let arr  = that.items[i];
                                    if (!jsonarray.check) {
                                        jsonarray.check = new Array;
                                        jsonarray.check[0] = arr;
                                    }else{
                                        jsonarray.check.push(arr);
                                    }
                                    
                                    that.itemsthree[y] = jsonarray;
                                }
                                if (n == num && am == 2) {

                                    let jsonarray = that.itemsthree[y];
                                    let arr  = that.items[i];
                                    /*jsonarray.givecheck.push(arr);*/
                                    if (!jsonarray.givecheck) {
                                        jsonarray.givecheck = new Array;
                                        jsonarray.givecheck[0] = arr;
                                    }else{
                                        jsonarray.givecheck.push(arr);
                                    }
                                    that.itemsthree[y] = jsonarray;
                                    that.itemsthree[y]
                                }
                            }
                        }

                        console.log(that.itemsthree);
                        that.itemsthree.forEach(function(val){

                                /*if (val.attendance != null) {*/
                                    // console.log(this._name + " knows " + f));
                                    if(val.check !== undefined || val.givecheck !== undefined){
                                        d++
                                    }else if(val.check == undefined && val.givecheck == undefined){
                                        wd++
                                    }else if (val.giveup !== undefined) {
                                        qj++
                                    }
                                /*}else{
                                    wd++
                                }*/
                            })
                            
                             that.chartData = {
                                labels: [
                                "到"+' '+'('+d+')',
                                "未"+' '+'('+''+wd+')',
                                "假"+' '+'('+''+qj+')'
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
                    }else if(res.body.code == "400") {
                        this.chartData = {
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
                        that.items = []
                    }
                })
            },
            tpmdate(){
                this.tgetdate=1;
                this.tforIndex=1;
                this.panless = 4
                let that    = this
                let url     = 'attendanceMachine/selectTeacherAttendanceByDate'
                var reqData     = {};
                reqData.date = this.form.date;

                this.$http.post(url, reqData).then(function (res){
                    if(res.body.code == "200") {
                        let data    = res.body.data;


                        var d=0;
                        var wd=0;
                        var qj=0;
                            data.forEach(function(val){
                                if (val.attendance != null) {
                                    // console.log(this._name + " knows " + f));
                                    if(val.attendance.pmstate ===4){
                                        d++
                                    }else if(val.attendance.pmstate ===null){
                                        wd++
                                    }else if (val.attendance.pmstate ===3) {
                                        qj++
                                    }
                                }else{
                                    wd++
                                }
                            })
                            
                             that.chartData = {
                                labels: [
                                "到"+' '+'('+d+')',
                                "未"+' '+'('+wd+')',
                                "早"+' '+'('+qj+')'
                                ],
                                datasets: [
                                    {
                                        data: [d, wd, qj],
                                        backgroundColor: [
                                            "#6EE8AF",
                                            "#F76969",
                                            "#5d5b57"
                                        ],
                                        hoverBackgroundColor: [
                                            "#6EE8AF",
                                            "#F76969",
                                            "#5d5b57"
                                        ]
                                    }]
                            }
                        that.items   = data
                        
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
            sexFormat:function (val) {
                let res = 1 == val ? '男' :'女'
                return res
            },
            setMinDate:function(){
                this.leavelist = [];
                if (this.panless == 3) {
                    this.tamdate();
                }
                if (this.panless == 4) {
                    this.tpmdate();
                }
            },
            tcheck(){
                opentcheck({visible:true})
            }
        },
        components:{
            'expand-box':ExpandBox,
            'doughnut':Doughnut
        }
    }
</script>

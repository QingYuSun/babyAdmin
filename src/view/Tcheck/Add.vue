<template>
    <box-modal :title="title" :visible="true" transition="roll">
        <div class="msg-wrp pullbottom">
            <div>
                <div class="control is-horizontal">
                     <div class="flex">
                        <div>
                            <input type="text" @click="openByDialog" :value="calendar4.display" readonly>
                        </div>
                        <button type="submit" @click="duoyu" class="button is-primary pulldata">拉取</button>
                    </div>
                    <transition name="fade">
                        <div class="calendar-dialog" v-if="calendar4.show">
                            <div class="calendar-dialog-mask" @click="closeByDialog"></div>
                            <div class="calendar-dialog-body">
                                <calendar :range="calendar4.range" :zero="calendar4.zero" :lunar="calendar4.lunar" :value="calendar4.value"  @select="calendar4.select"></calendar>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
            <!-- <div class="button-group">
                <div class="control pull-left">
                    <button @click="doCancel" type="submit" class="button is-cancel">取消</button>
                </div>
                <div style="margin-top: 20px;text-align: center;" class="control">
                    <button type="submit" @click="duoyu" class="button is-primary">确认</button>
                </div>
            </div> -->
        </div>
    </box-modal>
</template>
<style lang="scss">
    .pulldata{
        margin-top: 25px;
        margin-left: 20px;
    }
    .pullbottom{
        margin-bottom: 400px;
    }
    .msg-wrp{
        padding: 2rem;
        /*margin-bottom: 400px;*/
        .label{
            font-weight: normal;
        }
        .button-group{
            padding: .8rem .2rem;
        }
        .tab-cont{
            padding: .8rem .2rem;
        }
        .select select{
            width: 100%;
        }
    }
    .huoqu{
        background-color: #f8b62d;
        border: 0;
        border-radius: 0;
        color: #fff;
        width: 10%;
    }
    .flex{
    box-sizing: border-box;

    display: -webkit-box;
    -webkit-box-pack: start;
    -webkit-box-align: start;

    display: -webkit-flex;
    -webkit-justify-content: space-between;
    -webkit-align-items: top;

    display: flex;
    justify-content: space-between;
    align-items: top;
    flex-flow:row wrap
}
.flex>div{
    /*margin:10px;
    padding:20px;*/
    width:25%;
    min-width:300px;
    /*border: 1px solid #eee;*/
    border-radius: 2px;
    position: relative;
}
.flex>div>span{
    position: absolute;
    left:0px;
    top:0px;
    padding:2px 10px;
    font-size:10px;
    border-radius:0 0 2px 0;
    background:#ea6151;
    color:#fff;
}
.flex>div>input{
    box-sizing: border-box;
    width:100%;
    margin-top:20px;
    border-radius: 2px;
    border:1px solid #dedede;
    padding:10px;
    font-size: 16px;
    background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwpAZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6IGlmb250OyBzcmM6IHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuZW90PyNpZWZpeCIpIGZvcm1hdCgiZW1iZWRkZWQtb3BlbnR5cGUiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS53b2ZmIikgZm9ybWF0KCJ3b2ZmIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUudHRmIikgZm9ybWF0KCJ0cnVldHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LnN2ZyNpZm9udCIpIGZvcm1hdCgic3ZnIik7IH0KCl1dPjwvc3R5bGU+PC9kZWZzPjxnIGNsYXNzPSJ0cmFuc2Zvcm0tZ3JvdXAiPjxnIHRyYW5zZm9ybT0ic2NhbGUoMC4wMTU2MjUsIDAuMDE1NjI1KSI+PHBhdGggZD0iTTcxMS4zMDYyIDI5MC42OTcyYzI0LjI4MjEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTU0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMjYgMC00My45ODggMTkuNzI4NC00My45ODggNDQuMDUzNXYyMDAuMTA0OTZDNjY3LjMxODMgMjcwLjk5MDMgNjg3LjAwMzYgMjkwLjY5NzIgNzExLjMwNjIgMjkwLjY5NzJ6TTYyMy40ODA4IDExMy40MjAzSDQwMC43NjQ5Mjh2NjYuNTEzOTJoMjIyLjcxNTkwNDAwMDAwMDAyVjExMy40MjAyODh6TTg4NC4wNTMgMTEzLjQyMDNoLTgyLjc3NDAxNnY2Ni4xNDUyOGg4NS45NDAyMjRjMjUuMjc4NSAwIDQ2LjYxMTUgMjEuMzc2IDQ2LjYxMTUgNDYuNjc3djE1My45Mjc2OEg5MC40Mzg2NTYwMDAwMDAwMXYtMTUzLjkyNzY4YzAtMjUuMyAyMS4zMzMtNDYuNjc3IDQ2LjYxMTUtNDYuNjc3aDg2LjUwMzQyNFYxMTMuNDIwMjg4aC04Mi42NDI5NDRjLTY0LjA4NiAwLTExNi41MDc2IDUyLjUwODctMTE2LjUwNzYgMTE2LjcwMzJ2Njc2LjgwMTUzNTk5OTk5OTljMCA2NC4xNzQxIDUwLjQ5MTQgMTE2LjY4MDcgMTE0LjU3NzQgMTE2LjY4MDdIODg0LjA1Mjk5MmM2NC4wNjI1IDAgMTE2LjUwNjYtNTIuNTA2NiAxMTYuNTA2Ni0xMTYuNjgwN1YyMzAuMTIzNTE5OTk5OTk5OThDMTAwMC41NTk2IDE2NS45MjkgOTQ4LjExNDQgMTEzLjQyMDMgODg0LjA1MyAxMTMuNDIwM3pNOTMzLjgyOTYgOTEwLjM1MTRjMCAyNS4zLTIxLjMzMyA0Ni42NzYtNDYuNjExNSA0Ni42NzZIMTM3LjA1MDExMTk5OTk5OTk4Yy0yNS4yNzg1IDAtNDYuNjExNS0yMS4zNzYtNDYuNjExNS00Ni42NzZWNDQ2LjQ0NTU2OEg5MzMuODI5NjMyVjkxMC4zNTEzNnpNMjY3LjEwODQgNjQ2LjE4MTljMzYuODc3MyAwIDY2Ljc1MjUtMjkuOTM5NyA2Ni43NTI1LTY2Ljg4MTUgMC0zNi45MjI0LTI5Ljg3NTItNjYuODYxMS02Ni43NTI1LTY2Ljg2MTEtMzYuODU0OCAwLTY2Ljc1MjUgMjkuOTM5Ny02Ni43NTI1IDY2Ljg2MTFDMjAwLjM1NTggNjE2LjI0MjIgMjMwLjI1MjUgNjQ2LjE4MTkgMjY3LjEwODQgNjQ2LjE4MTl6TTUxMS41NDg0IDY0Ni4xODE5YzM2Ljg1NTggMCA2Ni43NTI1LTI5LjkzOTcgNjYuNzUyNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTU3LTY2Ljg2MTEtNjYuNzUyNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzQ0NC43OTU5IDYxNi4yNDIyIDQ3NC42NzExIDY0Ni4xODE5IDUxMS41NDg0IDY0Ni4xODE5ek0yNjUuOTE2NCA4OTAuNzA5YzM2Ljg3NzMgMCA2Ni43NTE1LTI5LjkzOTcgNjYuNzUxNS02Ni44NjExIDAtMzYuOTQyOC0yOS44NzQyLTY2Ljg4MjYtNjYuNzUxNS02Ni44ODI2LTM2Ljg1NTggMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44ODI2QzE5OS4xNjM5IDg2MC43NjkzIDIyOS4wNTk2IDg5MC43MDkgMjY1LjkxNjQgODkwLjcwOXpNNTExLjU0ODQgODkwLjcwOWMzNi44NTU4IDAgNjYuNzUyNS0yOS45Mzk3IDY2Ljc1MjUtNjYuODYxMSAwLTM2Ljk0MjgtMjkuODk1Ny02Ni44ODI2LTY2Ljc1MjUtNjYuODgyNi0zNi44NzczIDAtNjYuNzUyNSAyOS45Mzk3LTY2Ljc1MjUgNjYuODgyNkM0NDQuNzk1OSA4NjAuNzY5MyA0NzQuNjcxMSA4OTAuNzA5IDUxMS41NDg0IDg5MC43MDl6TTc1NS42NDEzIDY0Ni4xODE5YzM2Ljg1NjggMCA2Ni43NTM1LTI5LjkzOTcgNjYuNzUzNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTY3LTY2Ljg2MTEtNjYuNzUzNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzY4OC44ODk5IDYxNi4yNDIyIDcxOC43NjQgNjQ2LjE4MTkgNzU1LjY0MTMgNjQ2LjE4MTl6TTMxMS43MDM2IDI5MC42OTcyYzI0LjI4MTEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTQ0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMTYgMC00My45ODkgMTkuNzI4NC00My45ODkgNDQuMDUzNXYyMDAuMTA0OTZDMjY3LjcxNDYgMjcwLjk5MDMgMjg3LjQwMiAyOTAuNjk3MiAzMTEuNzAzNiAyOTAuNjk3MnoiIGZpbGw9IiM1ZTdhODgiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==) no-repeat 8px 10px;
        padding-left: 36px;
        color:#666;
}

/*transition*/
.fade-enter-active,
.fade-leave-active {
    transition: all .5s ease-in-out;
}
.fade-enter,.fade-leave-active{
    opacity: 0;
    transform: translateY(-10px);

}

/*下拉框*/
.calendar-dropdown{
    background: #fff;
    position: absolute;
    left:0;
    top:0;
    padding:20px;
    border: 1px solid #eee;
    border-radius: 2px;
}
.calendar-dropdown:before {
    position: absolute;
    left:30px;
    top: -10px;
    content: "";
    border:5px solid rgba(0, 0, 0, 0);
    border-bottom-color: #DEDEDE;
}
.calendar-dropdown:after {
    position: absolute;
    left:30px;
    top: -9px;
    content: "";
    border:5px solid rgba(0, 0, 0, 0);
    border-bottom-color: #fff;
}

/*弹出框*/
.calendar-dialog{
    position: absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
}

.calendar-dialog-mask{
    background:rgba(255,255,255,.5);
    width:100%;
    height:100%;
}

.calendar-dialog-body{
    background: #fff;
    position: absolute;
    left:30%;
    top:387%;
    transform: translate(-50%,-50%);
    padding:20px;
    border: 1px solid #eee;
    border-radius: 2px;
}
</style>
<script>
    import BoxModal from '../Com/BoxModal.vue'
    import auth from '../../js/auth'
    import calendar from './calendar.vue'
    export default{
        name:'newMsg',
        data(){
            return{
                title:'考勤拉取',
                machine:'',
                items:'',
                calendar1:{
                value:[2018,2,16], //默认日期
                // lunar:true, //显示农历
                weeks:['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                months:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                events:{
                    '2018-2-14':'$408','2018-2-15':'$460','2018-2-16':'$500',
                },
                webstrtDate:'',
                webendDate:'',
                webpulldate:'',
                select(value){
                    console.log(value.toString());
                }
            },
            calendar2:{
                range:true,
                value:[[2018,3,16],[2019,3,16]], //默认日期
                lunar:true, //显示农历
                begin:[2017,2,16], //可选开始日期
                end:[2019,2,16], //可选结束日期
                select(begin,end){
                    // console.log(begin.toString(),end.toString());
                }
            },
            calendar3:{
                display:"2018/02/16",
                show:false,
                zero:true,
                value:[2018,1,16], //默认日期
                lunar:true, //显示农历
                select:(value)=>{
                    this.calendar3.show=false;
                    this.calendar3.value=value;
                    this.calendar3.display=value.join("/");
                }
            },
            calendar4:{
                display:"2018/02/16 ~ 2019/02/16",
                show:false,
                range:true,
                zero:true,
                value:[[2018,2,16],[2018,2,19]], //默认日期
                lunar:true, //显示农历
                select:(begin,end)=>{
                    /*console.log(JSON.stringify(begin));
                    console.log(JSON.stringify(this.calendar4.display));
                    console.log(begin,end)*/
                    this.calendar4.show=false;
                    this.calendar4.value=[begin,end];
                    this.calendar4.display=begin.join("-")+" ~ "+end.join("-");
                    this.webendDate = end.join("-");
                    this.webstrtDate = begin.join("-");
                }
            },
            }
        },
        props:{
            callback:Object,
        },
        watch:{
            calendar4(){
                console.log(this.calendar4.display);
            }
            
        },
        created:function(){
            var pulldate = new Date();
            /*console.log(JSON.stringify(pulldate));*/

            var YYn = pulldate.getFullYear();
            var MMy = pulldate.getMonth()+1;
            var NNr = pulldate.getDate();

            this.calendar4.value = [[YYn,MMy,NNr],[YYn,MMy,NNr]];
            this.calendar4.display = YYn+'/'+MMy+'/'+NNr+'~'+YYn+'/'+MMy+'/'+NNr;
        },
        methods:{
            doCancel:function () {
                document.querySelector(".modal-close").click();
            },
            doAddhardware(){
                let that = this
                var url          = 'hardWare/insertTschoolMachine'
                var reqData = {};
                    reqData.machineName = this.machine;
                    reqData.schoolId = auth.getSchoolId();

                this.$http.post(url, reqData).then(function (res){
                    if(res.body.code == 200){
                        let data    = res.body.data;
                        that.items = data
                    }
                })
            },
            export2Excel() {
    　　　　　　require.ensure([], () => {
    　　　　　　　　const { export_json_to_excel } = require('../vendor/Export');
    　　　　　　　　const tHeader = ['老师', '职位', '出勤天数', '缺卡次数', '早退','迟到','早退率','迟到率'];
    　　　　　　　　const filterVal = ['teacherName', 'position', 'daysOfAttendance', 'notAttendance', 'leaveArly','late','leaveArlyRate','lateRate'];
                  /*console.log(JSON.stringify(this.items));
                  console.log(JSON.stringify(this.items[0].recipe));*/
                  /*const  mondaydate = this.items[0].recipe.split('¨');
                  const  tuesday = this.items[1].recipe.split('¨');
                  const  wednesday = this.items[2].recipe.split('¨');
                  const  thursday = this.items[3].recipe.split('¨');
                  const  friday = this.items[4].recipe.split('¨');*/
                  let pullchange = JSON.parse(JSON.stringify(this.webpulldate));  
                  console.log(pullchange.length);
                  for (var i = pullchange.length; i >= 0; i--) {
                      var pullitem = pullchange[i];
                      if (pullitem == null) {
                        /*pullchange.splice(1,2)*/
                        pullchange.splice(i,1)
                        continue;
                      }
                    }
    　　　　　　　　const list = pullchange;
                    console.log(list);
                  /*console.log(JSON.stringify(this.items.recipe));*/
    　　　　　　　　const data = this.formatJson(filterVal, list);
    　　　　　　　　export_json_to_excel(tHeader, data, '列表excel');
                  this.$notify({title: '成功',message: '拉取成功',type: 'success'});
    　　　　　　})
    　　　　},
            formatJson(filterVal, jsonData) {
    　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
    　　　　},
            duoyu(){
                var that = this
                /*var url          = 'report/OutExcelFromTeacher'*/
                var url          = 'report/OutFromTeacher'
                var reqData = {};
                    reqData.strtDate = this.webstrtDate,
                    reqData.endDate = this.webendDate,
                    reqData.schoolId = auth.getSchoolId();
                    reqData.url = ''

                this.$http.post(url, reqData).then(function (res){
                    console.log(res.body);
                    if(res.body.code == 200){
                        this.webpulldate = res.body.data;
                        this.export2Excel();
                        if (res.body.data[0] == null) {
                            /*this.$notify({title: '失败',message: '拉取失败,数据为空',type: 'warning'});*/
                        }
                    }else{
                        this.$notify({title: '失败',message: '拉取失败',type: 'warning'});
                    }
                })
            },
            openByDrop(e){
            this.calendar3.show=true;
            this.calendar3.left=e.target.offsetLeft+19;
            this.calendar3.top=e.target.offsetTop+70;
           
            e.stopPropagation();
            window.setTimeout(()=>{
                document.addEventListener("click",(e)=>{
                    this.calendar3.show=false;
                    document.removeEventListener("click",()=>{},false);
                },false);
            },1000)
        },
        openByDialog(){
            this.calendar4.show=true;
        },
        closeByDialog(){
            this.calendar4.show=false;
        }
        },
        components:{
            'box-modal':BoxModal,
            calendar
        }
    }
</script>

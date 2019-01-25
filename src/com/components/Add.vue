<template>
     <box-modal :title="title" :visible="true" transition="roll">
        <div class="msg-wrp">
            <div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">标题:</label>
                    </div>
                    <p class="control">
                        <input name="username" v-model="eventtitle" class="input" type="text" placeholder="标题">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">内容:</label>
                    </div>
                    <p class="control">
                        <textarea name="describe" v-model="eventcenter" placeholder="标题内容" class="textarea"></textarea>
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">时间:</label>
                    </div>
                    <p class="control">
                        <input name="username" class="input" type="time" v-model="stagetime" placeholder="标题">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">全天:</label>
                    </div>
                    <p class="control">
                        <!-- <input name="username" class="input" type="time" v-model="stagetime" placeholder="标题"> -->
                        <input type="checkbox" id="selectallTeacherId" class="chk_2" v-model="AllDay" value="1" @click="handleCheckAll" />
                        <label for="selectallTeacherId"></label>
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">备注:</label>
                    </div>
                    <p class="control">
                        <textarea name="describe" v-model="eventremarks" placeholder="备注" class="textarea"></textarea>
                    </p>
                </div>
            </div>


            <div class="button-group">
                <div class="control pull-left">
                    <button @click="doCancel" type="submit" class="button is-cancel">取消</button>
                </div>
                <div class="control pull-right">
                    <button style="background: #f29543;" type="submit" @click="doAdd" class="button is-primary three-is">提交</button>
                </div>
            </div>
        </div>
    </box-modal>
</template>
<style lang="scss">
    .msg-wrp{
        padding: 2rem;
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
    .chk_2 { 
    display: none; 
} 
 
.chk_2 + label { 
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
    margin-top: 5px;
} 
.chk_2:checked + label:after {
    background: url(../../assets/blue.png) no-repeat;
    background-position: -22px 0;
    content:"";
    display:inline-block;
    height:100%;
    width:100%;
}
.three-is:hover{
    background:#f7c766 !important;
    color: #fff;
}
</style>
<script>
    import BoxModal from './BoxModal.vue'
    export default{
        name:'newMsg',
        data(){
            return{
                title:'新建事件',
                stagetime:'',
                eventtitle:'',
                eventcenter:'',
                eventremarks:'',
                AllDay:0
            }
        },
        props:{
            addtempDate:Object,
            gocallback:Object,
        },
        computed: {
            currentId () {
                return this.$store.state.tree.current
            }
        },
        methods:{
            handleCheckAll(){
                if (this.AllDay) {
                    this.AllDay = 1
                }else{
                    this.AllDay = 0
                }
                console.log(this.AllDay)
            },
            doCancel:function () {
                document.querySelector(".modal-closess").click();
            },
            doAdd:function () {
                /*alert(this.addtempDate);
                console.log(this.addtempDate.replace(/\//g,'-') + " " + this.stagetime);
                alert(this.stagetime);*/
                if (this.stagetime == ''&& this.AllDay == 0) {
                    alert('请选择全天或时间段')
                    return
                }

                var stringTime = this.addtempDate.replace(/\//g,'-') + " " + this.stagetime;
                var timestamp2 = Date.parse(new Date(stringTime));
                //2014-07-10 10:21:12的时间戳为：1404958872 
                console.log(stringTime + "的时间戳为：" + timestamp2);
                let that         = this
                var url          = 'tSchedule/insertSchedule'
                var reqData      = {}
                reqData.scheduleDate = timestamp2
                reqData.isAllDay = this.AllDay
                reqData.content = that.eventcenter
                reqData.title = that.eventtitle
                reqData.remark = that.eventremarks
                reqData.scheduleStartDate = timestamp2

                that.$http.post(url, reqData).then(function (res){
                    if(res.body.code == '200'){
                        this.$notify({title: '成功',message: '事件添加成功',type: 'success'});
                        this.doCancel();
                        this.gocallback();
                    }
                })
            }
        },
        components:{
            'box-modal':BoxModal
        }
    }
</script>

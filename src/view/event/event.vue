<template>
  <vue-event-calendar :events="demoEvents"></vue-event-calendar>
</template>
<script>
    export default{
        data(){
            return{
                demoEvents: []
            }
        },
        created:function () {
            /*this.eventtime();*/
            var self = this
            setTimeout(function () {
                console.log('时间事件')
                self.eventtime();
            }, 200);
        },
        methods:{
            eventtime:function(){
                this.$store.commit('TREE_SELECT',0)
                var date = new Date();
                let that    = this
                let url     = 'tSchedule/selectScheduleList'
                var reqData     = {}
                reqData.year = date.getFullYear();
                reqData.month = parseInt(date.getMonth()) + 1;

                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        that.demoEvents   =  data
                        for (var i = 0; i < that.demoEvents.length; i++) {
                            that.demoEvents[i].scheduleDate = moment(that.demoEvents[i].scheduleDate).format('YYYY/MM/DD')
                            that.demoEvents[i].scheduleStartDate = moment(that.demoEvents[i].scheduleStartDate).format('hh:mm:ss')

                            console.log(moment(that.demoEvents[i].scheduleDate).format('YYYY/MM/DD'))
                        }

                    }
                },function(res){
                    // 响应错误回调
                });
            }
        }
    }
</script>
<style>
    #two-modal-close:before {
    -webkit-transform: rotate(90deg) !important;
    transform: rotate(90deg) !important;
  }
  #two-modal-close:after {
    -webkit-transform: rotate(0deg) !important;
    transform: rotate(0deg) !important;
  }
  #two-modal-close:hover {
    background-color:transparent !important;
  }
</style>
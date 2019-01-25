<template>
  <div>
    <!--<div class="tile is-ancestor">-->
      <!--<div class="tile is-parent">-->
        <!--<article class="tile is-child box">-->
          <!--<p class="title is-4">月新增患者</p>-->
          <!--<p class="subtitle">{{ Num.newUserNum }}人</p>-->
        <!--</article>-->
      <!--</div>-->
      <!--<div class="tile is-parent">-->
        <!--<article class="tile is-child box">-->
          <!--<p class="title is-4">患者总数</p>-->
          <!--<p class="subtitle">{{ Num.userNum }}人</p>-->
        <!--</article>-->
      <!--</div>-->
      <!--<div class="tile is-parent">-->
        <!--<article class="tile is-child box">-->
          <!--<p class="title is-4">月新增医生</p>-->
          <!--<p class="subtitle">{{Num.newDoctorNum}}人</p>-->
        <!--</article>-->
      <!--</div>-->
      <!--<div class="tile is-parent">-->
        <!--<article class="tile is-child box">-->
          <!--<p class="title is-4">医生总数</p>-->
          <!--<p class="subtitle">{{Num.doctorNum}}人</p>-->
        <!--</article>-->
      <!--</div>-->
    <!--</div>-->
    <div class="tile is-ancestor">
      <div class="tile is-4 is-parent">
        <school></school>
      </div>
    </div>

  </div>
</template>
<script>
  import ExpandBox from './Com/ExpandBox.vue'
  import School from  './Com/School.vue'
//  import Message from 'vue-bulma-message'

  export default {
      name:'Index',
    components: {
        'expand-box':ExpandBox,
        'school':School
    },
    data () {
      return {
        data: [300, 50, 100,50],
        totalDoctorCount:0,
        balanceDate:1,
        //如果没有读取到数据，直接默认为0[刘]
        Num:{
          userNum: 0,
          newUserNum: 0,
          newDoctorNum: 0,
          doctorNum: 0,
        }
      }
    },
    computed: {
        monthClosingHint:function () {
            let balanceDate = this.balanceDate
            return `结算日期已设定为本月号,请及时操作!`
        }
    },
    //进入页面便开始通过create方法得到接口链接numsUrl[刘]
    created:function () {
//      let that            = this
//      var numsUrl         = V.debugUrl+'statisticsAdmin/userAndDoctorCount';
//      var numReqData      = {
//        pageSize:30
//      };
//      //链接接口，如果返回SUCCEED，就得到res.body.date内容，赋值给Num[刘]
//      this.$http.get(numsUrl,{params:numReqData}).then(function (res) {
//        if(res.body.status == "SUCCEED") {
//          this.Num = res.body.data;
//        }
//      });
//      //得到结算日期中值[刘]
//      var closingHintUrl = V.debugUrl+'systemSettingAdmin/queryMonthClosingHintSetting';
//
//      this.$http.get(closingHintUrl).then(function (res) {
//          if(res.body.status == "SUCCEED") {
//              that.balanceDate = res.body.data.value;
//          }
//      });
    },
  }
</script>

<style lang="scss" scoped>
</style>

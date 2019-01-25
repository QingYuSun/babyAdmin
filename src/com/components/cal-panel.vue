<template>
  <div class="cal-wrapper" style="padding: 0 50px;">
    <div style="padding-top: 30px;" class="cal-header">
      <div class="l" @click="preMonth"><div class="arrow-left icon">&nbsp</div></div>
      <div class="title">{{curYearMonth}}</div>
      <div class="r" @click="nextMonth"><div class="arrow-right icon">&nbsp</div></div>
    </div>
    <div class="cal-body" style="background: #fff">
      <div class="weeks">
        <span v-for="dayName in i18n[calendar.options.locale].dayNames" class="item">{{dayName}}</span>
      </div>
      <div class="dates" >
        <div v-for="date in dayList" class="item"
          :class="{
            today: date.status ? (today==date.date) : false,
            event: date.status ? (date.title != undefined) : false
          }">
          <p :class="{ 'class-a': date.date == clickdata, 'date-num': true,'date-size': true}"
            @click="handleChangeCurday(date)"
            :style="{color: (date.title != undefined) ? calendar.options.color : 'inherit'}">{{date.status ? date.date.split('/')[2] : '&nbsp'}}</p>
          <span v-if="date.status ? (today==date.date) : false" class="is-today" :style="style.todayStyle" ></span>
          <span v-if="date.status ? (date.title != undefined) : false" :class="{'is-event' : date.date == clickdata}" style="position: absolute;font-size: 50px;top: -15%;left: 42%;">.</span>
          <span v-if="date.status ? (date.title == undefined) : false" :class="{'is-today' : date.date == clickdata}" style="color: #fff;"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import i18n from '../i18n.js'
import { dateTimeFormatter, isEqualDateStr} from '../tools.js'
/*:class=[{"is-today":(date.date == clickdata)},("date-num")]*/
const inBrowser = typeof window !== 'undefined'
export default {
  name: 'cal-panel',
  data () {
    return {
      i18n,
      clickdata:'',
    }
  },
  props: {
    events: {
      type: Array,
      required: true
    },
    calendar: {
      type: Object,
      required: true
    },
  },
  created () {
    let dateObj = new Date();
    this.calendar.params.curYear = dateObj.getFullYear();
    this.calendar.params.curMonth = dateObj.getMonth();
    this.calendar.params.curDate = dateObj.getDate();
  },
  computed: {
    dayList () {
        let firstDay = new Date(this.calendar.params.curYear+'/'+(this.calendar.params.curMonth+1)+'/01')
        let startTimestamp = firstDay-1000*60*60*24*firstDay.getDay()
        let item, status, tempArr = [], tempItem
        if (this.calendar.options.locale === 'es') {
          startTimestamp = startTimestamp + 1000*60*60*24
        }
        for (let i = 0 ; i < 42 ; i++) {
            item = new Date(startTimestamp + i*1000*60*60*24)
            if (this.calendar.params.curMonth === item.getMonth()) {
              status = 1
            } else {
              status = 0
            }
            tempItem = {
              date: `${item.getFullYear()}/${item.getMonth()+1}/${item.getDate()}`,
              status: status
            }
            this.events.forEach((event) => {
              if (isEqualDateStr(event.scheduleDate, tempItem.date)) {
                tempItem.title = event.title
                tempItem.desc = event.desc || ''
              }
            })
            tempArr.push(tempItem)
        }
        return tempArr
    },
    today () {
      let dateObj = new Date()
      return `${dateObj.getFullYear()}/${dateObj.getMonth()+1}/${dateObj.getDate()}`
    },
    curYearMonth () {
      let tempDate = Date.parse(new Date(`${this.calendar.params.curYear}/${this.calendar.params.curMonth+1}/01`))
      return dateTimeFormatter(tempDate, this.i18n[this.calendar.options.locale].format)
    },
    style () {
      let style = {
        todayStyle: {
          backgroundColor: this.calendar.options.color,
          borderColor: this.calendar.options.color
        },
        eventStyle: {
          borderColor: this.calendar.options.color
        }
      }
      return style
    }
  },
  methods: {
    nextMonth () {
      this.$EventCalendar.nextMonth();
      this.$emit('monthly-day', 1)
      /*this.events = this.demoEvents
      console.log(JSON.stringify(this.events)+'calendar');*/
    },
    preMonth () {
      this.$EventCalendar.preMonth();
      this.$emit('monthly-day', 2)
      /*this.events = this.demoEvents
      console.log(JSON.stringify(this.events)+'calendar');*/

    },
    handleChangeCurday (date) {
      /*if (date.title != undefined) {*/
        this.clickdata = date.date;
        if (this.clickdata == date.date) {
        }
/*        console.log(JSON.stringify(this.clickdata));
        console.log(JSON.stringify(date.date));*/
        this.$emit('cur-day-changed', date.date)
    }
  }
}
</script>
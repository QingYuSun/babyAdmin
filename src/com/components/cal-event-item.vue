<template>
  <div class="wrapper">
    <h3 style="margin-bottom: 0;" class="title">{{index+1}}. {{event.title}}</h3>
    <p class="time">{{dateTimeFormatter(Date.parse(new Date(event.scheduleDate)),i18n[locale].fullFormat)}}</p>
    <p v-if="event.isAllDay == 1" class="desc" style="padding: 2px 0;">全天</p>
    <p v-if="event.isAllDay == 0" style="margin-top: 5px;" class="desc">{{event.scheduleStartDate}}</p>
    <p style="padding: 2px 0" class="desc">{{event.content}}</p>
  </div>
</template>
<script>
import i18n from '../i18n.js'
import { dateTimeFormatter } from '../tools.js'
export default {
  data () {
    return {
      i18n
    }
  },
  props: {
    event: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    locale: {
      type: String,
      required: true
    }
  },
  methods: {
    dateTimeFormatter
  }
}
</script>
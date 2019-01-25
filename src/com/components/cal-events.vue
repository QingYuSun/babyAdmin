<template>
  <div class="events-wrapper" style="background: #fff;">
    
    <h2 class="date" style="position: relative;text-align: left;
    font-size: 1.5rem;background: #fff;color: #737373;margin: 0;">
      {{dayEventsTitle}}
      <h2 class="textright" style="position: absolute;top: 3px;right: -290px;font-size: 1.4rem;"><button v-if="chooseadd != ''" style="position: absolute;right: -18px;top: -3px;width: 30px;height: 30px;margin-right: 10px;z-index: 2" class="modal-close" id="two-modal-close"></button><a @click="addevent" style="    z-index: 2;
    position: relative;
    color: #fff;
    margin-right: 20px;
" href="javascript:;">{{chooseadd}}</a>
<i v-if="chooseadd != ''" style="    position: absolute;top: 3px;
    width: 120px;
    height: 30px;
    position: absolute;
    top: -2px;
    right: -10px;
    font-size: 1.4rem;
    background-color: #f8b62d;
    border-radius: 20px;"></i>
</h2>
      
    </h2>
      <div class="cal-events">
        <slot>
          <div v-for="(event, index) in events" class="event-item" style="box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.07);">
            <cal-event-item :event="event" :index="index" :locale="locale"></cal-event-item>
          </div>
        </slot>
      </div>
  </div>
</template>

<script>
import i18n from '../i18n.js'
import { dateTimeFormatter } from '../tools.js'
import calEventItem from './cal-event-item.vue'
import SchoolEdit from './Add.vue'

const EditSchoolModalComponent = Vue.extend(SchoolEdit);
    const openAddevent = (propsData = {}) => {
        return new EditSchoolModalComponent({
            el: document.createElement('div'),
            propsData
        })
    }
export default {
  name: 'cal-events',
  data () {
    return {
      i18n,
      addtempDate:'',
      chooseadd:''
    }
  },
  components: {
    'cal-event-item': calEventItem
  },
  props: {
    dayEvents: {
      type: Object,
      required: true
    },
    locale: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  computed: {
    dayEventsTitle () {
      if (this.dayEvents.date !== 'all') {
        if (this.dayEvents.events.length !== 0) {
          let tempDate = Date.parse(new Date(this.dayEvents.events[0].scheduleDate))
          this.addtempDate = this.dayEvents.date;
          this.chooseadd = '添加事件'
          return /*dateTimeFormatter(tempDate, i18n[this.locale].fullFormat)*/'当天事件'
        } else {
          this.addtempDate = this.dayEvents.date;
          this.chooseadd = '添加事件'
          return /*this.dayEvents.date + i18n[this.locale].notHaveEvents*/'当天事件'
        }
      } else {
        return i18n[this.locale].dayEventsTitle
      }
    },
    events () {
      return this.dayEvents.events
    },
    bgColor () {
      return {backgroundColor: this.color}
    }
  },
  methods: {
    dateTimeFormatter,
    addeventSuccess:function () {
      this.$emit('successevent')  
    },
    addevent:function () {
      console.log('tt');
      openAddevent({visible:true,addtempDate:this.addtempDate,gocallback:this.addeventSuccess})
    }
  }
}
</script>
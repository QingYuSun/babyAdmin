<template>
    <div>
        <div class="columns">
            <div class="column is-3 is-parent">
                <div class="grade-menu">
                    <a @click="newHardware" class="addpading addhover mail-create btn btn-primary btn-block pf-sc-b">新建</a>
                    <!-- <a @click="editClass" class="mail-create btn btn-gray btn-block pf-sc-b edit" :class="{disable: current == 0}">编辑</a> -->
                    <a @click="explain" class="addpading mail-create btn btn-gray btn-block pf-sc-b edit">操作说明</a>

                </div>
            </div>
            <div class="column is-9 is-parent">
                <student-content :Change="HardwareChange"></student-content>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .grade-menu{
    .box-header{
    .box-title{
        font-family: 微软雅黑 !important;
    }
    }
    .edit{
        background: #62656e;
    &:hover{
         color: white;
         background-color: #85888f;
     }
    &.disable{
         cursor: default;
         background-color: #62656e;
         color: #9599a4;
     }
    }
    }
    .btn-block {
        display: block;
        width: 100%;
    }
    .mail-create{
        padding: 6px 12px;
        border-color: #367fa9;
        color: white;
        margin-bottom: 20px;
        border-radius: 3px;
        -webkit-box-shadow: none;
        box-shadow: none;
        border: 1px solid transparent;
        text-align: center;
    }
    .edits-control{
    padding: 5px;
    outline: none;
    width: 100%;
}
.edits-feedback{
    position: relative;
    display: inline-block;
    width: 100%;
    margin-bottom: 2rem;
}
.edits-control-feedback{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    display: block;
    line-height: 34px;
    text-align: center;
    pointer-events: none;
    width: 30px;
    height: 30px;
    background-image: url(../../assets/ss.png);
    background-size: 100% 100%;
}
.addpading{
        padding: 11px 12px !important;
        font-size: 1.2rem;
    }
    .addhover:hover{
        background:#f7c766 !important;
        color: #fff;
    }
</style>
<script>
    import StudentContent    from './Content.vue'
    import AddHardware    from './Add.vue'
    const newAddHardware = Vue.extend(AddHardware);
    const opennewHardwareModal = (propsData = {}) => {
        return new newAddHardware({
            el: document.createElement('div'),
            propsData
        })
    }
    import Addexplain    from './explain.vue'
    const newAddexplain = Vue.extend(Addexplain);
    const opennewexplainModal = (propsData = {}) => {
        return new newAddexplain({
            el: document.createElement('div'),
            propsData
        })
    }
    export default{
        data(){
            return{
                msg:'hello vue',
                HardwareChange:''
            }
        },
        methods:{
            backHardware(){
                this.HardwareChange = !this.HardwareChange
            },
            newHardware(){
                opennewHardwareModal({visible:true,callback:this.backHardware})
            },
            explain(){
                opennewexplainModal({visible:true})
            }
        },
        components:{
            'student-content':StudentContent,
        },
    }
</script>

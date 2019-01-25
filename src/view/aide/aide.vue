<template>
    <div class="mail">
        <div class="columns">
            <div class="column is-3 is-parent grade-menu">
                <a @click="newinfo" class="addpading addhover mail-create btn btn-primary btn-block pf-sc-b">新建</a>
                <a @click="editinfo" class="addpading mail-create btn btn-gray btn-block pf-sc-b edit" :class="{disable: current == 0}">编辑</a>
               <!--  <mail-menu v-on:selected="selected" v-on:success='success'></mail-menu> -->
            </div>
            <div class="column is-9 is-parent">
                <!-- <info-inbox :selectedMail.sync="selectedItemMail" :change='dataChange'></info-inbox> -->
                <info-inbox :changeaide="dataChangeaide" v-on:successcompile="successcompile"></info-inbox>
            </div>
        </div>
    </div>
</template>
<style lang="scss">

</style>
<script>
    /*import MailMenu  from './MailMenu.vue'*/
    import infoInbox from './infoInbox.vue'
    import Addinfo from './Add.vue'
    import Editinfo from './Edit.vue'

    const AddinfoComponent = Vue.extend(Addinfo);
    const openAddModal = (propsData = {}) => {
        return new AddinfoComponent({
            el: document.createElement('div'),
            propsData
        })
    }

    const EditinfoComponent = Vue.extend(Editinfo);
    const openEditModal = (propsData = {}) => {
        return new EditinfoComponent({
            el: document.createElement('div'),
            propsData
        })
    }
    export default{
        data(){
            return{
                msg:'hello vue',
                dataChangeaide:'',
                selectedItemaide:'',
                assistId:''
            }
        },
        components:{
            /*'mail-menu':MailMenu,*/
            'info-inbox':infoInbox
        },
        methods:{
            /*selected:function (item) {
                console.log(JSON.stringify(item))
                this.selectedItemMail = item
            },
            success:function () {
                console.log('trends-recipe  success')
                this.dataChange = !this.dataChange
            }*/
            successItemaide(){
                console.log('修改中间')
                this.dataChangeaide = !this.dataChangeaide
            },
            successcompile(item){
                this.assistId = item;
            },
            editinfo(){
                if (this.assistId == '') {
                    this.$notify({title: '提示',message: '请选择资讯',type: 'warning'});
                    return
                }
                openEditModal({visible:true,assist:this.assistId,successaide:this.successItemaide})
                
            },
            newinfo () {
                openAddModal({visible:true,successaide:this.successItemaide})
            }
        }
    }
</script>
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
    .addpading{
        padding: 11px 12px !important;
        font-size: 1.2rem;
    }
    .addhover:hover{
        background:#f7c766 !important;
        color: #fff;
    }
</style>


<template>
    <div class="mail">
        <div class="columns">
            <div class="column is-3 is-parent">

                <mail-menu v-on:selected="selected" v-on:success='success'></mail-menu>
            </div>
            <div class="column is-9 is-parent">
                <mail-inbox :selectedMail.sync="selectedItemMail" :change='dataChange'></mail-inbox>
            </div>
        </div>
    </div>
</template>
<style lang="scss">

</style>
<script>
    import MailMenu  from './MailMenu.vue'
    import MailInbox from './MailInbox.vue'

    export default{
        data(){
            return{
                msg:'hello vue',
                dataChange:'',
                selectedItemMail:{index:10, type:'发件箱',cutword:0},
            }
        },
        components:{
            'mail-menu':MailMenu,
            'mail-inbox':MailInbox
        },
        methods:{
            selected:function (item) {
                console.log(JSON.stringify(item))
                this.selectedItemMail = item
            },
            success:function () {
                console.log('trends-recipe  success')
                this.dataChange = !this.dataChange
            }
        }
    }
</script>

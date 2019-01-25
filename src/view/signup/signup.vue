<template>
    <div class="mail">
        <div class="columns">
            <div class="column is-3 is-parent">

                <mail-menu v-on:selectedup="selectedup"></mail-menu>
            </div>
            <div class="column is-9 is-parent">
                <mail-inbox :selectedMail.sync="selectedItemMail"></mail-inbox>
            </div>
        </div>
    </div>
</template>
<style lang="scss">

</style>
<script>
    import Menu  from './Menu.vue'
    import StudentContent    from './Content.vue'

    export default{
        data(){
            return{
                msg:'hello vue',
                dataChange:'',
                selectedItemMail:{name:'',createTime:'',registerPlanId:''},
            }
        },
        components:{
            'mail-menu':Menu,
            'mail-inbox':StudentContent
        },
        methods:{
            selectedup:function (item) {
                this.selectedItemMail = item
            }
        }
    }
</script>
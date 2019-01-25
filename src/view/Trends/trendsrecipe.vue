<template>
    <div>
        <div class="columns">
            <div class="column is-3 is-parent">
                <trends-menu2 v-on:selectedrecipe="selectedrecipe" v-on:success='success'></trends-menu2>
            </div>
            <div class="column is-9 is-parent">
                <trends-content2 :selectedItemrecipe="selectedItemrecipe" :change='dataChange'></trends-content2>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import TrendsMenu       from './TrendsMenu2.vue'
    import TrendsContent    from './TrendsContent2.vue'
    export default{
       
        data(){
            return{
                msg:'hello vue',
                dataChange:'',
                selectedItemrecipe:{index:0, type:'教职工'},
            }
        },
        components:{
            'trends-menu2':TrendsMenu,
            'trends-content2':TrendsContent,
        },
        methods:{
            selectedrecipe:function (item) {
                console.log(JSON.stringify(item))
                this.selectedItemrecipe = item
            },
            success:function () {
                console.log('trends-recipe  success')
                this.dataChange = !this.dataChange
            }
        }
    }
</script>


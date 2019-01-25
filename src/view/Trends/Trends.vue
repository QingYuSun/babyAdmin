<template>
    <div>
        <div class="columns">
            <div class="column is-3 is-parent">
                <trends-menu v-on:selected="selected" v-on:success="success"></trends-menu>
            </div>
            <div class="column is-9 is-parent">
                
                <div  v-if="recipe">
                      <trends-content :selectedItem.sync="selectedItem" :Change="dataChange"></trends-content>
                </div>
                <div v-else>
                    <trends-recipe :selectedItemrecipe="selectedItem" :change='dataChange'></trends-recipe>
                </div>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import TrendsMenu       from './TrendsMenu.vue'
    import TrendsContent    from './TrendsContent.vue'
    import trendsrecipe    from './TrendsContent2.vue'
    export default{
        data(){
            return{
                msg:'hello vue',
                dataChange:'',
                selectedItem:{index:10, type:'新闻'},
                /*dataChange:'',*/
               /* selectedItemrecipe:{index:0, type:'教职工'},*/
            }
        },  
        components:{
            'trends-menu':TrendsMenu,
            'trends-content':TrendsContent,
            'trends-recipe':trendsrecipe
        },
        computed:{
            recipe:function () {
                return  this.selectedItem.index == 10
            }
        },
        methods:{
            success:function () {
                console.log('trends-recipe  success')
                this.dataChange = !this.dataChange
            },
            selected:function (item) {
                console.log(JSON.stringify(item))
                this.selectedItem = item
            }
        }
    }
</script>

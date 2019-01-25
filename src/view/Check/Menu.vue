<template>
    <div class="grade-menu">
        <a class="mail-create btn btn-primary btn-block pf-sc-b">新建</a>
        <a class="mail-create btn btn-gray btn-block pf-sc-b">编辑</a>
        <template v-for="(item,k) in items">
            <grade-item :grade="item"></grade-item>
        </template>
    </div>
</template>
<style lang="scss">
    @import "../../scss/skins.scss";
    @import "../../scss/fonts.scss";

    .grade-menu{
        .box-header{
            .box-title{
                font-family: 微软雅黑 !important;
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
</style>
<script>
    import ExpandBox from '../Com/ExpandBox.vue'
    import GradeItem from './Item.vue'

    var list = [
        {
            name:'小班',
            id:1,
            data:[
                {
                    name:'小一班',
                    id:11,
                    active:false
                },
                {
                    name:'小二班',
                    id:12,
                    active:false
                },
                {
                    name:'小三班',
                    id:13,
                    active:false
                },
            ]
        },
        {
            name:'中班',
            id:2,
            data:[
                {
                    name:'中一班',
                    id:11,
                    active:false
                },
                {
                    name:'中二班',
                    id:12,
                    active:false
                },
                {
                    name:'中三班',
                    id:13,
                    active:false
                },
            ]
        },
        {
            name:'大班',
            id:3,
            data:[
                {
                    name:'大一班',
                    id:11,
                    active:false
                },
                {
                    name:'大二班',
                    id:12,
                    active:false
                },
                {
                    name:'大三班',
                    id:13,
                    active:true
                },
            ]
        },
    ]

    export default{
        data(){
            return{
                title:'哈喽宝贝幼儿园',
                items:list
            }
        },
        components:{
            'expand-box':ExpandBox,
            'grade-item':GradeItem
        }
    }
</script>

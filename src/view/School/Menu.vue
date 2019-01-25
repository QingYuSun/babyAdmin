<template>
    <div class="grade-menu">
        <!--<a  class="mail-create btn btn-primary btn-block pf-sc-b">新建</a>-->
        <!--<a class="mail-create btn btn-gray btn-block pf-sc-b">编辑</a>-->
        <template>
            <grade-item :grade="regions" v-on:selected="selected"></grade-item>
        </template>
        <div>
            <!-- <span>区选择：</span> -->
            <!-- <select v-model="selectedRegion" class="selectedBox">
                <option v-for="region in regions " :value="region.code">
                    {{region.name}}
                </option>
            </select> -->
        </div>
    </div>
</template>
<style lang="scss">
    @import "../../scss/skins.scss";
    @import "../../scss/fonts.scss";

    .selectedBox{
        width:100%;
        height: 35px;
        margin-bottom: 10px;
        background:#fff;
    }
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
            name:'椒江区',
            id:1,
            data:[
                {
                    name:'海门街道',
                    id:11,
                    active:false
                },
                {
                    name:'白云街道',
                    id:12,
                    active:false
                },
                {
                    name:'葭沚街道',
                    id:13,
                    active:false
                },
            ]
        },
        {
            name:'黄岩区',
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
            name:'路桥区',
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
                towns:[],
                regions:[],
                selectedRegion:'331002',
                defaultCity:'331000'
            }
        },
        created:function () {
            /*this.selectAreasdeta();*/
            var self = this
            setTimeout(function () {
                console.log('学校管理')
                self.selectAreasdeta()
            }, 200);

        },
        watch:{
            selectedRegion:function () {
                console.log(this.selectedRegion)
                this.getTowns(this.selectedRegion)
            }
        },
        components:{
            'expand-box':ExpandBox,
            'grade-item':GradeItem
        },
        methods:{
            selected: function (item) {
                
                this.$emit('selected',item)
            },
            getTowns: function(code){
                // this.$store.commit('TREE_SELECT',0)
                let that    = this
                let url     = 'tarea/selectAreas'
                var reqData     = {
                    code:code
                };

                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        that.towns   = data
                    }
                },function(res){
                    // 响应错误回调
                    console.log("/tarea/selectAreas   error")
                });
            },
            selectAreasdeta(){
                let that    = this
                let url     = 'tarea/selectAreas'
                var reqData     = {
                    code:this.defaultCity
                };

                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        var city    = res.body.data;
                        if(typeof city != 'undefined' && city.length > 0){
                            this.regions   = city[0].data
                            this.regions.splice(0,1);//删掉数组第一个(市管辖区)
                            this.getTowns(this.selectedRegion)
                        }else {
                            this.$notify({title: '提示',message: '区域数据获取失败请重新刷新',type: 'warning'});
                        }
                    }
                },function(res){
                    // 响应错误回调
                    console.log("/tarea/selectAreas   error")
                });
            }
        }
    }
</script>

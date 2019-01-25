<template>
    <expand-box :title="title">
        <div slot="body">
            <div class="box-body no-padding">
                <div class="controls two-padding">
                    <!-- Check all button -->
                    <a @click="editrecipe" class="mail-create btn btn-primary ms-yh two-img">修改食谱</a>
                    <a @click="export2Excel" class="mail-create btn btn-primary ms-yh two-img">导出食谱</a>
                </div>
                <div class="table-responsive mailbox-messages new-recipepadding">
                   <table class="new-tabe">
                        <tr style="background: #f4f4f4;">
                            <td>{{ newweeks }}周</td>
                            <td>星期一</td>
                            <td>星期二</td>
                            <td>星期三</td>
                            <td>星期四</td>
                            <td>星期五</td>
                        </tr>
                        <tr v-for="(item,index) in changedate2">
                            <td>{{menus['day'+index]}}</td>
                            <td>{{item[0]}}</td>
                            <td>{{item[1]}}</td>
                            <td>{{item[2]}}</td>
                            <td>{{item[3]}}</td>
                            <td>{{item[4]}}</td>
                        </tr>
                    </table>
                    <div class="new-recipeleft">
                        <a @click="leftrecipe" class="new-reciperight" href="javascript:void;"><</a>
                        <a @click="rightrecipe" class="new-reciperight" style="margin-left: -0.28rem;" href="javascript:void;">></a>
                        <input id="mydate" name="name" v-model="dataoperate" type="date" @input="doThisrecipe" class="input new-inputtime" placeholder="学校名称"></input>
                        <!-- <a @click="editrecipe">修改食谱</a>
                        <a @click="export2Excel">拉取食谱</a> -->
                    </div>
                </div>
            </div>
        </div>
    </expand-box>
</template>
<style lang="scss" scoped>
    @import "../../scss/skins.scss";
    @import "../../scss/fonts.scss";
    .trend-list{
        .trend-wrp{
            padding: 1rem 0;
            display: flex;
            border-bottom: 1px solid #f4f4f4;
            .avatar{
                width: 120px;
                figure{
                    margin: 0 auto;
                }
            }
            .trend-content{
                flex: 1;
                -webkit-flex: 1;
                .desc{
                    font-size: 16px;
                    font-weight: 600;
                    line-height: 26px;
                    margin: 0 1rem 0 0;
                }
                .album{
                    padding-right: 300px;
                    margin:.8rem 0;

                    figure{
                        overflow: hidden;
                        border-radius: 6px;
                        margin: 0 .4rem .8rem;
                    }
                }
                .info{
                    font-size: 14px;
                    position: relative;
                    margin-right: 1rem;
                    color: #666666;
                    .tag{
                        border-radius: 5px;
                        font-size: 10px;
                        height: 20px;
                        padding-left: 8px;
                        padding-right: 8px;
                        color: white;
                        margin-left: .6rem;
                    }
                    .close{
                        color: #E83828;
                        position: absolute;
                        right: 0;
                    }
                }
            }
        }
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
    .two-padding{
        padding-left: 18px !important;
        border-bottom: 1px solid #f4f4f4;
        padding-top: 13px;
        padding-bottom: 13px;
    }
    .two-img:hover{
        background:#f7c766 !important;
        color: #fff;
    }
</style>
<style>
    .new-tabe{
        width: 80%;
        border: 1px solid #ccc;
        margin: 5rem auto;
        font-size: 1.4rem;
        color: #000;
    }
    .new-tabe tr td{
        text-align: center;
        min-height: 5rem;
        padding: 2rem 0;
        border: 1px solid #ccc;
        vertical-align: inherit;
    }
    .new-recipepadding{
        padding-bottom: 2rem;
    }
    .new-recipeleft{
        text-align: center;
    }
    .new-reciperight{
        display: inline-block;
        padding: 0 0.6rem;
        border: 1px solid #ccc;
        font-size: 1.8rem;
        color: #000 !important;
        background-color: #efefef;
    }
    .new-inputtime{
        width: 18%;
        height: 100%;
        line-height: 31px;
    }
</style>
<script>
    let moment = require('moment')
    import ExpandBox from '../Com/ExpandBox.vue'
    import 'vue-event-calendar/dist/style.css'
    import auth from '../../js/auth'
    import Edit from './Edit.vue'

    const editComponent = Vue.extend(Edit);
    const editModal = (propsData = {}) => {
        return new editComponent({
            el: document.createElement('div'),
            propsData
        })
    }

    export default{
        props:{
            selectedItemrecipe:Object,
            change:'',
        },
        data(){
            return{
                msg:'hello vue',
                title:'食谱',
                items:[],
                newweeks:'',
                menus: {
                    'day0':'早餐',
                
                    'day1':'早点',
                
                    'day2':'午餐',
              
                    'day3':'午点',
        
                    /*'day4':'星期五',*/
                },
                forms:{
                    newdate:Object,
                },
                dataoperate:'',
                changedate:[],
                changedate2:[]
            }
        },
        watch:{
            selectedItemrecipe:function () {
                this.getdata();
                this.dataoperate = new Date();
                this.thisweek();
            },
            change:function () {
                this.getdata()
            },
            dataoperate:function(){
                return this.dataoperate = moment(new Date(this.dataoperate).valueOf()).format("YYYY-MM-DD");
            },
            items:function(){
                this.changedate.splice(0,this.changedate.length);
                if (this.items[0] == null) {
                    return this.changedate2 = []
                }
                for (var i=0;i<4;i++)
                    {
                        for (var y = 0; y < 5; y++) {
                            this.changedate.push(this.items[y].recipe.split('¨')[i]);
                            console.log(this.items[y].recipe.split('¨')[i])
                        }
                }
                console.log(JSON.stringify(this.changedate));
                var arr1 = this.changedate
                var arr2 = [];
                var k=0;
                for ( var i = 0; i < arr1.length/5; i++) {
                    arr2[i] = arr2[i] || [];
                    for ( var j = 0; j < 5; j++) {
                        arr2[i][j] = arr1[k];
                        k++
                    }
                }
                this.changedate2 = arr2
                console.log(JSON.stringify(this.changedate2));
            }
        },
        created:function () {
            this.thisweek();
        },
        methods:{
            timeAgo:function (val) {
                return moment(val).fromNow()
            },
            editrecipe(){
                editModal({visible:true,editItemrecipe:this.selectedItemrecipe,editcallback:this.getdata,datatime:this.dataoperate})
            },
            thisweek:function(){
                this.getdata();
                this.dataoperate = new Date();
                this.forms.newdate = moment(new Date().valueOf()).format("YYYY-MM-DD");
                var dt = this.forms.newdate.split('-')
                this.getYearWeek(dt[0], dt[1], dt[2]);
            },
            getYearWeek:function (a, b, c) {
                    var d1 = new Date(a, b-1, c), d2 = new Date(a, 0, 1), 
                        d = Math.round((d1 - d2) / 86400000);
                    this.newweeks = Math.ceil((d + ((d2.getDay() + 1) - 1)) / 7);
                    return Math.ceil((d + ((d2.getDay() + 1) - 1)) / 7);
            },
            doThisrecipe:function(){
                this.$store.commit('TREE_SELECT',0)
                console.log()
                this.dataoperate = new Date(this.dataoperate);
                this.forms.newdate = moment(this.dataoperate.valueOf()).format("YYYY-MM-DD");
                var dt = this.forms.newdate.split('-')
                this.getYearWeek(dt[0], dt[1], dt[2]);

                var date = new Date(this.dataoperate);
                let that    = this
                let url     = 'tRecipe/selectTrecipeWEB'
                var reqData     = {}
                reqData.schoolId =auth.getSchoolId();
                reqData.flag = this.selectedItemrecipe.index;
                
                reqData.recipeDate = moment(date).format('YYYY-MM-DD')
                console.log("tt")
                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        if (data.length>0 && data[0] !== null) {
                            that.items   = data    
                        }else{
                            that.items   = []    
                        } 
                    }
                },function(res){
                    // 响应错误回调
                });
            },
            export2Excel() {
            this.$confirm('导出当前食谱, 是否继续?', '提示', {
                lockScroll:false,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
    　　　　　　require.ensure([], () => {
    　　　　　　　　const { export_json_to_excel } = require('../vendor/Export');
    　　　　　　　　const tHeader = [this.newweeks+'周', '星期一', '星期二', '星期三', '星期四','星期五'];
    　　　　　　　　const filterVal = ['ID', 'imsi', 'msisdn', 'address', 'name','wu'];
                  console.log(JSON.stringify(this.items));
                  console.log(JSON.stringify(this.items[0].recipe));
                  const  mondaydate = this.items[0].recipe.split('¨');
                  const  tuesday = this.items[1].recipe.split('¨');
                  const  wednesday = this.items[2].recipe.split('¨');
                  const  thursday = this.items[3].recipe.split('¨');
                  const  friday = this.items[4].recipe.split('¨');

    　　　　　　　　const list = [
                         {"ID": "早餐", "imsi": mondaydate[0], "msisdn": tuesday[0], "address": wednesday[0], "name": thursday[0] ,"wu": friday[0]},
                         {"ID": "早点", "imsi": mondaydate[1], "msisdn": tuesday[1], "address": wednesday[1], "name": thursday[1] ,"wu": friday[1]},
                         {"ID": "午餐", "imsi": mondaydate[2], "msisdn": tuesday[2], "address": wednesday[2], "name": thursday[2] ,"wu": friday[2]},
                         {"ID": "午点", "imsi": mondaydate[3], "msisdn": tuesday[3], "address": wednesday[3], "name": thursday[3] ,"wu": friday[3]},
                     ]
                  console.log(JSON.stringify(this.items.recipe));
    　　　　　　　　const data = this.formatJson(filterVal, list);
    　　　　　　　　export_json_to_excel(tHeader, data, '食谱');
                this.$notify({title: '成功',message: '导出成功',type: 'success'});
    　　　　　　})
            }).catch(() => {
                this.$notify.info({title: '取消',message: '已取消删除',type: 'success'});
            });
    　　　　},
            formatJson(filterVal, jsonData) {
    　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
    　　　　},
            getdata:function () {
                this.$store.commit('TREE_SELECT',0)
                
                this.dataoperate = new Date();
                this.forms.newdate = moment(new Date().valueOf()).format("YYYY-MM-DD");
                var dt = this.forms.newdate.split('-')
                this.getYearWeek(dt[0], dt[1], dt[2]);

                var date = new Date();
                let that    = this
                let url     = 'tRecipe/selectTrecipeWEB'
                var reqData     = {}
                reqData.schoolId =auth.getSchoolId();
                reqData.flag = this.selectedItemrecipe.index;
                
                reqData.recipeDate = moment(date).format('YYYY-MM-DD')
                console.log("tt")
                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        if (data.length>0 && data[0] !== null) {
                            that.items   = data    
                        }else{
                            that.items   = []    
                        } 
                    }
                },function(res){
                    // 响应错误回调
                });
            },
            rightrecipe:function(){
                this.newweeks++
                this.$store.commit('TREE_SELECT',0)
                console.log(this.dataoperate);
                var dd = new Date(this.dataoperate);
                var aa = new Date(dd.getTime() + 24*60*60*7000);
                let that    = this
                let url     = 'tRecipe/selectTrecipeWEB'
                var reqData     = {}
                reqData.schoolId =auth.getSchoolId();
                reqData.flag = this.selectedItemrecipe.index;
                
                reqData.recipeDate = moment(aa).format('YYYY-MM-DD')
                console.log("tt")
                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        this.dataoperate = aa
                        if (data.length>0 && data[0] !== null) {
                            that.items   = data    
                        }else{
                            that.items   = []    
                        }
                    }
                },function(res){
                    // 响应错误回调
                });
            },
            leftrecipe:function(){
                this.newweeks--
                this.$store.commit('TREE_SELECT',0)
                var dd = new Date(this.dataoperate);
                var aa = new Date(dd.getTime() - 24*60*60*7000);
                let that    = this
                let url     = 'tRecipe/selectTrecipeWEB'
                var reqData     = {}
                reqData.schoolId =auth.getSchoolId();
                reqData.flag = this.selectedItemrecipe.index;

                reqData.recipeDate = moment(aa).format('YYYY-MM-DD')
                console.log("tt")
                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        this.dataoperate = aa
                        if (data.length>0 && data[0] !== null) {
                            that.items   = data    
                        }else{
                            that.items   = []    
                        }
                    }
                },function(res){
                    // 响应错误回调
                });
            }
        },
        components:{
            'expand-box':ExpandBox,

        }
    }
</script>

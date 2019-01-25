<template>
    <box-modal :title="title" :visible="true" transition="roll">
        <div class="edit-wrp">
            <div class="control">
                <div>
                    <input name="name" v-model="form.date" type="date" @input="doThis" class="input" placeholder="学校名称"></input>
                </div>
                <template>
                	<table class="new-tabe new-input">
                		<tr>
                            <td>{{ weeks }}周</td>
                            <td>星期一</td>
                            <td>星期二</td>
                            <td>星期三</td>
                            <td>星期四</td>
                            <td>星期五</td>
                        </tr>
                        <tr v-for="(item,index) in items">
                            <td>{{today['day'+index]}}</td>
                            <td>
                              <input type="text" name="text" v-model="items[index].breakfastOne" placeholder="">
                            </td>
                            <td>
                                <input type="text" name="text" v-model="items[index].BdessertOne" placeholder="">
                            </td>
                            <td>
                                <input type="text" name="text" v-model="items[index].lunchOne" placeholder="">
                            </td>
                            <td>
                                <input type="text" name="text" v-model="items[index].LdessertOne" placeholder="">
                            </td>
                            <td>
                                <input type="text" name="text" v-model="items[index].LdessertOneadd" placeholder="">
                            </td>
                        </tr>
                	</table>
                    <!-- /.table -->
                </template>
            </div>
            <div class="edit-box">
            </div>
            <div class="button-group" style="text-align: right;">
                <div class="control" style="display: inline-block;">
                    <button @click="doCancel" type="submit" class="button is-cancel">取消</button>
                </div>
                <div class="control" style="display: inline-block;">
                    <button type="submit" @click="NewSrecipe" v-bind:data-index="index" class="button is-primary">提交</button>
                </div>
            </div>
        </div>
    </box-modal>
</template>
<style lang="scss">
    .edit-wrp{
        min-height: 30rem;
        padding: .6rem 2rem;
        .edit-box{
            position: relative;
            .ql-container{
                .ql-editor {
                    min-height: 20em;
                    padding-bottom: 1em;
                    max-height: 25em;
                }
            }
            .html {
                height: 9em;
                overflow-y: auto;
                border: 1px solid #ccc;
                border-top: none;
                resize: vertical;
            }
            .ql-tooltip{
                left: 0 !important;
                top: 100px !important;
            }
        }
        .button-group{
            margin-top: 1rem;
        }
        .label{
            font-weight: normal;
        }
    }
    /*body {
         background-color: grey;
       }
       @media screen and (max-width: 960px) {
         body {
           background-color: red;
} }
       @media screen and (max-width: 768px) {
         body {
           background-color: orange;
         }
       }
       @media screen and (max-width: 550px) {
         body {
           background-color: yellow;
} }
       @media screen and (max-width: 320px) {
         body {
           background-color: green;
         }
 }*/
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
        max-width: 5rem;
        padding: 1rem 0;
        border: 1px solid #ccc;
    }
    .new-tabe tr td input{
        width: 100%;
        text-align: center;
        border: none;
        outline: none;
        
    }
    .new-input tr td{
        padding: 1rem 0!important;
        vertical-align: inherit !important;

    }
    .new-shipupadding{
        padding-bottom: 10rem;
    }
    .new-shipuleft{
        text-align: center;
    }
    .new-shipuright{
        display: inline-block;
        padding: 0 0.6rem;
        border: 1px solid #ccc;
        font-size: 1.8rem;
        color: #000 !important;
        background-color: #efefef;
    }
</style>
<script>
    import BoxModal from '../Com/BoxModal.vue';
    import { quillEditor } from 'vue-quill-editor'
    import auth from '../../js/auth'

    export default{
        name:'newMsg',
        data(){
            return{
                title:'新建食谱',
                msg:'hello vue',
                weeks:'',
                tClass: [{
                    label: '小班',
                    options: [{
                        value: 'Shanghai',
                        label: '小一班'
                    }, {
                        value: 'Beijing',
                        label: '小二班'
                    }]
                }, {
                    label: '中班',
                    options: [{
                        value: 'Chengdu',
                        label: '中一班'
                    }, {
                        value: 'Shenzhen',
                        label: '中二班'
                    }]
                }],
                today: {
                    'day0':'早餐',
                
                    'day1':'早点',
                
                    'day2':'午餐',
              
                    'day3':'午点',
                },
                todays:[],
                value7: '',
                form:{
                    date:Object,

                },
                editorOption:[],
                items:[],
            }
        },
        props:{
            type:Object,
            callback:Object,
        },
        computed: {
//            editor() {
//                return this.$refs.myTextEditor.quillEditor
//            }
        },
        created:function () {
            var len = 4;
            var ree = []
                for (var i = 0; i < len; i ++) {
                    var item = {breakfastOne:'',
                    BdessertOne:'',
                    lunchOne:'',
                    LdessertOne:'',
                    LdessertOneadd:''};
                    ree.push(item);
                }
                this.items =ree

                this.items = this.items.slice(0);
                this.form.date = moment(new Date().valueOf()).format("YYYY-MM-DD");
                var dt = this.form.date.split('-')
                this.getYearWeek(dt[0], dt[1], dt[2]);
                this.cal();
              // this.refresh()
            },
        methods:{
            timeAgo:function (val) {
                return moment(val).fromNow()
            },
            doCancel:function () {
                document.querySelector(".modal-close").click();
            },
            getYearWeek:function (a, b, c) {
                    var d1 = new Date(a, b-1, c), d2 = new Date(a, 0, 1), 
                        d = Math.round((d1 - d2) / 86400000);
                    this.weeks = Math.ceil((d + ((d2.getDay() + 1) - 1)) / 7);
                    return Math.ceil((d + ((d2.getDay() + 1) - 1)) / 7);
            },
            doThis:function(){
                var dt = this.form.date.split('-')
                this.getYearWeek(dt[0], dt[1], dt[2]);
                this.cal();
            },
            format:function (date){
                    var year=date.getFullYear();
                    var month=date.getMonth()+1;
                    var day=date.getDate();
                    return year+'-'+(month>9?month:'0'+month)+'-'+(day>9?day:'0'+day);
            },
            cal:function (ago){
                var oneDay=24*3600*1000;
                var d=new Date(this.form.date);
                if(ago){
                    d=this.form.date(+d+ago*oneDay);
                }
                var week=d.getDay();
                var arr=[];
                d=+d;
                for(var i=1;i<6;i++){
                    var k=d+(i-week)*oneDay;
                    arr.push(this.format(new Date(k)));
                };
                this.todays = arr
                return arr;
            },
            removeBrackets:function (val) {
                var s = ""
                for (var i = 0; i < val.length; i++) {
                    s += val[i] + ","
                }

                return s.substring(0,s.length -1)
            },
            NewSrecipe:function (event) {
                this.editorOption = [
                    this.items[0].breakfastOne+'¨'+this.items[1].breakfastOne+'¨'+this.items[2].breakfastOne+'¨'+this.items[3].breakfastOne,

                    this.items[0].BdessertOne+'¨'+this.items[1].BdessertOne+'¨'+this.items[2].BdessertOne+'¨'+this.items[3].BdessertOne,
                
                    this.items[0].lunchOne+'¨'+this.items[1].lunchOne+'¨'+this.items[2].lunchOne+'¨'+this.items[3].lunchOne,
                                
                    this.items[0].LdessertOne+'¨'+this.items[1].LdessertOne+'¨'+this.items[2].LdessertOne+'¨'+this.items[3].LdessertOne,
                
                    this.items[0].LdessertOneadd+'¨'+this.items[1].LdessertOneadd+'¨'+this.items[2].LdessertOneadd+'¨'+this.items[3].LdessertOneadd
                ]
                var url          = 'tRecipe/insertRecipeWEB'
                var reqData = {};
                    reqData.recipe = this.removeBrackets(this.editorOption);
                    // reqData.recipe = "美2,美1";
                    // reqData.time = "2017-4-20,2017-3-12"
                    reqData.time = this.removeBrackets(this.todays);

                    reqData.schoolId = auth.getSchoolId();
                    reqData.flag   = this.type;
                    reqData.teacherId = auth.getUserId()

                this.$http.post(url, reqData).then(function (res){
                  console.log(res.body);
                    if(res.body.msg.toUpperCase() == 'OK'){
                        this.$notify({title: '成功',message: '食谱上传成功',type: 'success'});
                        this.doCancel(); 
                        this.callback()   
                    }
                })
            }
        },
        components:{
            'box-modal':BoxModal,
            'quillEditor':quillEditor
        }
    }
</script>

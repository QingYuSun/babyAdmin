<template>
    <div>
        <div class="columns">
            <!-- <div class="column is-3 is-parent">
                <student-menu></student-menu>
            </div> -->
            <div class="column is-3 is-parent">
               <!-- <tree1 :model="school" :teacher="variable" @selected="selected" @tvariable="tvariable"></tree1> -->
               <div class="t-online-box">
                    <div :class="{tactived:teacherclick == 1}" class="t-title" @click="tvariable"><span>教师考勤</span></div>
               </div>
            </div>

            <div class="column is-9 is-parent">
                <student-content :classId.sync="selectedCalssId"></student-content>
            </div>

            
        </div>
    </div>
</template>
<script>
    import StudentContent    from './Content.vue'
    import auth from '../../js/auth'

    export default{
        data(){
            return{
                msg:'hello vue',
                school:'',
                variable:0,
                selectedCalssId:Number,
                teacherclick:0
                
            }
        },
        components:{
            'student-content':StudentContent,
        },
        created:function () {
            this.teacherclick = 1
        },
        methods:{
            tvariable(){
                this.teacherclick = 1
            }
        }
    }
</script>
<style>
    .t-online-box{
        font-family: Menlo, Consolas, monospace; 
        background: #ffffff;
        /*padding-top: 20px;
        padding-left: 40px;
        padding-bottom: 20px;*/
        height: 100%;
        width: 100%;
        overflow-y: auto;
    }
    .t-title{
        /*margin-top: 2em;*/
        padding: 16px;
        max-height: 55px;
        border-bottom: 1px solid rgb(244, 244, 244);
    }
    .t-title{
        font-size: 1.1em;
        font-weight: 500;
        line-height: 25px;
    }
    .tactived{
        background: #f8f8f8;
        border-left: 4px solid #f8b62d;
    }
    .t-title span{
        /*padding-left: 10px;*/
        cursor: pointer;
    }
</style>

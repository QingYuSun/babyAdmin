<template>
    <div>
        <div class="columns">
            <div class="column is-3 is-parent">
                <div class="grade-menu">
                    <a @click="addSchool" class="addpading addhover mail-create btn btn-primary btn-block pf-sc-b">新建</a>
                </div>
                <div class="edits-feedback">
                    <input type="text" class="edits-control" placeholder="搜索学校" v-model="studentword">
                    <span class="edits-control-feedback"></span>
                </div>
                <student-menu v-on:selected="selected"></student-menu>
            </div>
            <div class="column is-9 is-parent">
                <student-content :area.sync="area" :change='dataChange'></student-content>
            </div>
        </div>
    </div>
</template>
<style>
    .addpading{
        padding: 11px 12px !important;
        font-size: 1.2rem;
    }
    .addhover:hover{
        background:#f7c766 !important;
        color: #fff;
    }
    .edits-control{
        padding: 5px 16px;
        outline: none;
        width: 100%;
        line-height: 20px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }
    .edits-feedback{
        position: relative;
        display: inline-block;
        width: 100%;
        margin-bottom: 2rem;
    }
    .edits-control-feedback{
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
        display: block;
        line-height: 34px;
        text-align: center;
        pointer-events: none;
        width: 25px;
        height: 25px;
        background-image: url(../../assets/ss.png);
        background-size: 100% 100%;
        margin-right: 10px;
        margin-top: 3px;
    }
</style>
<script>
    import StudentMenu       from './Menu.vue'
    import StudentContent    from './Content.vue'
    import auth from '../../js/auth.js'
    import SchoolAdd from './Add.vue'
    const AddSchoolModalComponent = Vue.extend(SchoolAdd);
    const openAddSchoolModal = (propsData = {}) => {
        return new AddSchoolModalComponent({
            el: document.createElement('div'),
            propsData
        })
    }
    export default{
        data(){
            return{
                msg:'hello vue',
                area:Object,
                dataChange:'',
            }
        },
        components:{
            'student-menu':StudentMenu,
            'student-content':StudentContent
        },
        created:function () {
            if(auth.getRole() != '1'){
                this.$router.replace("/index")
            }
        },
        methods:{
            success:function () {
                console.log('trends-recipe  success')
                this.dataChange = !this.dataChange
            },
            selected:function (item) {
                console.log('item:　' +　 JSON.stringify(item))
                this.area = item;
            },
            addSchool:function () {
                openAddSchoolModal({visible:true,area:this.area,callback:this.success})
            },
        }
    }
</script>

<template>
    <div>
        <div class="columns">
            <div class="column is-3 is-parent">
                <div class="grade-menu">
                    <a @click="newClass" class="addpading addhover mail-create btn btn-primary btn-block pf-sc-b">新建</a>
                    <!-- <a @click="editClass" class="mail-create btn btn-gray btn-block pf-sc-b edit" :class="{disable: current == 0}">编辑</a> -->
                    <a @click="editClass" class="addpading mail-create btn btn-gray btn-block pf-sc-b edit">编辑</a>
                    <div class="edits-feedback">
                        <input type="text" class="edits-control" placeholder="搜索学生输入名字或手机号码" v-model="studentword">
                        <span class="edits-control-feedback"></span>
                    </div>
                    <!-- <div class="tree-wrp">
                        <ul class="tree-item nav-pills nav-stacked">
                            <tree-item :school="school"></tree-item>
                        </ul>
                    </div> -->
                    <div class="tree-wrp1" >
                       <tree1 :model="school"  @selected="selected" ></tree1>
                    </div>
                </div>
            </div>
            <div class="column is-9 is-parent">
                <student-content :school.sync="school" :studentword.sync="studentword" v-on:refresh="refresh"></student-content>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .grade-menu{
    .box-header{
    .box-title{
        font-family: 微软雅黑 !important;
    }
    }
    .edit{
        background: #62656e;
    &:hover{
         color: white;
         background-color: #85888f;
     }
    &.disable{
         cursor: default;
         background-color: #62656e;
         color: #9599a4;
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
    .edits-control{
        padding: 5px;
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
        width: 30px;
        height: 30px;
        background-image: url(../../assets/ss.png);
        background-size: 100% 100%;
        margin-right: 10px;
        margin-top: 1px;
    }
    .addpading{
        padding: 11px 12px !important;
        font-size: 1.2rem;
    }
    .addhover:hover{
        background:#f7c766 !important;
        color: #fff;
    }
</style>
<script>
    import StudentMenu       from './Menu.vue'
    import StudentContent    from './Content.vue'
    import TreeItem      from '../Tree/Item.vue'
    import Tree      from '../Com/Tree.vue'
    import NewClass      from '../Teacher/NewClass.vue'
    import EditClass      from '../Teacher/EditClass.vue'
    import auth from '../../js/auth'

    const MsgModalComponent = Vue.extend(NewClass);
    const openModal = (propsData = {}) => {
        return new MsgModalComponent({
            el: document.createElement('div'),
            propsData
        })
    }

    const EditClassModalComponent = Vue.extend(EditClass);
    const EditClassModal = (propsData = {}) => {
        return new EditClassModalComponent({
            el: document.createElement('div'),
            propsData
        })
    }

    var items ={}

    export default{
        data(){
            return{
                msg:'hello vue',
                school:items,
                selectedItem:Object,
                studentword:''
            }
        },
        components:{
            'student-content':StudentContent,
            'tree-item':TreeItem,
            'tree1':Tree
        },
        created:function () {
           /*this.refresh();*/
           var self = this
            setTimeout(function () {
                console.log('学生管理')
                self.refresh()
            }, 200);
        },
        methods:{
            newClass:function () {
                console.log(JSON.stringify(this.selectedItem))
                console.log(!!!this.selectedItem)

                if (typeof(this.selectedItem.id) == "undefined" || this.selectedItem.type==3){
                     // alert('请选择要学校或年级')
                     this.$notify({title: '提示',message: '请选择学校或年级',type: 'info'});
                    return
                }
                
                openModal({visible:true,selectedItem:this.selectedItem,schoolId:this.school.schoolId,callback:this.refresh})
            },
            editClass:function () {

                console.log(JSON.stringify(this.selectedItem))
                if (typeof(this.selectedItem.id) == "undefined" || this.selectedItem.type==1){
                     // alert('请选择要学校或年级')
                    this.$notify({title: '提示',message: '请选择要修改的年级或班级',type: 'info'});
                    return
                }
                EditClassModal({visible:true,selectedItem:this.selectedItem,schoolId:this.school.schoolId,callback:this.refresh})
            },
            refresh:function () {
                this.$store.commit('TREE_SELECT',0)
                let that    = this
                let url     = '/tschool/selectClassAndGradeOnBaby'
                var reqData     = {
                    schoolId:auth.getSchoolId()
                };
                console.log("tt")
                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        that.school   = data
                    }

                },function(res){
                    // 响应错误回调
                });
            },
            selected:function (item) {

                var result = item;
                result.id = 0
                result.type = -1
                result.treeType = 'none'

                /*var result = {
                    id :0,
                    type: -1,
                    treeType:'none'
                }*/
                if(typeof item.schoolId !== "undefined"){
                    result.id = item.schoolId
                    result.type = 1
                    result.treeType = 'school'
                    result.name = item.name
                }
                if(typeof item.gradeId !== "undefined"){
                    result.id = item.gradeId
                    result.type = 2
                    result.treeType = 'grade'
                    result.name = item.name
                }
                if(typeof item.classId !== "undefined"){
                    result.id = item.classId
                    result.type = 3
                    result.treeType = 'class'
                    result.name = item.name

                    this.$store.commit('TREE_SELECT',result.id)
                    this.$store.commit('TREE_TYPE',result.treeType)
                }
                
                this.selectedItem = result
            }
        }
//        beforeRouteEnter (to, from, next) {
//
//        },
    }
</script>

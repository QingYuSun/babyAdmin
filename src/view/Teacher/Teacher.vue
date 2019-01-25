<template>
    <div>
        <div class="columns">
            <div class="column is-3 is-parent">
                <!--<student-menu></student-menu>-->
                <div class="grade-menu">
                    <a @click="newClass" class="addpading addhover mail-create btn btn-primary btn-block pf-sc-b">新建</a>
                    <!-- <a @click="editClass" class="mail-create btn btn-gray btn-block pf-sc-b edit" :class="{disable: current == 0}">编辑</a> -->
                    <a @click="editClass" class="addpading mail-create btn btn-gray btn-block pf-sc-b edit">编辑</a>

                    <!-- <div class="tree-wrp">
                        <ul class="tree-item nav-pills nav-stacked">
                            <tree-item :school="school" v-on:selected='selected'></tree-item>
                        </ul>
                    </div> -->
                    <div class="tree-wrp1" >
                       <tree1 :model="school"  @selected="selected" ></tree1>
                    </div>
                </div>
            </div>
            <div class="column is-9 is-parent">
                <student-content :school.sync="school" :treeId.sync="current" :treeType.sync="treeType"></student-content>
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
    .item {
      cursor: pointer;
    }

    .tree-wrp1{
        /* height:500px ;*/
        bottom:10px;
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
//    import StudentMenu       from './Menu.vue'
    import TeacherContent    from './Content.vue'
    import ExpandBox     from '../Com/ExpandBox.vue'
    import NewClass      from './NewClass.vue'
    import EditClass      from './EditClass.vue'
    import TreeItem      from '../Tree/Item.vue'
    import Tree      from '../Com/Tree.vue'
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


var items ={
    "schoolName": "学校1",
    "subs": [
        {
            "gradeName": "小班",
            "gradeId": 101,
            "tClassList": [
                {
                    "classId": 1,
                    "className": "普通班1"
                },
                {
                    "classId": 2,
                    "className": "vip班"
                },
                {
                    "classId": 5,
                    "className": "普通班2"
                }
            ]
        },
        {
            "gradeName": "中班",
            "gradeId": 102,
            "tClassList": [
                {
                    "classId": 4,
                    "className": "普通班1"
                },
                {
                    "classId": 6,
                    "className": "普通班2"
                }
            ]
        },
        {
            "gradeName": "大班",
            "gradeId": 103,
            "tClassList": [
                {
                    "classId": 3,
                    "className": "vip班"
                }
            ]
        }
    ],
    "schoolId": 1
}

var tdata = {
      name: '指数幼儿园',
      children: [
        { name: '小班' ,
            children: [
                {
                  name: '小一班',
                },
                { name: '小二班' },
                { name: 'wat12' },
                {
                  name: 'child folder12',
                }
          ]
        },
        { name: '中班' ,
             children: [
                {
                  name: '中一班',
                },
                { name: '中二班' },
                { name: 'wat12' },
                {
                  name: 'child folder12',
                }
          ]
        },
        {
          name: '大班',
          children: [
            {
              name: '大一班 ',
            },
            { name: '大二班' },
            { name: 'wat12' },
            {
              name: 'child folder12',
            }
          ]
        }
      ]
    }



    export default{
        data(){
            return{
                msg:'hello vue',
                school:items,
                selectedItem:Object,
                treeData:tdata,
            }
        },
        created:function () {
            /*this.teacherdeta();*/
            var self = this
            setTimeout(function () {
                console.log('教师管理')
                self.teacherdeta()
            }, 200);
        },
        components:{
            'student-content':TeacherContent,
            'expand-box':ExpandBox,
            'tree-item':TreeItem,
            'tree1':Tree
        },
        computed: {
            current () {
                console.log(this.$store.state.tree.current);
                return this.$store.state.tree.current
            },
            treeType(){
                return this.$store.state.tree.treeType
            }
        },
        methods:{
            newClass:function () {
                console.log(JSON.stringify(this.selectedItem))
                console.log(!!!this.selectedItem)

                if (typeof(this.selectedItem.id) == "undefined" || this.selectedItem.type==3){
                     // alert('请选择要学校或年级')
                     this.$notify({title: '提示',message: '请选择学校或年级',type: 'warning'});
                    return
                }
                
                openModal({visible:true,selectedItem:this.selectedItem,schoolId:this.school.schoolId,callback:this.refresh})
            },
            editClass:function () {

                console.log(JSON.stringify(this.selectedItem))
                if (typeof(this.selectedItem.id) == "undefined" || this.selectedItem.type==1){
                     // alert('请选择要学校或年级')
                    this.$notify({title: '提示',message: '请选择要修改的年级或班级',type: 'warning'});
                    return
                }
                EditClassModal({visible:true,selectedItem:this.selectedItem,schoolId:this.school.schoolId,callback:this.refresh})
            },
            refresh:function () {
                this.$store.commit('TREE_SELECT',0)
                let that    = this
                let url     = 'tschool/selectClassAndGrade'
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
                // console.log(item.gradeId)
                // console.log(JSON.stringify(item))
                var result = item;
                result.id = 0
                result.type = -1
                result.treeType = 'none'

                // var result = {
                //     id :0,
                //     type: -1,
                //     treeType:'none'
                // }
                if(typeof item.schoolId !== "undefined"){
                    result = item;
                    result.id = item.schoolId
                    result.type = 1
                    result.treeType = 'school'
                    result.name = item.name
                }
                if(typeof item.gradeId !== "undefined"){
                    result = item;
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
                }
                
                this.$store.commit('TREE_SELECT',result.id)
                this.$store.commit('TREE_TYPE',result.treeType)

                this.selectedItem = result
            },
            teacherdeta(){
                let that    = this
                let url     = '/tschool/selectClassAndGrade'
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
            }
        },
        // mounted:function () {
        //     console.log("treeData   " + JSON.stringify(this.treeData))
        // }
//        beforeRouteEnter (to, from, next) {
//            let url     = '/tschool/selectClassAndGrade'
//            var reqData     = {
//                schoolId:1
//            };
//            console.log("tt")
//            Vue.http.post(url,reqData).then(function (res) {
//                console.log(res);
//                if(res.body.code == "200") {
//                    next(vm=>{
//                        let data    = res.body.data;
//                        vm.school   = data
//                    })
//                }else{
//                    next()
//                }
//
//            },function(res){
//                next()
//                // 响应错误回调
//            });
//        },
    }
</script>

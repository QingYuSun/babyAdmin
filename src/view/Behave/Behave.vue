<template>
    <div>
        <div class="columns">
            <!-- <div class="column is-3 is-parent">
                <student-menu></student-menu>
            </div> -->
            <div class="column is-3 is-parent">
               <tree1 :model="school"  @selected="selected" ></tree1>
               
            </div>

            <div class="column is-9 is-parent">
                <student-content :classId.sync="selectedCalssId"></student-content>
            </div>

            
        </div>
    </div>
</template>
<style>

</style>
<script>
    import StudentMenu       from './Menu.vue'
    import StudentContent    from './Content.vue'
    import Tree      from '../Com/Tree.vue'
    import auth from '../../js/auth'

    export default{
        data(){
            return{
                msg:'hello vue',
                school:'',
                selectedCalssId:Number,
            }
        },
        components:{
            'student-menu':StudentMenu,
            'student-content':StudentContent,
            'tree1':Tree
        },
        created:function () {
            /*this.selectedCalssId =1;*/
            console.log(this.selectedCalssId);

           /*this.refresh();*/
           var self = this
            setTimeout(function () {
                console.log('在校表现班级')
                self.refresh();
            }, 200);
        },
        methods:{
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
                        console.log(data.children[0].children.length)
                        if (data.children[0].children.length == 0) {
                            that.selectedCalssId = 0
                        }else{
                            that.selectedCalssId =data.children[0].children[0].classId;
                        }
                        that.school   = data
                    }

                },function(res){
                    // 响应错误回调
                });
            },
            selected:function (item) {
                // console.log(item)
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
                    this.selectedCalssId = item.classId

                }
                
                this.selectedItem = result
            }
        }
    }
</script>


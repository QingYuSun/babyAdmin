<template>
    <div class="student-list">
        <expand-box :title="title">
            <div slot="body">
                <div class="box-body no-padding">
                    <div class="controls two-padding">
                        <!-- Check all button -->
                        <a @click="addStudent" class="mail-create btn btn-primary ms-yh">新增学生</a>
                        <a @click="deleteAll" class="mail-create btn btn-primary ms-yh">批量删除</a>
                        <a @click="batchList" class="mail-create btn btn-primary ms-yh">批量导入</a>
                        <a @click="StudentList" class="mail-create btn btn-primary ms-yh">导出信息</a>
                    </div>
                    <div class="table-responsive mailbox-messages">
                        <table class="table table-hover table-striped felxe-table">
                            <thead>
                            <tr>
                                <th class="two-width" v-if="judgenumber == 1">
                                    <p class="control">
                                        <input type="checkbox" v-model="checkAbb" @click="handleCheckAll">
                                    </p>
                                </th>
                                <th v-if="judgenumber == 0">班级</th>
                                <th>姓名</th>
                                <th>性别</th>
                                <th>地址</th>
                                <th>生日</th>
                                <th>手机</th>
                                <th>关联宝宝</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <template v-for="(item,k) in items">
                                <tr>
                                    <td class="two-width" v-if="judgenumber == 1">
                                        <p class="control">
                                            <!-- <input v-model="item.checked" type="checkbox"> -->
                                            <input v-model="checkArr" :value="item.babyId" type="checkbox">
                                        </p>
                                    </td>
                                    <td v-if="judgenumber == 0">
                                        <div v-for="schools in school">
                                            <div v-for="arr in schools">
                                                <div v-for="aa in arr.children">
                                                    <div v-if="aa.classId == item.classId">
                                                        {{aa.name}}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{{item.babyName}}</td>
                                    <td>{{sexFormat(item.babyGender)}}</td>
                                    <td>{{item.address}}</td>
                                    <td>{{ dateFormat(item.birthday) }}</td>
                                    <td>{{ item.phoneNum }}</td>
                                    <td v-if="item.isRelation == 1">是</td>
                                    <td v-if="item.isRelation == 0">否</td>
                                    <td v-if="item.isRelation == undefined">否</td>
                                    <td>
                                        <p>
                                            <a @click="editStudent(item)" class="link-edit">编辑</a>
                                            <span>|</span>
                                            <a @click="deleteStudent(item)" class="link-delete">删除</a>
                                        </p>
                                    </td>
                                </tr>
                            </template>
                            </tbody>
                        </table>
                        <!-- /.table -->
                    </div>
                    <!-- /.mail-box-messages -->
                </div>
            </div>
        </expand-box>
    </div>
</template>
<style lang="scss">
    @import "../../scss/skins.scss";

    .student-list{
        .link-edit{
            color: #F8BF48 ;
        }
        .link-delete{
            color: #E83828;
        }
        .table thead th{
            border-width: 0 0 1px;
        }
        .controls {
            padding: 13px;

            .btn {
                border-radius: 3px;
                -webkit-box-shadow: none;
                box-shadow: none;
                border: 1px solid transparent;
                margin-right: 1rem;
            }
            a:hover{
                background:#f7c766 !important;
                color: #fff;
            }
        }
    }


    .table-striped>tbody>tr:nth-of-type(odd) {
        background-color: #f9f9f9;
    }
    .table>thead>tr>th, .table>tbody>tr>th, .table>tfoot>tr>th, .table>thead>tr>td, .table>tbody>tr>td, .table>tfoot>tr>td {
        border-top: 1px solid #f4f4f4;
        border-bottom: 1px solid #f4f4f4;
    }
    .table{
        margin-bottom: 0;
    }
    .table td{
        padding: 20px 10px;
    }
    .mailbox-messages{
        .fa{
            vertical-align: middle;
        }
        a {
            color: #3c8dbc;
        }
    }
    .two-padding{
        padding-left: 18px !important;
        border-bottom: 1px solid #f4f4f4;
    }
    .two-width{
        width: 40px;
        padding-left: 20px !important;
    }
    .felxe-table{
        table-layout:fixed;
    }
</style>
<script>
    import ExpandBox from '../Com/ExpandBox.vue'
    import auth from '../../js/auth'
    import AddStudent    from './Add.vue'

    const AddStudentModalComponent = Vue.extend(AddStudent);
    const openAddStudentModal = (propsData = {}) => {
        return new AddStudentModalComponent({
            el: document.createElement('div'),
            propsData
//            data:{
//                'classId':this.treeId
//            },
        })
    }


    import EditTeacher   from './Edit.vue'
    const EditStudentModalComponent = Vue.extend(EditTeacher);
    const openEditStudentModal = (propsData = {}) => {
        return new EditStudentModalComponent({
            el: document.createElement('div'),
            propsData
        })
    }
    import Batch        from  './Batch.vue'
    const BatchModalComponent = Vue.extend(Batch);
    const openBatch = (propsData = {}) => {
        return new BatchModalComponent({
            el: document.createElement('div'),
            propsData
        })
    }

    let lists = []

    let delArray = function (id,list) {
        list.forEach((item,i)=>{
            if(item.babyId == id){
                list.splice(i,1)
            }
        })
    }

    export default{
        props:{
            treeId:Number,
            treeType:String,
            footer:{
                type:Boolean,
                default:false
            },
            expand:{
                type:Boolean,
                default:true
            },
            item:{
                type:Object,
                default:{}
            },
            school:Object,
            studentword:String,
        },
        data(){
            return{
                msg:'hello vue',
                title:'学生管理',
                items:lists,
                checkAll: true,  //判断是否全选
                checkArr: [],     //全选数据
                checkAbb:false,
                judgenumber:1,  //判断班级显示
                pullchange:[],
            }
        },
        watch: {
            treeId:function () {
                if('class' !== this.$store.state.tree.treeType){
                    // console.log('树中选的节点不是班级，所以不请求老师数据')
                    this.items = []
                    return
                }
                let that        = this
                var url         = 'tsbaby/selectBabyListByClassId'
                var reqData     = {
                    classId:that.treeId
                }
                if (that.treeId == 0) {
                    this.judgenumber = 0
                }else{
                    this.judgenumber = 1
                }
                
                this.$http.post(url, reqData).then(function (res){
                    console.log('学生',res.body);
                    if(res.body.code == 200){
                        let list   =  res.body.data
                        if(res.body.data == null){
                            that.items = []
                        }else{
                            list.forEach((item)=>{
                                
                                item.checked = false
                            })
                            that.items = list
                        }

//                        this.$notify({title: '成功',message: '信息修改成功',type: 'success'});
                    }
                })
            },
            checkArr:function () {
                //数据checkArr发送变化执行
                if (this.checkArr.length === this.items.length) {
                    this.checkAll = false
                    this.checkAbb = true
                } else {
                    this.checkAll = true
                    this.checkAbb = false
                }
            },
            studentword:function(){
                console.log(this.studentword);
                console.log(JSON.stringify(this.school));

                this.$store.commit('TREE_SELECT',0)
                let that    = this
                this.judgenumber = 0
                console.log(this.judgenumber);
                let url     = '/tsbaby/selectBabyListByCondition'
                var reqData     = {
                    schoolId:auth.getSchoolId(),
                    condition:that.studentword
                };
                console.log("tt")
                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        that.items   = data
                    }

                },function(res){
                    // 响应错误回调
                });
            }
        },
        computed: {
            treeId () {
                return this.$store.state.tree.current
            },
            list(){
                return this.items
            }
        },
        methods:{
            handleCheckAll() {
                //判断全选和反选
                if (this.checkAll) {
                    this.checkArr = this.items.map(item => {
                    return item.babyId
                    })
                   } else {
                    this.checkArr = []
                }
            },
            sexFormat:function (val) {
                if(val == null)
                    return '未知'
                let res = 1 == val ? '男' :'女'
                return res
            },
            Addcallbackgo:function(){
                console.log('成功');
                this.$emit('refresh');
            },
            addStudent:function (event) {
                if (this.treeId == 0) {
                    this.$notify({title: '提示',message: '请选择班级',type: 'warning'});
                }else{
                    openAddStudentModal({visible:true,classId:this.treeId,list:this.list,Addcallback:this.Addcallbackgo})
                }
            },
            editStudent:function (item) {
                openEditStudentModal({visible:true,item:item,school:this.school,editcallback:this.replacetreeId})
            },
            dateFormat:function (birthday) {
                // console.log(typeof birthday)
                // console.log(birthday)
                if(typeof birthday !== 'undefined' && birthday !== null &&  birthday !== ''){
                    var dt = moment(birthday).format("YYYY-MM-DD");
                    console.log(dt)
                    return dt
                }
                return ""
            },
            replacetreeId(){
                let that        = this
                var url         = 'tsbaby/selectBabyListByClassId'
                var reqData     = {
                    classId:that.treeId
                }


                this.$http.post(url, reqData).then(function (res){
                    console.log('学生',res.body);
                    if(res.body.code == 200){
                        let list   =  res.body.data
                        if(res.body.data == null){
                            that.items = []
                        }else{
                            list.forEach((item)=>{
                                
                                item.checked = false
                            })
                            that.items = list
                        }

//                        this.$notify({title: '成功',message: '信息修改成功',type: 'success'});
                    }
                })
            },
            batchList:function (event) {
                if (this.treeId == 0) {
                    this.$notify({title: '提示',message: '请选择班级',type: 'info'});
                }else{
                    openBatch({visible:true,classId:this.treeId,list:this.list,callback:this.replacetreeId})
                }
            },
            deleteStudent:function (item) {
                let that = this
                this.$confirm('删除该学生, 是否继续?', '提示', {
                    lockScroll:false,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let reqData = {
                        babyIds:item.babyId,
                        classId:that.treeId
                    }
                    let url     = 'tsbaby/deleteTSBabyByIds'
//                    ?teacherId=66&classId=1
                    that.$http.post(url, reqData).then(function (res){

                        console.log(res.body);
                        if(res.body.code == 200){
//                            that.items = res.body.data
                            delArray(item.babyId,that.items)
//                            this.$notify({title: '成功',message: '删除成功',type: 'success'});
                        }
                    })
                    /*this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });*/
                    this.$notify({title: '成功',message: '删除成功',type: 'success'});
                    this.Addcallbackgo();
                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });*/
                    this.$notify.info({title: '取消',message: '已取消删除',type: 'success'});
                });
//                console.log('gg')
//                openEditTeacherModal({visible:true})
            },
            deleteAll:function () {
                let that = this;
                this.$confirm('批量删除学生, 是否继续?', '提示', {
                    lockScroll:false,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                let arr  = [];
                let babys  = [];
                that.items.forEach((item,i)=>{
                    if(item.checked == true){
                        arr.push(i)
                        babys.push(item.babyId)
                    }
                })

                let reqData = {
                    babyIds:this.checkArr.join(","),
                    classId:that.treeId
                }
                let url     = 'tsbaby/deleteTSBabyByIds'
//                    ?teacherId=66&classId=1
                that.$http.post(url, reqData).then(function (res){
                    console.log(res.body);
                    if(res.body.code == 200){
//                            that.items = res.body.data
                        this.$notify({title: '成功',message: '批量删除成功',type: 'success'});
                        console.log('批量删',arr)
                        // for(var i = arr.length-1; i >= 0;i--){
                        //     console.log(arr[i])
                        //     that.items.splice(arr[i],1)
                        // }
                        this.checkAbb = false;
                        this.replacetreeId();
                        this.Addcallbackgo();
                    }
                })
                }).catch(() => {
                     this.$notify.info({title: '取消',message: '已取消删除',type: 'success'});
                });
            },
            StudentList() {
                 this.$confirm('导出当前学生信息, 是否继续?', '提示', {
                    lockScroll:false,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
    　　　　　　require.ensure([], () => {
    　　　　　　　　const { export_json_to_excel } = require('../vendor/Export');
    　　　　　　　　const tHeader = ['姓名', '性别', '地址', '生日', '手机','关联宝宝'];
    　　　　　　　　const filterVal = ['babyName', 'babyGender', 'address', 'birthday', 'phoneNum','isRelation'];
                  /*console.log(JSON.stringify(this.items));
                  console.log(JSON.stringify(this.items[0].recipe));*/
                  /*const  mondaydate = this.items[0].recipe.split('¨');
                  const  tuesday = this.items[1].recipe.split('¨');
                  const  wednesday = this.items[2].recipe.split('¨');
                  const  thursday = this.items[3].recipe.split('¨');
                  const  friday = this.items[4].recipe.split('¨');*/

                    let pullchange = JSON.parse(JSON.stringify(this.items));  
                    /*function copyArr(arr) {
                        let ress = []
                        for (let i = 0; i < arr.length; i++) {
                         ress.push(arr[i])
                        }
                        return ress
                    }*/

                    for (var i = 0; i < pullchange.length; i++) {
                      var pullitem = pullchange[i];
                      if (pullitem.babyGender == 1) {
                        pullitem.babyGender = "男";
                      }else{
                        pullitem.babyGender = "女";
                      }
                      if (pullitem.isRelation == 1) {
                        pullitem.isRelation = "是";
                      }else{
                        pullitem.isRelation = "否";
                      }
                      pullitem.birthday = this.dateFormat(pullitem.birthday);
                    }
                    const list = pullchange;
                  /*console.log(JSON.stringify(this.items));*/
    　　　　　　　　const data = this.formatJson(filterVal, list);
    　　　　　　　　export_json_to_excel(tHeader, data, '学生信息');
                  this.$notify({title: '成功',message: '导出成功',type: 'success'});
    　　　　　　})
            }).catch(() => {
                     this.$notify.info({title: '取消',message: '已取消删除',type: 'success'});
                });
    　　　　},
            formatJson(filterVal, jsonData) {
    　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
    　　　　}
        },
        components:{
            'expand-box':ExpandBox
        }
    }
</script>

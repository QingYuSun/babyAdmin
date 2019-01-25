<template>
    <div class="student-list">
        <expand-box :title="title">
            <div slot="body">
                <div class="box-body no-padding">
                    <div class="controls two-padding">
                        <!-- Check all button -->
                        <a @click="addTeacher" class="mail-create btn btn-primary ms-yh">新增教职工</a>
                        <a @click="deleteAll" class="mail-create btn btn-primary ms-yh">批量删除</a>
                        <a @click="batchList" class="mail-create btn btn-primary ms-yh">批量导入</a>
                    </div>
                    <div class="table-responsive mailbox-messages">
                        <table class="table table-hover table-striped felxe-table">
                            <thead>
                            <tr>
                                <th class="two-width">
                                    <p class="control">
                                        <input type="checkbox" v-model="checkAbb" @click="handleCheckAll">
                                    </p>
                                </th>
                                <th>姓名</th>
                                <th>职务</th>
                                <th>邮箱</th>
                                <th>手机</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <template v-for="(item,k) in items">
                                <tr>
                                    <td class="two-width">
                                        <p class="control">
                                            <input v-model="checkArr" :value="item.teacherId" type="checkbox">
                                        </p>
                                    </td>
                                    <td>{{item.teacherName}}</td>
                                    <td>{{item.position}}</td>
                                    <td>{{item.teacherEmail}}</td>
                                    <td>{{ item.phoneNum }}</td>
                                    <td>
                                        <p>
                                            <a @click="editTeacher(item)" class="link-edit">编辑</a>
                                            <span>|</span>
                                            <a class="link-delete" @click="deleteTeacher(item)">删除</a>
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
    import ExpandBox     from '../Com/ExpandBox.vue'
    import AddTeacher    from './Add.vue'

    const AddTeacherModalComponent = Vue.extend(AddTeacher);
    const openAddTeacherModal = (propsData = {}) => {
        return new AddTeacherModalComponent({
            el: document.createElement('div'),
            propsData
//            data:{
//                'classId':this.treeId
//            },
        })
    }

    import EditTeacher   from './Edit.vue'
    const EditTeacherModalComponent = Vue.extend(EditTeacher);
    const openEditTeacherModal = (propsData = {}) => {
        return new EditTeacherModalComponent({
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

    let delArray = function (id,list) {
        list.forEach((item,i)=>{
            if(item.teacherId == id){
                list.splice(i,1) 
            }
        })
    }


    let lists = []

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
            school:Object
        },
        data(){
            return{
                msg:'hello vue',
                title:'教师管理',
                items:lists,
                checkAll: true,  //判断是否全选
                checkArr: [],     //全选数据
                checkAbb:false
            }
        },
        watch: {
            treeId:function () {
               this.refresh()
                // console.log("2222222233333");
            },
             treeType:function () {
               this.refresh()
                // console.log("2222222233333");
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
            }
        },
        computed: {
            treeId () {
                return this.$store.state.tree.current
            },
            treeType () {
                return this.$store.state.tree.treeType
            },
            list(){
                return this.items
            }
        },
        ready:function () {

        },
        methods:{
            handleCheckAll() {
                //判断全选和反选
                if (this.checkAll) {
                    this.checkArr = this.items.map(item => {
                    return item.teacherId
                    })
                   } else {
                    this.checkArr = []
                }
            },
            refresh:function () {
                 // console.log(this.$store.state.tree.treeType)
                if('class' !== this.$store.state.tree.treeType){
                    console.log('树中选的节点不是班级，所以不请求老师数据')
                    this.items = []
                    return
                }

                // console.log('treeId')
                let that        = this
                var url         = 'tclass/selectTeacherListByClassId'
                var reqData     = {
                    classId:that.treeId
                }


                this.$http.post(url, reqData).then(function (res){
                    console.log(res.body);
                    if(res.body.code == 200){
                        let list   =  res.body.data
                        list.forEach((item)=>{
                            item.checked = false
                        })
                        that.items = list
//                        this.$notify({title: '成功',message: '信息修改成功',type: 'success'});
                    }
                })
            },
            sexFormat:function (val) {
                let res = 1 == val ? '男' :'女'
                return res
            },
            addTeacher:function (event) {
                if ('class' !== this.$store.state.tree.treeType) {
                    this.$notify({title: '提示',message: '请选择班级',type: 'info'});
                }else{
                    openAddTeacherModal({visible:true,classId:this.treeId,list:this.list,callback:this.refresh})
                }
            },
            editTeacher:function (item) {
                console.log('item   '+JSON.stringify(item))
                openEditTeacherModal({visible:true,item:item,school:this.school,callback:this.refresh})
            },
            deleteTeacher:function (item) {
                let that = this
                this.$confirm('删除该教师, 是否继续?', '提示', {
                    lockScroll:false,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let reqData = {
                        teacherId:item.teacherId,
                        classId:that.treeId
                    }
                    let url     = 'tTeacher/deleteTeacher'
//                    ?teacherId=66&classId=1
                    that.$http.post(url, reqData).then(function (res){
                        delArray(reqData.teacherId,that.items)
                        console.log(res.body);
                        if(res.body.code == 200){
//                            that.items = res.body.data
//                        this.$notify({title: '成功',message: '信息修改成功',type: 'success'});
                            /*this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });*/
                            this.$notify({title: '成功',message: '删除成功',type: 'success'});
                        }else{
                            /*this.$message({
                                type: 'info',
                                message: '删除失败'
                            });*/
                            this.$notify.info({title: '取消',message: '已取消删除',type: 'success'});
                            this.refresh();
                        }
                    })
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
            batchList:function (event) {
                if ('class' !== this.$store.state.tree.treeType) {
                    this.$notify({title: '提示',message: '请选择班级',type: 'warning'});
                }else{
                    openBatch({visible:true,classId:this.treeId,list:this.list,callback:this.refresh})
                }
            },
            deleteAll:function () {
                let that = this;
                let arr  = [];
                let teachers  = [];
                that.items.forEach((item,i)=>{
                    if(item.checked == true){
                        arr.push(i)
                        teachers.push(item.teacherId)
                    }
                })


                let reqData = {
                    teacherId: this.checkArr.join(","),
                    classId:that.treeId
                }
                let url     = 'tTeacher/deleteTeacherList'
//                    ?teacherId=66&classId=1
                that.$http.post(url, reqData).then(function (res){
                    console.log(res.body);
                    if(res.body.code == 200){
//                            that.items = res.body.data
                        this.$notify({title: '成功',message: '批量删除成功',type: 'success'});

                        /*for(var i = arr.length-1; i >= 0;i--){
                            console.log(arr[i])
                            that.items.splice(arr[i].index,1)
                        }*/
                        this.checkAbb = false;
                        this.refresh();
                    }
                })
            }
        },
        components:{
            'expand-box':ExpandBox
        }
    }
</script>

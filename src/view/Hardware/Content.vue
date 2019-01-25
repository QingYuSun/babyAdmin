<template>
    <div class="student-list">
        <expand-box :title="title">
            <div slot="body">
                <div class="box-body no-padding">
                    <div class="table-responsive mailbox-messages">
                        <table class="table table-hover table-striped felxe-table">
                            <thead>
                            <tr>
                                <th class="two-hard">设备名</th>
                                <th>识别码</th>
                                <th>创建日期</th>
                                <th>更新日期</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <!-- <template>
                                <tr>
                                    <td>考勤机1</td>
                                    <td>9527</td>
                                    <td>2008.8.8</td>
                                    <td>2017.8.18</td>
                                    <td>已绑定</td>
                                    <td>
                                        <p>
                                            <a @click="editStudent" class="link-edit">编辑</a>
                                            <span>|</span>
                                            <a @click="deleteStudent(item)" class="link-delete">删除</a>
                                        </p>
                                    </td>
                                </tr>
                            </template> -->
                            <template v-for="(item,k) in items">
                                <tr>
                                    <td class="two-hard">{{item.machineName}}</td>
                                    <td>{{item.machineCode}}</td>
                                    <td>{{newtime(item.creataTime)}}</td>
                                    <td>{{newtime(item.updateTime)}}</td>
                                    <td>{{ binding(item.state) }}</td>
                                    <td>
                                        <p>
                                            <!-- <a @click="editStudent(item)" class="link-edit">编辑</a>
                                            <span>|</span> -->
                                            <a @click="deletehardware(item)" class="link-delete">删除</a>
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
            padding: 10px;

            .btn {
                border-radius: 3px;
                -webkit-box-shadow: none;
                box-shadow: none;
                border: 1px solid transparent;
                margin-right: 1rem;
            }
        }
    }


    .table-striped>tbody>tr:nth-of-type(odd) {
        background-color: #f9f9f9;
    }
    .table>thead>tr>th, .table>tbody>tr>th, .table>tfoot>tr>th, .table>thead>tr>td, .table>tbody>tr>td, .table>tfoot>tr>td {
        border-top: 1px solid #f4f4f4;
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
    .two-hard{
        padding-left: 18px !important;
    }
    .felxe-table{
        table-layout:fixed;
    }
</style>
<script>
    import ExpandBox from '../Com/ExpandBox.vue'
    import auth from '../../js/auth'
    import AddStudent    from './Add.vue'


    import EditTeacher   from './Edit.vue'
    const EditStudentModalComponent = Vue.extend(EditTeacher);
    const openEditStudentModal = (propsData = {}) => {
        return new EditStudentModalComponent({
            el: document.createElement('div'),
            propsData
        })
    }


    export default{
        data(){
            return{
                msg:'hello vue',
                title:'考勤机',
                items:[]
            }
        },
        props:{
            Change:Object,
        },
        watch:{
            Change:function(){
                 this.hardwaredate();
            }
        },
        created(){
            this.hardwaredate();
        },
        methods:{
            binding(par){
                if (par == 1) {
                    return '已绑定'
                }else{
                    return '未绑定'
                }
            },
            newtime:function(el){
                return moment(el).format('YYYY.MM.DD')
            },
            editStudent:function (item) {
                //编辑
                openEditStudentModal({visible:true})
            },
            hardwaredate(){
                let that = this
                var url          = 'hardWare/selectTschoolMachineList'
                var reqData = {};
                    reqData.schoolId = auth.getSchoolId();

                this.$http.post(url, reqData).then(function (res){
                    if(res.body.code == 200){
                        let data    = res.body.data;
                        that.items = data
                    }
                })
            },
            deletehardware:function (item) {
                //删除
                let that = this
                this.$confirm('删除该考勤机, 绑定的考勤机不能使用,是否继续?', '提示', {
                    lockScroll:false,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let reqData = {
                        machineCode:item.machineCode,
                    }
                    let url     = 'hardWare/deleteMachine'
                    that.$http.post(url, reqData).then(function (res){
                        if(res.body.code == 200){
                            /*delArray(item.babyId,that.items)*/
                            this.hardwaredate();
                        }
                    })
                    /*this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });*/
                    this.$notify({title: '成功',message: '删除成功',type: 'success'});
                    this.Addcallbackgo();
                }).catch(() => {
                });
            },
        },
        components:{
            'expand-box':ExpandBox
        }
    }
</script>

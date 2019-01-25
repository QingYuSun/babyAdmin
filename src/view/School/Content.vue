<template>
    <div class="student-list">
        <expand-box :title="title">
            <div slot="body">
                <div class="box-body no-padding">
                    <!--<div v-if="show" class="controls two-border" style="padding-left: 18px;">
                         Check all button
                        <a @click="addSchool" v-if="show" class="mail-create btn btn-primary ms-yh">新增学校</a>
                         <a class="mail-create btn btn-primary ms-yh">批量导入</a> 
                    </div> -->
                    <div class="table-responsive mailbox-messages">
                        <table class="table table-hover table-striped felxe-table">
                            <thead>
                            <tr>
                                <th class="two-width">&nbsp;</th>
                                <th>学校</th>
                                <th>地址</th>
                                <th>电话</th>
                                <th>
                                    <select v-model="street" class="by-setcity" style="width: 80%;height: 22px;">
                                        <option v-for="item in towns" :value="item.code">
                                            {{item.name}}
                                        </option>
                                    </select>
                                </th>
                                <th>创建时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <template v-for="(item,k) in items">
                                <tr>
                                    <td class="two-width">
                                        <p class="control">
                                            <input type="checkbox">
                                        </p>
                                    </td>
                                    <td>{{item.schoolName}}</td>
                                    <td>{{item.schoolAddress}}</td>
                                    <td>{{item.schoolPhone}}</td>
                                    <td>{{ areaCover(item.region) }}</td>
                                    <td>{{ dateformat(item.foundingTime) }}</td>
                                    <td>
                                        <p>
                                            <a @click="editSchool(item)" class="link-edit">编辑</a>
                                            <span>|</span>
                                            <a class="link-delete">删除</a>
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
        max-height: 60px;
    }
    .mailbox-messages{
        .fa{
            vertical-align: middle;
        }
        a {
            color: #3c8dbc;
        }
    }
    .felxe-table{
        table-layout:fixed;
    }
    .two-width{
        width: 40px;
        padding-left: 20px !important;
    }
    .two-border{
        border-bottom:1px solid #f4f4f4;
    }
</style>
<script>
 
    var lists = [
        {
            id:1,
            schoolName:'哈喽宝贝幼儿园',
            schoolAddress:1,
            schoolPhone:'班主任',
            region:'18857631006',
            foundingTime:1493568000000,

        },
        {
            id:2,
            schoolName:'哈喽宝贝幼儿园',
            schoolAddress:1,
            schoolPhone:'班主任',
            region:'18857631006',
            foundingTime:1493568000000,
        },
        {
            id:3,
            schoolName:'哈喽宝贝幼儿园',
            schoolAddress:1,
            schoolPhone:'班主任',
            region:'18857631006',
            foundingTime:1493568000000,

        }
    ]

    var area = {
        "331002001":"海门街道",
        "331002002":"白云街道",
        "331002003":"葭沚街道",
        "331002004":"洪家街道",
        "331002005":"三甲街道",
        "331002006":"下陈街道",
        "331002007":"前所街道",
        "331002008":"章安街道",
        "331002101":"大陈镇",
        "331002400":"椒江农场",
    }

    import ExpandBox from '../Com/ExpandBox.vue'
    /*import SchoolAdd from './Add.vue'*/
    import SchoolEdit from './Edit.vue'

    /*const AddSchoolModalComponent = Vue.extend(SchoolAdd);
    const openAddSchoolModal = (propsData = {}) => {
        return new AddSchoolModalComponent({
            el: document.createElement('div'),
            propsData
//            data:{
//                'classId':this.treeId
//            },
        })
    }*/

    const EditSchoolModalComponent = Vue.extend(SchoolEdit);
    const openEditSchoolModal = (propsData = {}) => {
        return new EditSchoolModalComponent({
            el: document.createElement('div'),
            propsData
//            data:{
//                'classId':this.treeId
//            },
        })
    }

    export default{
        name:'school',
        props: ['area','change'],
        data(){
            return{
                msg:'hello vue',
                title:'学校管理',
                items:[],
                show:false,
                towns:'',//获取的街道
                street:'',//显示的街道
            }
        },
        watch:{
            area:function () {
                console.log(JSON.stringify(this.area));
                this.show = true;
                /*let url     = '/tschool/selectSchools'*/
                let url     = 'tschool/selectSchoolsFromRegion'
                var reqData     = {
                    region:this.area.code
                };
                console.log(reqData.region)
                this.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        this.items   = data
                    }
                },function(res){
                    // 响应错误回调
                });
                this.getTowns(this.area.code);
            },
            change:function(){
                console.log('ll');
                this.refresh();
            },
            street:function(){
                console.log(JSON.stringify(this.area));
                this.show = true;
                if (this.street.length == 6) {
                    let url     = 'tschool/selectSchoolsFromRegion'
                    var reqData     = {
                        region:this.street
                    };
                    console.log(reqData.region)
                    this.$http.post(url,reqData).then(function (res) {
                        if(res.body.code == "200") {
                            let data    = res.body.data;
                            this.items   = data
                        }
                    },function(res){
                        // 响应错误回调
                    });
                }else{
                    let url     = 'tschool/selectSchools'
                    var reqData     = {
                        region:this.street
                    };
                    console.log(reqData.region)
                    this.$http.post(url,reqData).then(function (res) {
                        if(res.body.code == "200") {
                            let data    = res.body.data;
                            this.items   = data
                        }
                    },function(res){
                        // 响应错误回调
                    });
                }
                /*let url     = '/tschool/selectSchools'
                let url     = 'tschool/selectSchoolsFromRegion'*/
            }
        },
        methods:{
            sexFormat:function (val) {
                let res = 1 == val ? '男' :'女'
                return res
            },
            getTowns: function(code){
                //获取街道信息
                // this.$store.commit('TREE_SELECT',0)
                let that    = this
                let url     = 'tarea/selectAreas'
                var reqData     = {
                    code:code
                };
                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        that.towns  = data[0].data;
                        that.towns.unshift(this.area);
                        that.street = that.towns[0].code
                        console.log(JSON.stringify(that.towns));
                    }
                },function(res){
                    // 响应错误回调
                    console.log("/tarea/selectAreas   error")
                });
            },
            dateformat:function (timestamp) {
                var newDate = new Date();
                newDate.setTime(timestamp);
                return newDate.toJSON().split(/T/)[0];
            },
            areaCover:function (aCode) {
                return area[aCode];
            },
            refresh:function () {
                /*console.log(this.area);*/
                let url     = 'tschool/selectSchoolsFromRegion'
                var reqData     = {
                    region:this.area.code
                };
                console.log(reqData.region)
                this.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        this.items   = data
                    }
                },function(res){
                    // 响应错误回调
                });
            },
            /*addSchool:function () {
                openAddSchoolModal({visible:true,area:this.area,callback:this.refresh})
            },*/
            editSchool:function (item) {
                let url     = '/tschool/selectSchool'
                var reqData     = {
                    schoolId:item.schoolId
                };
                console.log(reqData.region)
                this.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        var form = data.school;
                        form.foundingTime = moment(form.foundingTime).format("YYYY-MM-DD")
                        form.teacherId=data.administrator.teacherId;
                        form.name=data.administrator.teacherName;
                        form.phoneNum=data.administrator.phoneNum;
                        form.position=data.administrator.position;
                        form.email=data.administrator.teacherEmail;
                        console.log('editSchool')
                        console.log(JSON.stringify(form))
                        openEditSchoolModal({visible:true,area:this.area,form:form,callback:this.refresh})
                    }
                },function(res){
                    // 响应错误回调
                });
                // openEditSchoolModal({visible:true,area:this.area,callback:this.refresh})
            }
        },
        components:{
            'expand-box':ExpandBox
        }
    }


   
    
</script>

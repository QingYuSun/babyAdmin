<template>
    <box-modal :title="title" :visible="true" transition="roll">
        <div class="msg-wrp" style="padding-bottom: 0;">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="basic"></el-tab-pane>
                <el-tab-pane label="所属班级" name="belong"></el-tab-pane>
                <el-tab-pane label="辅助信息" name="assist"></el-tab-pane>
            </el-tabs>
            <div class="tab-cont three-unify" v-show="activeName == 'basic'">
                <!--<div class="control is-horizontal">-->
                    <!--<div class="control-label">-->
                        <!--<label class="label">帐号:</label>-->
                    <!--</div>-->
                    <!--<div class="control is-grouped">-->
                        <!--<p class="control is-expanded">-->
                            <!--<input name="account" class="input" type="text" placeholder="帐号">-->
                        <!--</p>-->
                    <!--</div>-->
                <!--</div>-->
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">密码:</label>
                    </div>
                    <div class="control">
                        <input name="pwd" v-model="item.password" type="password" class="input" placeholder="密码"></input>
                    </div>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">姓名:</label>
                    </div>
                    <p class="control">
                        <input name="username" v-model="item.teacherName" class="input" type="text" placeholder="姓名">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">手机:</label>
                    </div>
                    <p class="control">
                        <input name="phone" v-model="item.phoneNum" class="input" type="text" placeholder="手机">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">邮箱:</label>
                    </div>
                    <p class="control">
                        <input name="phone" v-model="item.teacherEmail" class="input" type="text" placeholder="邮箱">
                    </p>
                </div>
                <!--<div class="control is-horizontal">-->
                    <!--<div class="control-label">-->
                        <!--<label class="label">部门:</label>-->
                    <!--</div>-->
                    <!--<p class="control">-->
                        <!--<input name="phone" class="input" type="text" placeholder="部门">-->
                    <!--</p>-->
                <!--</div>-->
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">职务:</label>
                    </div>
                    <p class="control">
                        <input name="phone" v-model="item.position" class="input" type="text" placeholder="职务">
                    </p>
                </div>
                <!--<div class="control is-horizontal">-->
                    <!--<div class="control-label">-->
                        <!--<label class="label">座机:</label>-->
                    <!--</div>-->
                    <!--<p class="control">-->
                        <!--<input name="phone" class="input" type="text" placeholder="座机">-->
                    <!--</p>-->
                <!--</div>-->
            </div>
            <div class="tab-cont" v-show="activeName == 'belong'">
                <el-tree
                        :data="grades"
                        show-checkbox
                        node-key="id"
                        ref="tree"
                        :default-expanded-keys="[2, 3]"
                        :default-checked-keys="checkedList"
                        :props="defaultProps">
                </el-tree>
                <!--<div class="control is-horizontal">-->
                    <!--<div class="control-label">-->
                        <!--<label class="label">部门:</label>-->
                    <!--</div>-->
                    <!--<p class="control">-->
                        <!--<input name="phone" class="input" type="text" placeholder="部门">-->
                    <!--</p>-->
                <!--</div>-->
                <!--<div class="control is-horizontal">-->
                    <!--<div class="control-label">-->
                        <!--<label class="label">职务:</label>-->
                    <!--</div>-->
                    <!--<p class="control">-->
                        <!--<input name="phone" class="input" type="text" placeholder="职务">-->
                    <!--</p>-->
                <!--</div>-->
                <!--<div class="control is-horizontal">-->
                    <!--<div class="control-label">-->
                        <!--<label class="label">座机:</label>-->
                    <!--</div>-->
                    <!--<p class="control">-->
                        <!--<input name="phone" class="input" type="text" placeholder="座机">-->
                    <!--</p>-->
                <!--</div>-->
            </div>
            <div class="tab-cont three-unify" v-show="activeName == 'assist'">
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">工号:</label>
                    </div>
                    <div class="control is-grouped">
                        <p class="control is-expanded">
                            <input v-model="item.workNumber" name="account" class="input" type="text" placeholder="工号">
                        </p>
                    </div>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">籍贯:</label>
                    </div>
                    <div class="control">
                        <input name="pwd" v-model="item.nativePlace" type="password" class="input" placeholder="籍贯"></input>
                    </div>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">毕业学校:</label>
                    </div>
                    <p class="control">
                        <input  v-model="item.graduateSchool" class="input" type="text" placeholder="毕业学校">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">毕业时间:</label>
                    </div>
                    <p class="control">
                        <input name="phone" v-model="item.graduationTime" class="input" type="text" placeholder="毕业时间">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">学历:</label>
                    </div>
                    <p class="control">
                        <input name="phone" v-model="item.education" class="input" type="text" placeholder="学历">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label  class="label">专业:</label>
                    </div>
                    <p class="control">
                        <input v-model="item.major" name="phone" class="input" type="text" placeholder="专业">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">备注:</label>
                    </div>
                    <p class="control">
                        <textarea v-model="item.remarks" name="describe" class="textarea" placeholder="备注"></textarea>
                    </p>
                </div>
            </div>
            <div class="button-group" style="text-align: right;">
                <div class="control" style="display: inline-block;">
                    <button @click="doCancel" type="submit" class="button is-cancel">取消</button>
                </div>
                <div class="control" style="display: inline-block;">
                    <button type="submit" @click="doSave" class="button is-primary">提交</button>
                </div>
            </div>
        </div>
    </box-modal>
</template>
<style lang="scss">
    .msg-wrp{
        padding: 2rem;
        .label{
            font-weight: normal;
        }
        .button-group{
            padding: .8rem .2rem;
        }
        .tab-cont{
            padding: .8rem .2rem;
        }
    }
    .three-unify{
        .is-horizontal{
            .control{
        -webkit-box-flex: 8 !important;
        -ms-flex-positive: 8 !important;
        flex-grow: 8 !important;
            }
        }
    }
</style>
<script>
    import BoxModal from '../Com/BoxModal.vue'
    export default{
        name:'newMsg',
        data(){
            return{
                title:'编辑职工',
                activeName: 'basic',
                msg:'hello vue',
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
                value7: '',
                grades: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                checkedList:[3]
            }
        },
        props:{
            item:Object,
            school:Object,
            callback:Object,
        },
        created:function () {
            let grades = []
            this.school.children.forEach((item,i)=>{
                let o = {
                    label:item.name
                }
                if(item.children){
                    let arr = []
                    item.children.forEach((tClass)=>{
                        arr.push({
                            id:tClass.classId,
                            label:tClass.name
                        })
                    })
                    o.children = arr
                }
                grades.push(o)
            })

            this.grades         = grades
            this.checkedList    = this.item.tClassList
        },
        methods:{
            handleClick(tab, event) {
                this.item.graduationTime = moment(this.item.tClassList.graduationTime).format("YYYY-MM-DD")
                console.log(this.item.tClassList.graduationTime);

                console.log(tab, event);
            },
            doCancel:function () {
                document.querySelector(".modal-close").click()
            },
            doSave:function () {
                let url = 'tTeacher/updateTeacherAll'
                console.log(this.$refs.tree.getCheckedNodes());
                let arr = this.$refs.tree.getCheckedNodes()
                let selectList = []
                console.log('array',arr)
                arr.forEach((ele)=>{
                    if(ele.children ==null){
                        selectList.push(ele.id)
                    }
                })
                if (this.item.password != undefined) {
                    if (this.item.password == '') {
                        alert('密码为空');
                    }
                    if (this.item.password.length < 6) {
                        alert('密码长度不足6位');
                        return;
                    }
                }
                
                console.log('selectList',selectList)
//                console.log(this.checkedList)
                let reqData        = this.item
                reqData.graduationTime = moment(this.item).format("YYYY-MM-DD")
                this.item.children = selectList
                reqData.classIds=selectList.join(',')
//                let arr = []

//                item.tClassList =
//                let school       = this.school
//                let admin        = this.admin
//                var reqData      = this.form
//                reqData.classId  = this.classId;
//                reqData.schoolId = 1


                this.$http.post(url, reqData).then(function (res){
                    console.log(res.body);
                   if(res.body.code == '200'){
                        this.doCancel();
                       this.$notify({title: '成功',message: '信息修改成功',type: 'success'});
                       this.callback();
                   }
                })
            }
        },
        components:{
            'box-modal':BoxModal
        }
    }
</script>

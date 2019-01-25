<template>
    <box-modal :title="title" :visible="true" transition="roll">
        <div class="msg-wrp" style="padding-bottom: 0;">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="basic"></el-tab-pane>
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
                    <div class="control-label star">
                        <label class="label"><i>*</i>密码:</label>
                    </div>
                    <div class="control">
                        <input name="pwd" v-model="madPassword" type="password" class="input" placeholder="密码"></input>
                    </div>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label star">
                        <label class="label"><i>*</i>姓名:</label>
                    </div>
                    <p class="control">
                        <input name="username" v-model="form.teacherName" class="input" type="text" placeholder="姓名">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label star">
                        <label class="label"><i>*</i>手机:</label>
                    </div>
                    <p class="control">
                        <input name="phone" v-model="form.phoneNum" class="input" type="text" placeholder="手机">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">邮箱:</label>
                    </div>
                    <p class="control">
                        <input name="phone" v-model="form.teacherEmail"  class="input" type="text" placeholder="邮箱">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">部门:</label>
                    </div>
                    <p class="control">
                        <input name="phone"    class="input" type="text" placeholder="部门">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label star">
                        <label class="label"><i>*</i>职务:</label>
                    </div>
                    <p class="control">
                        <input name="phone" v-model="form.position" class="input" type="text" placeholder="职务">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">座机:</label>
                    </div>
                    <p class="control">
                        <input name="phone"  class="input" type="text" placeholder="座机">
                    </p>
                </div>
            </div>

            <div class="tab-cont three-unify" v-show="activeName == 'assist'">
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">工号:</label>
                    </div>
                    <div class="control is-grouped">
                        <p class="control is-expanded">
                            <input name="account" v-model="form.workNumber" class="input" type="text" placeholder="工号">
                        </p>
                    </div>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">籍贯:</label>
                    </div>
                    <div class="control">
                        <input name="pwd"  v-model="form.nativePlace" type="text" class="input" placeholder="籍贯"></input>
                    </div>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">毕业学校:</label>
                    </div>
                    <p class="control">
                        <input name="username"  v-model="form.graduateSchool" class="input" type="text" placeholder="毕业学校">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">毕业时间:</label>
                    </div>
                    <p class="control">
                        <input name="phone" v-model="form.graduationTime" class="input" type="text" placeholder="时间格式YYYY-MM-DD">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">学历:</label>
                    </div>
                    <p class="control">
                        <input name="phone"  v-model="form.education" class="input" type="text" placeholder="学历">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">专业:</label>
                    </div>
                    <p class="control">
                        <input name="phone"  v-model="form.major" class="input" type="text" placeholder="专业">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">备注:</label>
                    </div>
                    <p class="control">
                        <textarea name="describe"  v-model="form.remarks" class="textarea" placeholder="备注"></textarea>
                    </p>
                </div>
            </div>
            <div class="button-group" style="text-align: right;">
                <div class="control" style="display: inline-block;">
                    <button @click="doCancel" type="submit" class="button is-cancel">取消</button>
                </div>
                <div class="control" style="display: inline-block;">
                    <button type="submit" @click="doAdd" class="button is-primary">提交</button>
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
    .star i{
        color: red;
        padding: 0 0.3rem;
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
    .el-tabs__nav{
        .is-active{
            color: #f8b62d !important;
        }
    }
</style>
<script>
    import BoxModal from '../Com/BoxModal.vue'
    import auth from '../../js/auth'
    export default{
        name:'newMsg',
        data(){
            return{
                title:'新建职工',
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
                madPassword:'',
                form:{
                    teacherName:'',
                    phoneNum:'',
                    teacherPassword:'',
                    position:'',
                    graduationTime:''

                }
            }
        },
        props:{
            classId:Number,
            list:Object,
            callback:Object,
        },
        computed: {
            currentId () {
                return this.$store.state.tree.current
            }
        },
        methods:{
            handleClick(tab, event) {
            },
            doCancel:function () {
                document.querySelector(".modal-close").click()
            },
            doAdd:function () {
                var dd2 = this.madPassword;
                var hash = md5(dd2);
                this.form.teacherPassword = hash.toUpperCase();
                console.log(this.form.teacherPassword);
                console.log("classId",this.classId)
                console.log("items",this.list)
                var url          = 'tTeacher/insertTeacherAll'
                let school       = this.school
                let admin        = this.admin
                var reqData      = this.form
                reqData.classId  = this.classId;
                reqData.schoolId = auth.getSchoolId();
                var quchumad = this.madPassword.replace(/(^\s*)|(\s*$)/g, "");
                if (quchumad == '') {
                    alert('密码不能为空');
                    return;
                }
                if (quchumad.length < 6) {
                    alert('密码长度不足6位');
                    return;
                }
                if (this.form.teacherName == '') {
                    alert('姓名不能为空');
                    return;
                }
                var sMobile = this.form.phoneNum
                if(!(/^1[3456789]\d{9}$/.test(sMobile))){
                    alert("不是完整的11位手机号或者正确的手机号前七位"); 
                    return;
                }
                if (this.form.position == '') {
                    alert('职务不能为空');
                    return;
                }
                this.$http.post(url, reqData).then(function (res){
                    if(res.body.code == "200") {
                        this.$notify({title: '成功',message: '教师新增成功',type: 'success'});
                        this.callback()
                        this.doCancel();
                    }else if(res.body.code == "400"){
                        this.$notify({title: '失败',message: res.body.msg ,type: 'error'});
                    }
                  // console.log(res.body);
                   
//                    if(res.body.msg.toUpperCase() == 'OK'){
//                        this.$notify({title: '成功',message: '信息修改成功',type: 'success'});
//                    }

                })
            }
        },
        components:{
            'box-modal':BoxModal
        }
    }
</script>

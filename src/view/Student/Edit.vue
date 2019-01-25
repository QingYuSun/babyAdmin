<template>
    <box-modal :title="title" :visible="true" transition="roll">
        <div class="msg-wrp" style="padding-bottom: 0;">
            <!--<el-tabs v-model="activeName" type="card" @tab-click="handleClick">-->
                <!--&lt;!&ndash;<el-tab-pane label="基本信息" name="basic"></el-tab-pane>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-tab-pane label="所属班级" name="belong"></el-tab-pane>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-tab-pane label="辅助信息" name="assist"></el-tab-pane>&ndash;&gt;-->
            <!--</el-tabs>-->
            <div>
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
                <!--<div class="control is-horizontal">-->
                    <!--<div class="control-label">-->
                        <!--<label class="label">密码:</label>-->
                    <!--</div>-->
                    <!--<div class="control">-->
                        <!--<input name="pwd" v-model="item.password" type="password" class="input" placeholder="密码"></input>-->
                    <!--</div>-->
                <!--</div>-->
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">姓名:</label>
                    </div>
                    <p class="control">
                        <input v-if="item.isRelation==1" disabled="disabled" name="username" v-model="item.babyName" class="input" type="text" placeholder="姓名">
                        <input v-else name="username" v-model="item.babyName" class="input" type="text" placeholder="姓名">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">手机:</label>
                    </div>
                    <p class="control">
                        <input v-if="item.isRelation==1" disabled="disabled" name="phone" v-model="item.phoneNum" class="input" type="text" placeholder="手机">
                        <input v-else name="phone" v-model="item.phoneNum" class="input" type="text" placeholder="手机">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">生日:</label>
                    </div>
                    <p class="control">
                        <input name="phone" v-model="Custombirthday"  class="input" :value="birthdayFormat" type="text" placeholder="YYYY-MM-DD">
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
                        <label class="label">性别:</label>
                    </div>
                    <div class="select control">
                        <select class="input" v-model="item.babyGender">
                            <option value="0">女</option>
                            <option value="1">男</option>
                        </select>
                    </div>
                    <!--<p class="control">-->
                        <!--<input  v-model="item.babyGender" class="input" type="text" placeholder="性别">-->
                    <!--</p>-->
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">地址:</label>
                    </div>
                    <p class="control">
                        <input name="phone" v-model="item.address" class="input" type="text" placeholder="地址">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">班级:</label>
                    </div>
                    <div class="control">
                        <el-select v-model="item.classId" placeholder="请选择学生">
                            <el-option-group
                                v-for="group in grades"
                                :label="group.label">
                                <!-- <el-option
                                    v-for="item in tClass"
                                    :label="item.label">
                                </el-option> -->
                                <el-option
                                        v-for="item in group.children"
                                        :label="item.label"
                                        :value="item.id">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </div>
                    <!--<p class="control">-->
                        <!--<input  v-model="item.babyGender" class="input" type="text" placeholder="性别">-->
                    <!--</p>-->
                </div>
            </div>
            <!--<div class="tab-cont" v-show="activeName == 'belong'">-->
                <!--<el-tree-->
                        <!--:data="grades"-->
                        <!--show-checkbox-->
                        <!--node-key="id"-->
                        <!--ref="tree"-->
                        <!--:default-expanded-keys="[2, 3]"-->
                        <!--:default-checked-keys="checkedList"-->
                        <!--:props="defaultProps">-->
                <!--</el-tree>-->
            <!--</div>-->
            <!--</div>-->
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
                tClass: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                checkedList:[3],
                Custombirthday:''
            }
        },
        props:{
            item:Object,
            school:Object,
            editcallback:Object,
        },
        watch:{
            Custombirthday(){
                var dateString = this.Custombirthday;
                var pattern = /(\d{4})(\d{2})(\d{2})/;
                var formatedDate = dateString.replace(pattern, '$1-$2-$3');
                this.Custombirthday = formatedDate
                this.item.birthday = this.Custombirthday
            }
        },
        created:function () {
            let grades = []
//            console.log(JSON.stringify(this.school.children));
//            console.log(this.item)
//            let checkList = this.item.tClassList
//            this.item.tClassList.forEach(item=>{
//                checkList.push(item.classId)
//            })

//            this.grades = this.school.subs;
//            this.school.subs.forEach((item,i)=>{
//                let o = {
//                    id:item.gradeId,
//                    label:item.gradeName
//                }
//                if(!!item.tClassList){
//                    let arr = []
//                    item.tClassList.forEach((tClass)=>{
//                        arr.push({
//                            id:tClass.classId,
//                            label:tClass.className
//                        })
//                    })
//                    o.children = arr
//                }
//                grades.push(o)
//            })
            this.school.children.forEach((item,i)=>{
                //console.log(this.school.children[i].children);
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
            this.item.birthday = this.birthdayFormat()
            this.grades         = grades
            this.checkedList    = this.item.tClassList

            this.Custombirthday = this.item.birthday
            //console.log(JSON.stringify(grades));
        },
        computed:{
           
        },
        methods:{
            birthdayFormat:function () {
                if(typeof this.item.birthday !== 'undefined' && this.item.birthday !== null)
                    return moment(this.item.birthday).format("YYYY-MM-DD")
                return ""
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            doCancel:function () {
                document.querySelector(".modal-close").click()
            },
            doSave:function () {
                if (this.item.babyName == null || this.item.babyName == '') {
                    alert('请填写姓名');
                    return;
                }
                var ParentssMobile = this.item.phoneNum
                if(!(/^1[34578]\d{9}$/.test(ParentssMobile))){
                    alert("不是完整的11位手机号或者正确的手机号前七位"); 
                    return;
                }
                if (this.item.birthday == null) {
                    alert('请选择生日');
                    return;
                }
                if (this.item.babyGender == null) {
                    alert('请选择性别');
                    return;
                }
                if (this.item.address == null || this.item.address == '') {
                    alert('请填写地址');
                    return;
                }
                let url = 'tsbaby/updateTSBaby'
//                console.log(this.$refs.tree.getCheckedNodes());
//                let arr = this.$refs.tree.getCheckedNodes()
                let selectList = []
//                console.log('array',arr)
//                arr.forEach((ele)=>{
//                    if(ele.children ==null){
//                        selectList.push(ele.id)
//                    }
//                })


//                console.log('selectList',selectList)
//                console.log(this.checkedList)
                let reqData        = this.item
//                reqData.graduationTime = moment(this.item).format("YYYY-MM-DD")
                this.item.tClassList = selectList
//                reqData.classIds=selectList.join(',')
//                let arr = []

//                item.tClassList =
//                let school       = this.school
//                let admin        = this.admin
//                var reqData      = this.form
//                reqData.classId  = this.classId;
//                reqData.schoolId = 1


                this.$http.post(url, reqData).then(function (res){
                    console.log(res.body);
                    if(res.body.msg.toUpperCase() == 'OK'){
                        this.doCancel();
                        this.editcallback();
                        this.$notify({title: '成功',message: '信息修改成功',type: 'success'});
                    }else{
                        this.doCancel();
                        this.$notify({title: '失败',message: '信息修改失败',type: 'warning'});
                    }
                })
            }
        },
        components:{
            'box-modal':BoxModal
        }
    }
</script>

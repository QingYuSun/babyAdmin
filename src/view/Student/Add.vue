<template>
    <box-modal :title="title" :visible="true" transition="roll">
        <div class="msg-wrp" style="padding-bottom: 0;">

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
                        <!--<input name="pwd" v-model="form.teacherPassword" type="password" class="input" placeholder="密码"></input>-->
                    <!--</div>-->
                <!--</div>-->
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">姓名:</label>
                    </div>
                    <p class="control">
                        <input name="username" v-model="form.babyName" class="input" type="text" placeholder="姓名">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">家长手机:</label>
                    </div>
                    <p class="control">
                        <input name="phone" v-model="form.phoneNum" class="input" type="text" placeholder="手机">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">生日:</label>
                    </div>
                    <p class="control">
                        <input name="phone" v-model="Custombirthday" class="input" type="text" placeholder="YYYY-MM-DD">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">性别:</label>
                    </div>
                    <div class="select control">
                        <select class="input" v-model="form.babyGender">
                            <option value="0">女</option>
                            <option value="1">男</option>
                        </select>
                    </div>

                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">地址:</label>
                    </div>
                    <p class="control">
                        <input name="phone" v-model="form.address" class="input" type="text" placeholder="地址">
                    </p>
                </div>
            </div>


            <div class="button-group" style="text-align: right;">
                <div class="control" style="display: inline-block;">
                    <button @click="doCancel" type="submit" class="button is-cancel three-topmar">取消</button>
                </div>
                <div class="control" style="display: inline-block;">
                    <button type="submit" @click="doAdd" class="button is-primary three-topmar">提交</button>
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
        .select select{
            width: 100%;
        }
    }
    .three-topmar{
        margin-top: 10px;
    }
</style>
<script>
    import BoxModal from '../Com/BoxModal.vue'
    export default{
        name:'newMsg',
        data(){
            return{
                title:'新建学生',
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
                form:{
                    teacherName:'',
                    phoneNum:'',
                    teacherPassword:'',
                    position:'',
                    graduationTime:''
                },
                Custombirthday:'',
                blen:0
            }
        },
        props:{
            classId:Number,
            list:Object,
            Addcallback:Object,
        },
        computed: {
            currentId () {
                return this.$store.state.tree.current
            }
        },
        watch:{
            Custombirthday(){
                var dateString = this.Custombirthday;
                var pattern = /(\d{4})(\d{2})(\d{2})/;
                var formatedDate = dateString.replace(pattern, '$1-$2-$3');
                this.Custombirthday = formatedDate
                this.form.birthday = this.Custombirthday
            }
        },
        methods:{
            handleClick(tab, event) {
                console.log(this)
                console.log(tab, event);
            },
            doCancel:function () {
                document.querySelector(".modal-close").click()
            },
            doAdd:function () {
                if (this.form.babyName == null || this.form.babyName == '') {
                    alert('请填写姓名');
                    return;
                }
                var ParentssMobile = this.form.phoneNum
                if(!(/^1[3456789]\d{9}$/.test(ParentssMobile))){
                    alert("不是完整的11位手机号或者正确的手机号前七位"); 
                    return;
                }
                if (this.form.birthday == null) {
                    alert('请选择生日');
                    return;
                }
                if (this.form.babyGender == null) {
                    alert('请选择性别');
                    return;
                }
                if (this.form.address == null) {
                    alert('请填写地址');
                    return;
                }
                let that         = this
                var url          = 'tsbaby/insertSbaby'
                let school       = this.school
                let admin        = this.admin
                var reqData      = this.form
                reqData.classId  = this.classId;

                this.$http.post(url, reqData).then(function (res){
                    if(res.body.code == '200'){
                        that.list.push(res.body.data)
                        this.$notify({title: '成功',message: '学生添加成功',type: 'success'});
                        that.doCancel();
                        that.Addcallback();
                    }
                })
            }
        },
        components:{
            'box-modal':BoxModal
        }
    }
</script>

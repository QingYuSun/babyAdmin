<template>
    <box-modal :title="title" :visible="true" transition="roll">
        <div class="msg-wrp" style="padding-bottom: 0;">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="basic"></el-tab-pane>
            </el-tabs>
            <div class="tab-cont" v-show="activeName == 'basic'">
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
                <div class="is-horizontal div-center">
                        <label class="title-lable">学校信息</label>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">学校名称:</label>
                    </div>
                    <div class="control">
                        <input name="name" v-model="form.schoolName" type="text" class="input" placeholder="学校名称"></input>
                    </div>
                </div>
                   <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">所属区域:</label>
                    </div>
                     <p class="control">
                        <input name="address" :value="area.name" class="input" type="text" disabled="disabled">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">地址:</label>
                    </div>
                    <p class="control">
                        <input name="address" v-model="form.schoolAddress" class="input" type="text" placeholder="地址">
                    </p>
                </div>

                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">建校时间:</label>
                    </div>
                    <p class="control">
                        <input name="time" v-model="form.foundingTime" class="input" type="date" placeholder="建校时间">
                    </p>
                </div>
             
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">电话:</label>
                    </div>
                    <p class="control">
                        <input name="phone" v-model="form.schoolPhone" class="input" type="text" placeholder="电话">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">传真:</label>
                    </div>
                    <p class="control">
                        <input name="fax" v-model="form.fax" class="input" type="text" placeholder="传真">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">网站地址:</label>
                    </div>
                    <p class="control">
                        <input name="web" v-model="form.webUrl" class="input" type="text" placeholder="网站地址">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">邮政编码:</label>
                    </div>
                    <p class="control">
                        <input name="zip" v-model="form.zipCode" class="input" type="text" placeholder="邮政编码">
                    </p>
                </div>

                <div class="is-horizontal div-center">
                        <label class="title-lable">管理员信息</label>
                </div>

                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">姓名:</label>
                    </div>
                    <p class="control">
                        <input name="zip" v-model="form.name" class="input" type="text" placeholder="姓名">
                    </p>
                </div>

                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">手机号:</label>
                    </div>
                    <p class="control">
                        <input name="zip" v-model="form.phoneNum" class="input" type="text" placeholder="手机号">
                    </p>
                </div>

                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">邮箱:</label>
                    </div>
                    <p class="control">
                        <input name="zip" v-model="form.email" class="input" type="text" placeholder="邮箱">
                    </p>
                </div>

                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">职务:</label>
                    </div>
                    <p class="control">
                        <input name="zip" v-model="form.position" class="input" type="text" placeholder="职务">
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
    .div-center{
        text-align: center;
        
        margin-bottom: 10px;
      
    }

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



    .title-lable{
        font-weight: bold;
        font-size: 16px;
    }
</style>
<script>
    import BoxModal from '../Com/BoxModal.vue'
    export default{
        name:'newMsg',
        data(){
            return{
                title:'编辑学校',
                activeName: 'basic',
                msg:'hello vue',
               /*
                form:{
                    schoolId:'',
                    schoolName:'',
                    schoolAddress:'',
                    region:'',
                    foundingTime:'',
                    schoolPhone:'',
                    fax:'',
                    webUrl:'',
                    zipCode:'',
                    teacherId:'',
                    name:'',
                    phoneNum:'',
                    position:'',
                    email:'',
                    headImageurl:''
                }
                */
            }
        },
        props:{
            form:Object,
            area:Object,
            callback:Object
        },
        methods:{
            handleClick(tab, event) {
            },
            doCancel:function () {
                document.querySelector(".modal-close").click()
            },
            doAdd:function () {
                console.log("classId",this.classId)
                console.log("items",this.list)
                var url          = 'tschool/updateSchool'
                var reqData      = this.form
                reqData.region = this.area.code


                this.$http.post(url, reqData).then(function (res){
                  console.log(res.body);
                   
                   if(res.body.code == '200'){
                       alert('保存成功');
                       // this.$emit('success');
                       this.callback()
                       document.querySelector(".modal-close").click()
                   }else{
                        alert('保存失败');
                        this.$emit('fail');
                   }

                })
            }
        },
        components:{
            'box-modal':BoxModal
        }
    }
</script>

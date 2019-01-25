<template>
    <div v-if="cutforget == 0" class="login-wrp">
        <div class="login-cont">
            <div class="logo">
                <img src="../assets/login_logo.png">
            </div>
            <div class="login">
                <input class="login-input account-icon" v-model="phoneNum" type="text"  placeholder="手机号码/邮箱">
                <input class="login-input pwd-icon" type="password" v-model="password"  placeholder="请填写密码">
                <span class="error" v-if="errMsg.length>0">
                    {{ errMsg }}
                </span>
                <input class="login-btn" type="button" @click="doLogin" value="登入">
            </div>
            <div class="info">
                <div class="logo">
                    <img class="" src="../assets/logo1.png">
                </div>

                <a class="forget" @click="forgetcipher">忘记密码?</a>
               <!--  <a class="register" href="javascript:(0)">注册账号</a> -->
            </div>
        </div>
    </div>
    <div v-else class="login-wrp">
        <div class="login-cont">
            <!-- <div class="logo">
                <img src="../assets/login_logo.png">
            </div> -->
            <div class="login">
                <input class="login-input account-icon" v-model="forgetphone" type="text"  placeholder="手机号码">
                <div>
                    <input class="login-input pwd-icon" style="width: 80%;" type="text" v-model="SMS"  placeholder="短信验证">
                    <input v-if="backset == 0" class="login-input" type="button" style="width: 20%;float: right;margin: 0;padding: 0;" value="修改密码">
                    <input v-if="backset == 1" class="login-input" type="button" @click="huoqu" style="width: 20%;float: right;margin: 0;padding: 0;background: #f8b62d;color: #fff" value="修改密码">
                </div>
                <input class="login-input account-icon" v-model="forgetpassword" type="password"  placeholder="密码">
                <input class="login-input pwd-icon" type="password" v-model="againpassword"  placeholder="确认密码">
                <!-- <span class="error" v-if="errMsg.length>0">
                    {{ errMsg }}
                </span> -->
                <input class="login-btn" type="button" @click="forgetgoback" value="修改密码">
            </div>
            <!-- <div class="info">
                <div class="logo">
                    <img class="" src="../assets/logo1.png">
                </div>

                <a class="forget" href="javascript:(0)">忘记密码?</a>
            </div> -->
        </div>
    </div>
    <!--<section class="app-main">-->
        <!--<div class="logo-wrap">-->
            <!--<img src='../assets/login_logo.png'/>-->
        <!--</div>-->
        <!--<div class="box login-wrap">-->
            <!--<p class="control has-icon">-->
                <!--<input class="input" v-model="phoneNum"  placeholder="用户名">-->
                <!--<i class="fa fa-user is-20"   aria-hidden="true"></i>-->
            <!--</p>-->
            <!--<p class="control has-icon">-->
                <!--<input class="input" v-model="password"  type="password" placeholder="密码">-->
                <!--<i class="fa fa-lock is-20"   aria-hidden="true"></i>-->
            <!--</p>-->
            <!--<p class="control">-->
                <!--<button @click="doLogin" class="button is-success">-->
                    <!--登录-->
                <!--</button>-->
            <!--</p>-->
            <!--<p class="login-links">-->
                <!--<a href="" class="forget-pwd right">-->
                    <!--找回密码-->
                <!--</a>-->
            <!--</p>-->
        <!--</div>-->
    <!--</section>-->
</template>
<style lang="scss">
    @import "../scss/media-queries.scss";
    @import "../scss/login.scss";

    .error{
        color: red;
    }
</style>
<script>
    import auth from '../js/auth'
    import md5 from 'md5'

    export default{
        'name':'Login',
        'data':function(){
            return{
                msg:'this is login',
                // phoneNum:"18989619203",
                phoneNum:"",
                password:"",
                errMsg:'',
                cutforget:0,
                forgetphone:'',
                backset:0,
                SMS:'',
                forgetpassword:'',
                againpassword:'',
            }
        },
        watch:{
            forgetphone(){
                if (this.forgetphone.length > 0) {
                    console.log(this.forgetphone.length);
                    this.backset = 1
                }else{
                    this.backset = 0
                }
            }
        },
        methods:{
            doLogin:function () {
                var url         = 'admin/checkAdminLogin';

                var reqData     = {
                    'phoneNum': this.phoneNum,
                    'password': md5(this.password).toUpperCase()
                }
//                auth.login();
//                console.log('haha')
//                this.$router.replace("/index");
                this.$http.post(url, reqData).then((response) => {
                    console.log(response)
                    if(response.body.code == "200"){
                        auth.login();
                        auth.setSchoolId(response.body.data.schoolId)
                        auth.setSchoolName(response.body.data.schoolName)
                        auth.setRole(response.body.data.role)
                        auth.setschoolImg(response.body.data.schoolImgUrl)
                        this.$router.replace("/index");
                    }else {
                        this.errMsg = response.body.msg
                    }
                });


            },
            forgetcipher(){
                this.cutforget = 1
            },
            forgetgoback(){
                var that        = this
                if (that.againpassword != that.forgetpassword) {
                    alert('两次密码不一致');
                    return;
                }
                var url         = 'tTeacher/smsCodeBasedPasswordChange';

                var reqData     = {
                    'phoneNum': that.forgetphone,
                    'smsCode': this.SMS,
                    'newPassword': md5(this.againpassword).toUpperCase()
                }
                this.$http.post(url, reqData).then((response) => {
                    console.log(response)
                    if(response.body.code == "200"){
                        this.cutforget = 0
                    }else {
                        alert(response.body.msg)
                    }
                });
            },
            huoqu(){
                var forgetsMobile = this.forgetphone
                if(!(/^1[3456789]\d{9}$/.test(forgetsMobile))){
                    alert("不是完整的11位手机号或者正确的手机号前七位"); 
                    return;
                }
                var url         = 'tTeacher/checkPhoneExists';
                var that        = this
                var reqData     = {
                    'phoneNum': that.forgetphone
                    /*'password': md5(this.password).toUpperCase()*/
                }
                that.$http.post(url, reqData).then((response) => {
                    if(response.body.code == "200"){
                        alert(response.body.msg);
                    }else {
                        alert(response.body.msg)
                    }
                });
            }
        }
    }
</script>

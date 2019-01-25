<template>
    <box-modal :title="title" :visible="true" transition="roll">
        <div class="msg-wrp" style="padding-bottom: 0;">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="basic"></el-tab-pane>
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
                <div class="is-horizontal div-center">
                        <label class="title-lable">学校信息</label>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">学校名称:</label>
                    </div>
                    <div class="control">
                        <input name="name" v-model="form.companyName" type="text" class="input" placeholder="学校名称"></input>
                    </div>
                </div>
                   <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">所属区域:</label>
                    </div>
                     <!-- <p class="control">
                        <input name="address" :value="area.name" class="input" type="text" disabled="disabled">
                    </p> -->
                    <div class="control is-grouped">
                        <!-- <p class="control is-expanded">
                            <input class="input" v-model="school.region" type="text" placeholder="所在地区">
                        </p> -->
                        <select v-model="selectedRegion" class="by-setcity">
                            <option v-for="region in regions " :value="region.code">
                                {{region.name}}
                            </option>
                        </select>
                        <select v-model="street" class="by-setcity">
                            <option v-for="item in towns" :value="item.code">
                                {{item.name}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">地址:</label>
                    </div>
                    <p class="control">
                        <input name="address" v-model="form.companyAddress" class="input" type="text" placeholder="地址">
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
                        <input name="phone" v-model="form.companyPhone" class="input" type="text" placeholder="电话">
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
    .by-setcity{
        width: 16%;
        margin-right: 10px;
        border: 1px solid #dbdbdb;
        background: #fff;
        line-height: 32px;
        height: 32px;
    }
    .el-tabs__nav{
        .is-active{
            color: #f8b62d !important;
        }
    }
    .three-unify{
        .is-horizontal{
            .control{
        -webkit-box-flex: 7 !important;
        -ms-flex-positive: 7 !important;
        flex-grow: 7 !important;
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
                title:'新建学校',
                activeName: 'basic',
                msg:'hello vue',
                doCommit:false,
                street:'331024200',
                towns:[],
                regions:[],
                selectedRegion:'331002',
                defaultCity:'331000',
                form:{
                    companyName:'',
                    companyAddress:'',
                    region:'',
                    foundingTime:'',
                    companyPhone:'',
                    fax:'',
                    webUrl:'',
                    zipCode:'',
                    name:'',
                    phoneNum:'',
                    position:'',
                    email:'',
                    headImageurl:''
                }
            }
        },
        props:{
            area:Object,
            callback:Object
        },
        created:function () {
            /*this.selectAreasdeta();*/
            var self = this
            setTimeout(function () {
                console.log('区域选择')
                self.selectAreasdeta()
            }, 200);

        },
        watch:{
            selectedRegion:function () {
                console.log(this.selectedRegion)
                this.getTowns(this.selectedRegion)
            }
        },
        methods:{
            handleClick(tab, event) {
            },
            doCancel:function () {
                document.querySelector(".modal-close").click()
            },
            doAdd:function () {
                this.doCommit = true
                var url          = 'tcompany/insertCompany'
                var reqData      = this.form
                reqData.region = this.area.code


                this.$http.post(url, reqData).then(function (res){
                  console.log(res.body);
                  this.doCommit = true
                   if(res.body.code == '200'){
                       this.$notify({title: '成功',message: '学校公司成功',type: 'success'});
                       // this.$emit('success');
                       this.callback()
                       document.querySelector(".modal-close").click()
                   }else{
                        this.$notify({title: '提示',message: '公司添加失败',type: 'info'});
                        this.$emit('fail');

                   }

                })
            },
            getTowns: function(code){
                // this.$store.commit('TREE_SELECT',0)
                let that    = this
                let url     = 'tarea/selectAreas'
                var reqData     = {
                    code:code
                };

                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        that.towns   = data[0].data
                        that.street = that.towns[0].code
                        console.log(JSON.stringify(that.towns));
                    }
                },function(res){
                    // 响应错误回调
                    console.log("/tarea/selectAreas   error")
                });
            },
            selectAreasdeta(){
                let that    = this
                let url     = 'tarea/selectAreas'
                var reqData     = {
                    code:this.defaultCity
                };

                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        var city    = res.body.data;
                        if(typeof city != 'undefined' && city.length > 0){
                            this.regions   = city[0].data
                            this.getTowns(this.selectedRegion)
                        }else {
                            this.$notify({title: '提示',message: '区域数据获取失败请重新刷新',type: 'warning'});
                        }

                    }

                },function(res){
                    // 响应错误回调
                    console.log("/tarea/selectAreas   error")
                });
            }
        },
        components:{
            'box-modal':BoxModal
        }
    }
</script>

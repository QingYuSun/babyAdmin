<template>
    <box-modal :title="title" :visible="true" transition="roll">
        <div class="msg-wrp">
            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label">标题:</label>
                </div>
                <div class="control is-grouped">
                    <p class="control is-expanded">
                        <input name="device" v-model="Thetitle" class="input" type="text" placeholder="消息标题">
                    </p>
                </div>
            </div>
            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label">内容:</label>
                </div>
                <div class="control">
                    <textarea name="describe" v-model="content" class="textarea" placeholder="消息内容"></textarea>
                </div>
            </div>
            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label">发送人:</label>
                </div>
                <div class="control is-grouped addpadding">
                    <!-- <p class="control is-expanded"> -->
                        <!-- <el-select v-model="value7" placeholder="请选择老师">
                            <el-option label="全部老师" value="all">
                            </el-option>
                                <el-option-group
                                    v-for="group in tClass"
                                    :label="group.label">
                                    <el-option
                                        v-for="item in tClass"
                                        :label="item.className"
                                        :value="item.classId">
                                    </el-option>
                                <el-option
                                        v-for="item in group.options"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-option-group>
                        </el-select> -->
                            <table>
                            <tr class="addspan">
                                <td>
                                    <span>全部老师</span>
                                    <input type="checkbox" id="selectallTeacherId" class="chk_2" @click="handleCheckAll" />
                                    <label for="selectallTeacherId"></label>
                                </td>
                            </tr>
                            <tr v-if="authget == 1" class="addclass">
                            </tr>
                            <tr v-else class="addclass" v-for="(group,index) in twodimension">
                                <td v-for="(item,key) in group">
                                    <span>{{item.className}}</span>
                                    <input type="checkbox" class="chk_2" :id='"t"+key+index' :value="item.classId" v-model="checkArrTeacherId" /> 
                                    <label :for='"t"+key+index' ></label>
                                </td>
                            </tr>
                        </table>
                    <!-- </p> -->
                    <p class="control is-expanded">
                        <!-- <el-select v-model="value8" placeholder="请选择学生">
                            <el-option label="全部老师" value="all">
                            </el-option>
                            <el-option-group
                                    v-for="group in tClass"
                                    :label="group.label">
                                <el-option
                                        v-for="item in tClass"
                                        :label="item.className"
                                        :value="item.classId">
                                </el-option>
                            </el-option-group>
                        </el-select> -->
                    </p>
                </div>
            </div>
            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label"></label>
                </div>
                <div class="control is-grouped addpadding">
                    <!-- <p class="control is-expanded"> -->
                        <!-- <el-select v-model="value7" placeholder="请选择老师">
                            <el-option label="全部老师" value="all">
                            </el-option>
                                <el-option-group
                                    v-for="group in tClass"
                                    :label="group.label">
                                    <el-option
                                        v-for="item in tClass"
                                        :label="item.className"
                                        :value="item.classId">
                                    </el-option>
                                <el-option
                                        v-for="item in group.options"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-option-group>
                        </el-select> -->
                            <table>
                            <tr class="addspan">
                                <td>
                                    <span>全部学生</span>
                                    <input type="checkbox" id="selectallbaby" class="chk_2" @click="handleCheckAllbaby" />
                                    <label for="selectallbaby"></label>
                                </td>
                            </tr>
                            <tr v-if="authget == 1" class="addclass">
                            </tr>
                            <tr v-else class="addclass" v-for="(group,index) in twodimension">
                                <td v-for="(item,key) in group">
                                    <span>{{item.className}}</span>
                                    <input type="checkbox" class="chk_2" :id='"b"+key+index' :value="item.classId" v-model="checkArrBaby" /> 
                                    <label :for='"b"+key+index'></label>
                                </td>
                            </tr>
                        </table>
                    <!-- </p> -->
                    <p class="control is-expanded">
                        <!-- <el-select v-model="value8" placeholder="请选择学生">
                            <el-option label="全部老师" value="all">
                            </el-option>
                            <el-option-group
                                    v-for="group in tClass"
                                    :label="group.label">
                                <el-option
                                        v-for="item in tClass"
                                        :label="item.className"
                                        :value="item.classId">
                                </el-option>
                            </el-option-group>
                        </el-select> -->
                    </p>
                </div>
            </div>
            <div class="control is-horizontal" style="padding-top: 10px;">
                <div class="control-label">
                    <label class="label"></label>
                </div>
                <div class="control">
                    <button type="submit" @click="addmain" class="button is-primary">发送</button>
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
    }
    .addpadding{
        margin-top: 0.5em;
    }
    .addclass td{
        padding: 1em 0;
    }
    .addclass td span{
        padding-right: 0.5em;
    }
    .addspan td span{
        padding-right: 0.5em;
    }
    .chk_2 { 
    display: none; 
} 
 
.chk_2 + label { 
    background-position: 0 0;
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    padding: 0;
    width: 20px;
    height: 20px;
    background: url(../../assets/blue.png) no-repeat; 
    border: none;
    cursor: pointer;
} 
.chk_2:checked + label:after {
    background: url(../../assets/blue.png) no-repeat;
    background-position: -22px 0;
    content:"";
    display:inline-block;
    height:100%;
    width:100%;
}
</style>
<script>
    import BoxModal from '../Com/BoxModal.vue'
    import auth from '../../js/auth'
    export default{
        name:'newMsg',
        data(){
            return{
                title:'新建消息',
                msg:'hello vue',
                tClass: [],
                value7: '',
                value8: '',
                checkAll:true,
                checkAllbaby:true,
                checkArrTeacherId:[],
                checkArrBaby:[],
                Thetitle:'',
                content: '',
                twodimension:[],
                authget:0
            }
        },
        props:{
            callbackMsg:Object,
        },
        watch:{
            checkArrTeacherId:function () {
                //数据checkArr发送变化执行
                if (this.checkArrTeacherId.length === this.tClass.length) {
                    this.checkAll = false
                } else {
                    this.checkAll = true
                }
                this.change();
            },
            checkArrBaby:function () {
                //数据checkArr发送变化执行
                if (this.checkArrBaby.length === this.tClass.length) {
                    this.checkAllbaby = false
                } else {
                    this.checkAllbaby = true
                }
            }
        },
        created:function () {
            //加载页面执行
            this.classlist();
        },
        methods:{
            handleCheckAll() {
                //判断全选和反选
                if (this.checkAll) {
                    this.checkArrTeacherId = this.tClass.map(item => {
                    return item.classId
                    })
                   } else {
                    this.checkArrTeacherId = []
                }
            },
            handleCheckAllbaby() {
                //判断全选和反选
                if (this.checkAllbaby) {
                    this.checkArrBaby = this.tClass.map(item => {
                    return item.classId
                    })
                   } else {
                    this.checkArrBaby = []
                }
            },
            classlist:function () {
                //获取班级列表
                
                let that    = this
                let url     = 'tclass/selectClassListBySchoolId'
                var reqData     = {}
                reqData.schoolId = auth.getSchoolId();
                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        that.tClass   = data;
                        this.authget = auth.getSchoolId();
                        this.change();
                    }

                },function(res){
                    // 响应错误回调
                });
            },
            change:function () {
                var arr1 = this.tClass
                console.log(arr1.length);
                console.log(JSON.stringify(arr1));
                var arr2 = [];
                var k=0;
                for ( var i = 0; i < arr1.length/4; i++) {
                    arr2[i] = arr2[i] || [];
                    for ( var j = 0; j < 4; j++) {
                        if (arr1[k]) {
                            arr2[i][j] = arr1[k];
                            k++
                        }
                    }
                }
                this.twodimension = arr2
                console.log(JSON.stringify(this.twodimension))
            },
            doCancel:function () {
                document.querySelector(".modal-close").click()
            },
            addmain:function(){
                let that    = this
                if (that.Thetitle == '') {
                    alert('标题不能为空');
                    return;
                }
                let url     = 'tMessage/schoolSendMessageToClassForWeb'
                var reqData     = {}
                reqData.schoolId = auth.getSchoolId();
                reqData.receiveTeacherClassIds = JSON.stringify(this.checkArrTeacherId)
                reqData.receiveBabyClassIds = JSON.stringify(this.checkArrBaby)
                reqData.title = that.Thetitle
                reqData.content = that.content
                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        this.doCancel();
                        this.$notify({title: '成功',message: '消息发送成功',type: 'success'});
                        this.callbackMsg();
                    }else{
                        this.doCancel();
                        this.$notify({title: '失败',message: '消息发送失败',type: 'warning'});
                    }

                },function(res){
                    // 响应错误回调
                });

            }
        },
        components:{
            'box-modal':BoxModal
        }
    }
</script>

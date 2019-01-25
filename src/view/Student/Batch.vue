<template>
    <box-modal :title="title" :visible="true" transition="roll">
        <div class="msg-wrp" style="padding-bottom: 0;">
            <el-steps :space="200" :active="active" finish-status="success">
                <el-step title="上传"></el-step>
                <el-step title="执行"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <div class="step-cont" v-show="active == 0">
                <div class="notification">
                    <div class="columns">
                        <div class="column is-1">
                            <i class="fa fa-2x fa-cloud-download" aria-hidden="true"></i>
                        </div>
                        <div class="cont-rgt{">
                            <p>导入学生信息模板</p>
                            <p>
                                <a href="babyAdminServer/static/baseExcels/baobei.xlsx">下载模板</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="notification">
                    <div class="columns">
                        <div class="column is-1">
                            <i class="fa fa-2x fa-cloud-upload" aria-hidden="true"></i>
                        </div>
                        <div class="cont-rgt{">
                            <p>上传填好的学生信息表</p>
                            <p>
                                <input style="display: none;" type="file" id="addfile" @change="previewFile">
                                <label for="addfile" class="new-hand">上传文件</label>
                                <span>{{filename}}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <!-- <div class="notification">
                    <div class="columns">
                        <div class="column is-1">
                            <i class="fa fa-2x fa-lock" aria-hidden="true"></i>
                        </div>
                        <div class="control cont-rgt">
                            <input name="pwd" type="password" class="input" placeholder="初始密码"></input>
                        </div>
                    </div>
                </div> -->
            </div>

            <div class="step-cont" v-show="active == 1">
                <div class="notification">
                    <div class="columns">
                        <div class="column is-1">
                            <i class="fa fa-2x fa-check-circle right-count new-babycolor" aria-hidden="true"></i>
                        </div>
                        <div class="cont-rgt new-babypadding">
                            <p>本次可导入人数: <span class="new-babycolor">{{successbaby}}</span> 人</p>
                        </div>
                    </div>
                </div>
                <div class="notification">
                    <div class="columns">
                        <div class="column is-1">
                            <i class="fa fa-2x fa-times-circle wrong-count" aria-hidden="true"></i>
                        </div>
                        <div class="cont-rgt new-babypadding">
                            <p>本次不可导入人数: <span>{{errorbaby}}</span> 人</p>
                            <!-- <p>
                                <a href="###">上传文件</a>
                            </p> -->
                        </div>
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>行数</th>
                            <th>姓名</th>
                            <th>手机号</th>
                            <th>错误</th>
                        </tr>
                        <tr v-for="(item,index) in errorbabycause">
                            <th>{{index}}</th>
                            <th>{{item.babyName}}</th>
                            <th>{{item.phoneNum}}</th>
                            <th class="new-error">{{item.errorReason}}</th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div class="step-cont" v-show="active == 2">
                <div class="notification">
                    <div class="columns">
                        <div class="column is-1">
                            <i class="fa fa-2x fa-check-circle right-count new-babycolor" aria-hidden="true"></i>
                        </div>
                        <div class="cont-rgt new-babypadding">
                            <p>本次可导入人数: <span class="new-babycolor">{{successbaby}}</span> 人</p>
                            <!-- <p>
                                <a href="###">下载模板</a>
                            </p> -->
                        </div>
                    </div>
                </div>
            </div>

            <div class="button-group" style="text-align: right;">
                <div class="control" style="display: inline-block;" v-show="active == 0">
                    <button @click="doCancel" type="submit" class="button is-cancel">取消</button>
                </div>
                <div class="control" style="display: inline-block;" v-show="active == 1">
                    <button @click="prev" type="submit" class="button is-cancel">返回</button>
                </div>
                <div class="control" style="display: inline-block;" v-show="active == 2">
                    <button @click="doCancels" type="submit" class="button is-primary">完成</button>
                </div>
                <div class="control" style="display: inline-block;" v-show="active == 0 || active == 1">
                    <button @click="next" type="submit" class="button is-primary">下一步</button>
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
        .step-cont{
            padding: .8rem .2rem;
            .cont-rgt{
                padding-top: .5rem;
                p{
                    line-height: 1.4rem;
                }
            }
            .wrong-count{
                color: #ff5722;
            }
        }
    }
    .new-hand{
        color: #F8BF48;
        cursor: pointer; 
    }    
    .new-hand:hover{
        color: #55ab2e;
    }
    .new-babypadding p{
        padding-top: 5px;
    }
    .new-babypadding span{
        color: red;
    }
    .new-babycolor{
        color: #13ce66 !important;
    }
    .new-error{
        color: red !important;
    }
</style>
<script>
    import BoxModal from '../Com/BoxModal.vue'
    export default{
        name:'newMsg',
        data(){
            return{
                active: 0,
                title:'批量导入',
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
                file: null,
                filename:'',
                fileture:0,
                errorbaby:0,
                successbaby:0,
                errorbabycause:[],
                successDatacause:[]
            }
        },
        props:{
            classId:Number,
            list:Object,
            callback:Object,
        },
        methods:{
            doCancel:function () {
                document.querySelector(".modal-close").click()
            },
            doCancels:function (){
                for (var i = 0; i < this.successDatacause.length; i++) {
                    this.list.push(this.successDatacause[i]);
                }
                this.doCancel();
                this.$notify({title: '成功',message: '批量上传成功',type: 'success'});
                this.callback()
            },
            checkform: function (){
                //验证文件是否为xls文件
                var f_content = this.file;
                var f_con = this.file.name;
                var fileext=f_con.substring(f_con.lastIndexOf("."),f_con.length)
                fileext=fileext.toLowerCase()
                if (fileext!='.xlsx'){
                    alert("对不起，导入数据格式必须是xls格式文件哦，请您调整格式后重新上传，谢谢 ！");
                    return false;
                }
                return true;
            },
            next() {
                if (this.active == 0) {
                    if (this.fileture == 1) {
                        this.active++;
                        this.addstudent();
                    }else{
                        alert("对不起，导入数据格式必须是xls格式文件哦，请您调整格式后重新上传，谢谢 ！");
                    }
                }else{
                    this.active++;
                }
                /*if (this.active++ > 2);*/
            },
            prev(){
                if (this.active-- > 0) /*this.active = 0*/;
            },
            previewFile (e) {
                //文件改变执行
                this.file = e.target.files[0];
                this.filename = this.file.name;
                if (this.checkform()) {
                    this.fileture = 1;
                } else {
                    this.fileture = 0;
                }
            },
            addstudent () {
                
                let that         = this
                var url         = 'tsbaby/importTSBabyAndTBabyExcel'
                let classId      = that.classId
                let file       = that.file
                var formData = new FormData();
                formData.append('classId',classId)
                formData.append('babyExcel',file)

                this.$http.post(url, formData).then(function (res){
//                  console.log(res.body);
                    if(res.body.msg.toUpperCase() == 'OK'){
                        let dataerror    = res.body.data.errorCount;
                        let datasuccess   = res.body.data.successCount;
                        let errorDatecause   = res.body.data.errorDate;
                        let successDatababy   = res.body.data.successData;
                        that.errorbaby = dataerror;
                        that.successbaby = datasuccess;
                        that.errorbabycause = errorDatecause;
                        that.successDatacause = successDatababy;
                        /*this.$notify({title: '成功',message: '信息修改成功',type: 'success'});*/
                    }

                })
            }
        },
        components:{
            'box-modal':BoxModal
        }
    }
</script>

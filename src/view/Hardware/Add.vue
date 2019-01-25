<template>
    <box-modal :title="title" :visible="true" transition="roll">
        <div class="msg-wrp">
            <div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">设备名称:</label>
                    </div>
                    <p class="control">
                        <input style="width: 60%;" v-model="machine" name="username" class="input" type="text" placeholder="设备名称">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">识别码:</label>
                    </div>
                    <p class="control">
                        <input style="width: 50%;" v-model="items" name="phone" class="input" type="text" placeholder="识别码">
                        <input name="phone" @click="doAddhardware" type="button" class="input huoqu" value="获取">
                    </p>
                </div>
            </div>
            <div class="button-group">
                <!-- <div class="control pull-left">
                    <button @click="doCancel" type="submit" class="button is-cancel">取消</button>
                </div> -->
                <div style="margin-top: 20px;text-align: center;" class="control">
                    <button type="submit" @click="duoyu" class="button is-primary">确认</button>
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
    .huoqu{
        background-color: #f8b62d;
        border: 0;
        border-radius: 0;
        color: #fff;
        width: 10%;
    }
</style>
<script>
    import BoxModal from '../Com/BoxModal.vue'
    import auth from '../../js/auth'
    export default{
        name:'newMsg',
        data(){
            return{
                title:'新建考勤机',
                machine:'',
                items:''
            }
        },
        props:{
            callback:Object,
        },
        methods:{
            doCancel:function () {
                document.querySelector(".modal-close").click();
            },
            doAddhardware(){
                let that = this
                var url          = 'hardWare/insertTschoolMachine'
                var reqData = {};
                    reqData.machineName = this.machine;
                    reqData.schoolId = auth.getSchoolId();

                this.$http.post(url, reqData).then(function (res){
                    if(res.body.code == 200){
                        let data    = res.body.data;
                        that.items = data
                    }
                })
            },
            duoyu(){
                this.$notify({title: '成功',message: '考勤机新建成功',type: 'success'});
                this.doCancel();
                this.callback();
            }
        },
        components:{
            'box-modal':BoxModal
        }
    }
</script>

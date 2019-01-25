<template>
    <box-modal :title="title" :visible="true" transition="roll">
        <div class="msg-wrp">
            <div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">设备名称:</label>
                    </div>
                    <p class="control">
                        <input name="username" class="input" type="text" placeholder="设备名称">
                    </p>
                </div>
                <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">识别码:</label>
                    </div>
                    <p class="control">
                        <input name="phone" class="input" type="text" placeholder="识别码">
                    </p>
                </div>
            </div>
            <div class="button-group">
                <div class="control pull-left">
                    <button @click="doCancel" type="submit" class="button is-cancel">取消</button>
                </div>
                <div class="control pull-right">
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
                title:'编辑考勤机',
            }
        },
        props:{
            item:Object,
            school:Object,
            editcallback:Object,
        },
        methods:{
            doCancel:function () {
                document.querySelector(".modal-close").click()
            },
            doSave:function () {
            }
        },
        components:{
            'box-modal':BoxModal
        }
    }
</script>

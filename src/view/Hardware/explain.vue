<template>
    <box-modal :title="title" :visible="true" transition="roll">
        <div class="msg-wrp">
            <p><span>1、新建，填写设备名称，点击“获取”识别码，得到该考勤机识别码。</span></p>
            <p><span>2、在考勤机浏览器中登录www.hellobaobei.com.cn/dl/timecard.apk下载智能考勤。下载成功后打开“文件管理—Download”，点击“timecard.apk”安装智能考勤程序。</span></p>
            <p><span>3、打开智能考勤程序，在界面对应位置输入上述获取的识别码，程序自动识别幼儿园信息。</span></p>
            <p><span>4、设置中登录名称admin，密码123456。在设置中可以设置幼儿园接送时间、教师考勤时间、考勤方式（手动/自动）。</span></p>
            <p><span>5、向工作人员索要（二维码启动图片），把图片放与扫描口前约5cm-15cm，听到滴一声则考勤机可以开始正常工作。</span></p>
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
</style>
<script>
    import BoxModal from '../Com/BoxModal.vue'
    export default{
        name:'newMsg',
        data(){
            return{
                title:'操作说明',
            }
        },
        methods:{
        },
        components:{
            'box-modal':BoxModal
        }
    }
</script>

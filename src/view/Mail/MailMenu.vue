<template>
    <div>
        <a @click="newModal" class="addpading mail-create btn btn-primary btn-block pf-sc-b newbotton">新建消息</a>
        <expand-box :title="title">
            <div slot="body">
                <ul class="mail-menu nav-pills nav-stacked">
                    <template v-for="(item,index) in menus" v-if="index < 3">
                         <li v-show="item.index < 60" :class="{actives : activeMain == item.index}" @click="Mainselected(item)">
                            <a href="#/msg-mail">
                                <i v-bind:class="[item.bdclass]"></i>
                                {{item.type}}
                                <!-- <span class="label label-primary pull-right">1</span> -->
                            </a>
                        </li>
                    </template>
                    <!-- <li class="active">
                        <a href="#/msg-mail">
                            <i class="fa fa-inbox"></i>
                            收件箱
                            <span class="label label-primary pull-right">1</span>
                        </a>
                    </li>
                    <li>
                        <a href="#/msg-mail">
                            <i class="fa fa-paper-plane-o"></i>
                            发件箱
                        </a>
                    </li>
                    <li>
                        <a href="#/msg-mail">
                            <i class="fa fa-file-text-o"></i>
                            草稿箱
                        </a>
                    </li>
                    <li>
                        <a href="#/msg-mail">
                            <i class="fa fa-trash-o"></i>
                            废纸篓
                        </a>
                    </li> -->
                </ul>
            </div>
        </expand-box>
        <expand-box :title="titles">
            <div slot="body">
                <ul class="mail-menu nav-pills nav-stacked">
                    <template v-for="(item,index) in menus" v-if="index > 2">
                        <li :class="{actives : activeMain == item.index}" @click="Mainselected(item)">
                            <a href="#/msg-mail">
                                <i v-bind:class="[item.bdclass]"></i>
                                {{item.type}}
                                <!-- <span class="label label-primary pull-right">1</span> -->
                            </a>
                        </li>
                    </template>
                    <!-- <li class="active">
                        <a href="#/msg-mail">
                            <i class="fa fa-inbox"></i>
                            收件箱
                            <span class="label label-primary pull-right">1</span>
                        </a>
                    </li>
                    <li>
                        <a href="#/msg-mail">
                            <i class="fa fa-paper-plane-o"></i>
                            发件箱
                        </a>
                    </li>
                    <li>
                        <a href="#/msg-mail">
                            <i class="fa fa-file-text-o"></i>
                            草稿箱
                        </a>
                    </li>
                    <li>
                        <a href="#/msg-mail">
                            <i class="fa fa-trash-o"></i>
                            废纸篓
                        </a>
                    </li> -->
                </ul>
            </div>
        </expand-box>
    </div>
</template>
<style lang="scss" scoped>
    @import "../../scss/skins.scss";
    @import "../../scss/fonts.scss";
    .mail-menu{
        border-bottom: 1px solid #f4f4f4;
        margin: 0;
        li{
            border-bottom: 1px solid #f4f4f4;
            margin: 0;
            a{
                position: relative;
                display: block;
                padding: 18px 15px;
                border-radius: 0;
                border-top: 0;
                border-left: 3px solid transparent;
                color: #444;
                .fa{
                    vertical-align: middle;
                }
                .label {
                    display: inline;
                    padding: .2em .6em .3em;
                    font-size: 75%;
                    font-weight: 700;
                    line-height: 1;
                    color: #fff;
                    text-align: center;
                    white-space: nowrap;
                    vertical-align: baseline;
                    border-radius: .25em;
                    &.label-primary{
                         background-color: #f8b62d !important;
                     }
                }
            }
            &.actives{
                a{
                    font-weight: 600;
                }
            }
        }
    }
    ol, ul {
        margin-top: 0;
        margin-bottom: 10px;
    }
    .nav-stacked>li {
        float: none;
    }

    .nav-stacked>li.actives>a, .nav-stacked>li.actives>a:hover {
        background: #f8f8f8;
        color: #444;
        border-top: 0;
        border-left-color: #f8b62d;
    }

    .btn-block {
        display: block;
        width: 100%;
    }
    .mail-create{
        padding: 6px 12px;
        border-color: #367fa9;
        color: white;
        margin-top: 20px;
        border-radius: 3px;
        -webkit-box-shadow: none;
        box-shadow: none;
        border: 1px solid transparent;
        text-align: center;
    }
    .newbotton{
        margin-bottom: 20px !important;
        margin-top: 0 !important;
    }
    .addpading{
        padding: 11px 12px !important;
        font-size: 1.2rem;
    }
    .addpading:hover{
        background:#f7c766 !important;
    }
</style>
<script>
    import ExpandBox from '../Com/ExpandBox.vue'
    import NewMsg    from './NewMsg.vue'

    const MsgModalComponent = Vue.extend(NewMsg);
    const openModal = (propsData = {}) => {
        return new MsgModalComponent({
            el: document.createElement('div'),
            propsData
        })
    }
    var menus = [
        {
            index:10,
            type:'发件箱',
            bdclass:'fa fa-paper-plane-o'
        },
       {
            index:70,
            type:'草稿箱',
            bdclass:'fa fa-file-text-o'
        },
        {
            index:80,
            type:'废纸篓',
            bdclass:'fa fa-trash-o'
        },
       {
            index:40,
            type:'收件箱',
            bdclass:'fa fa-inbox'
        },
       {
            index:50,
            type:'发件箱',
            bdclass:'fa fa-paper-plane-o'
        }
    ]
    export default{
        name:'mail-menu',
        data(){
            return{
                title:'校园',
                titles:'班级消息',
                activeMain:10,
                menus:menus,
                insteaditem:{index:10, type:'发件箱',cutword:0},
            }
        },
        created:function(){
            this.Mainselected(this.insteaditem);
        },
        components:{
            'expand-box':ExpandBox
        },
        methods:{
            Mainselected:function (item) {
                this.activeMain = item.index;
                this.$emit('selected', item)
            },
            doThis:function(e){
                console.log(e);
            },
            addSuccess:function () {
              this.$emit('success')  
            },
            newModal:function (event) {
                openModal({visible:true,callbackMsg:this.addSuccess})
            }
        }
    }
</script>

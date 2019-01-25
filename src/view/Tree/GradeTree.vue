<template>
    <div class="tree-box" :class="{'collapsed-box':!status.expand}">
        <a class="box-header with-border tree-link" @click="selected(item)" :class="{current:(item.gradeId == $store.state.tree.current && $store.state.tree.treeType == 'grade')}">
            <span class="tree-title">{{ title }}</span>
            <div class="box-tools pull-left">
                <button v-if="expand" type="button" @click="changeExpand" class="btn btn-box-tool" data-widget="collapse">
                    <i v-show="status.expand == true" class="fa fa-minus"></i>
                    <i v-show="status.expand == false" class="fa fa-plus"></i>
                </button>
            </div>
        </a>
        <div class="box-body no-padding">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<script>
    import { addClass, removeClass } from 'wind-dom/src/class';
    export default {
        props:{
            title:String,
            footer:{
                type:Boolean,
                default:false
            },
            expand:{
                type:Boolean,
                default:true
            },
            item:{
                type:Object,
                default:{}
            }
        },
        data:function () {
            return {
                status:{
                    expand:true
                }
            }
        },
        computed: {
            current () {
                return this.$store.state.tree.current
            }
        },
        methods: {
            'beforeEnter':function (el) {
                removeClass(el,'collapse')
                el.style.display = 'block'
                addClass(el,'collapsing')
                el.style.height = el.scrollHeight+'px'
            },
            'afterEnter':function (el) {
                removeClass(el,'collapsing')
                addClass(el,'collapse')
                addClass(el,'in')
            },
            'beforeLeave':function(el) {
                addClass(el,'collapsing')
                removeClass(el,'collapse')
                removeClass(el,'in')
                el.style.height = 0
            },
            'afterLeave':function (el) {
                el.classList.remove('collapsing')
                el.classList.add('collapse')
                el.style.display = 'none'
            },
            changeExpand:function () {
                this.status.expand = !this.status.expand
            },
            selected:function(item) {
                this.$store.commit('TREE_SELECT',0)
                this.$nextTick(function () {
                    this.$store.commit('TREE_SELECT',item.gradeId)
                    this.$store.commit('TREE_TYPE','grade')
                })

            }
        }

    }
</script>

<style lang="scss">
    @import "../../scss/skins.scss";
    @import "../../scss/fonts.scss";

    .tree-box{
        position: relative;
        background: #ffffff;
        width: 100%;
        /*box-shadow: 0 1px 1px rgba(0,0,0,0.1);*/
        .box-header {
            color: #444;
            display: block;
            padding: 10px;
            position: relative;
            &.with-border {
                /*border-bottom: 1px solid #f4f4f4;*/
            }
            .tree-title{
                font-family:'微软雅黑';
            }
            &>.fa, &>.glyphicon, &>.ion, & .tree-title {
                display: inline-block;
                /*font-size: 14px;*/
                margin: 0;
                line-height: 1;
            }
        }
        .box-tools{
            margin-right: 5px;
            margin-top:-5px;
            .btn {
                display: inline-block;
                padding: 6px 12px;
                margin-bottom: 0;
                font-size: 14px;
                font-weight: 400;
                line-height: 1.42857143;
                text-align: center;
                white-space: nowrap;
                vertical-align: middle;
                -ms-touch-action: manipulation;
                touch-action: manipulation;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                background-image: none;
                border: 1px solid transparent;
                border-radius: 3px;
                -webkit-box-shadow: none;
                box-shadow: none;
                border: 1px solid transparent;
                &:focus {
                     outline: none;
                 }
                &:active{
                     outline: -webkit-focus-ring-color auto 4px;
                 }
            }
            .btn-box-tool {
                padding: 5px;
                font-size: 12px;
                background: transparent;
                color: #97a0b3;
            }
            .fa{
                vertical-align: middle;
            }
        }
        .box-body{
            min-height: 50px;
            /*min-height: -webkit-min-content;*/
            /*min-height: -moz-min-content;*/
            /*min-height: min-content;*/
        }

        &.collapsed-box{
            .box-body{
                overflow: hidden;
                height: 0 !important;
                min-height: 0;
                -webkit-transition: all .5s ease;
                -moz-transition: all .5s ease;
                transition: all .5s ease;
            }

        }
        .tree-link{
            &:hover{
                 background: #f9f9f9;
             }
            &.current{
                 background: #f1f1f1;
             }
        }
    }



    .btn-group, .btn-group-vertical {
        position: relative;
        display: inline-block;
        vertical-align: middle;
    }


</style>


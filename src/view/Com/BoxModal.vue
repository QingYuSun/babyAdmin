<template>
    <transition
            :name="transition"
            mode="in-out"
            appear
            :appear-active-class="enterClass"
            :enter-active-class="enterClass"
            :leave-active-class="leaveClass"
            @after-leave="afterLeave"
    >
        <div :class="['modal', 'animated', show ? 'is-active' : '']" v-if="show">
            <div class="modal-background" @click="close"></div>
            <div class="modal-content modal-wrp">
                <div class="box-header with-border" >
                    <h3 class="box-title">
                        {{title}}
                    </h3>
                    <div class="box-tools pull-right">
                        <button type="button" @click="close" class="btn btn-box-tool" data-widget="remove">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </div>
                <slot></slot>
            </div>
            <button class="modal-close" @click="close" v-if="closable"></button>
        </div>
    </transition>
</template>
<style lang="scss">
    .modal-card, .modal-content{
        margin: 0 auto;
        width: 640px\0;
        max-height: none\0 !important;
        left:-25%\0;
    }
    .modal-wrp{
        background: #ffffff;
        border-top: 3px solid #F8B62D;
        margin-bottom: 20px;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        .box-header {
            color: #444;
            display: block;
            padding: 10px;
            position: relative;
        &.with-border {
             border-bottom: 1px solid #f4f4f4;
         }
        .box-title{

        }
        &>.fa, &>.glyphicon, &>.ion, & .box-title {
                                           display: inline-block;
                                           font-size: 14px;
                                           margin: 0;
                                           line-height: 1;
                                       }
        }

        .box-tools{
            position: absolute;
            right: 10px;
            top: 5px;
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
    }

    body.y-hide{
        overflow-y: hidden;
    }
</style>
<script>
    import { addClass, removeClass } from 'wind-dom/src/class';
    export default {
        name:'BoxModal',
        props: {
            card: Boolean,
            visible: Boolean,
            closable: Boolean,
            transition: {
                type: String,
                default: 'fade'
            },
            closable: {
                type: Boolean,
                default: true
            },
            title:String
        },

        data:function() {
            return {
                show: this.visible
            }
        },

        mounted:function () {
            this.$nextTick(() => {
                document.body.appendChild(this.$el)
                addClass(document.body,'y-hide')
            })
        },

        destroyed:function() {
            removeClass(document.body,'y-hide')
            this.$el.remove()
        },

        methods: {
            afterLeave () {
                this.$destroy()
            },

            active () {
                this.show = true
            },

            deactive () {
                this.show = false
            },

            close () {
                this.deactive()
            },

            open () {
                this.active()
            }
        },

        computed: {
            enterClass () {
                return this.transition+'In'
            },

            leaveClass () {
                return this.transition+'Out'
            }
        }

    }
</script>

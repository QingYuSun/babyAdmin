<template>
    <transition
            @beforeEnter="beforeEnter"
            @afterEnter="afterEnter"
            @beforeLeave="beforeLeave"
            @afterLeave="afterLeave"
    >
        <slot></slot>
    </transition>
</template>

<script>
    import { addClass, removeClass } from 'wind-dom/src/class';
    export default {
        data(){
            return{
                first:0
            }
        },
        methods: {
            'beforeEnter':function (el) {
                removeClass(el,'collapse')
                el.style.display = 'block'
                addClass(el,'collapsing')
                if (this.first==0) {
                    var self = this
                    setTimeout(function () {
                        el.style.height = el.scrollHeight+'px'
                    }, 100);
                }else{
                    this.first = 1
                    el.style.height = el.scrollHeight+'px'
                }
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
            }
        }

    }
</script>

<style scoped>
    .collapse {
        display: none;
    }
    .collapse.in {
         display: block;
     }

    .collapsing {
        position: relative;
        height: 0.1px;
        overflow: hidden;
        transition: height .377s ease;
    }
</style>


<template>
    <div>
        <expand-box :title="titles">
            <div slot="body">
                <ul class="grade-item nav-pills nav-stacked">
                    <template v-for="(item,k) in grade">
                        <li :class="{'two-active':item.code == codechoose}">
                            <a href="javascript:void;" :data-code="item.code" v-on:click="selected(item)">
                                {{ item.name }}
                            </a>
                        </li>
                    </template>
                    <!--<li class="active">-->
                        <!--<a href="#">-->
                            <!--全部-->
                        <!--</a>-->
                    <!--</li>-->
                </ul>
            </div>
        </expand-box>
    </div>
</template>
<style lang="scss">
    @import "../../scss/skins.scss";
    @import "../../scss/fonts.scss";

    .grade-item{
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
                /*background: #F7F8F8;*/
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
            &.two-active{
                a{
                    border-left: 3px solid transparent;
                    border-left-color: #f8b62d;
                    background: #f8f8f8;
                }
            }
        }
    }
    .box-wrp{
        /*border-top: none !important;
        margin-bottom: 0.4px !important;*/
        .box-body{
            /*min-height: 100px;*/
        }
    }
</style>
<script>
    import ExpandBox from '../Com/ExpandBox.vue'
    export default{
        props:{
            grade:Object,
        },
        data(){
            return{
                titles:'区选择',
                codechoose:''
            }
        },
        components:{
            'expand-box':ExpandBox
        },
        methods:{
            selected: function (item) {
                this.codechoose = item.code;
                this.$emit('selected',item)
            }
        }

    }
</script>

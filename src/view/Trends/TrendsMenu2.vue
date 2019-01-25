<template>
    <div class="trends-menu-wrp">
        <expand-box :title="title">
            <div slot="body">
                <ul class="mail-menu nav-pills">
                    <template v-for="(item,k) in menus">
                        <li>
                            <a :class="{active : activeIndexrecipe == item.index}" @click="selectedrecipe(item)">
                                {{ item.type }}
                            </a>
                        </li>
                    </template>
                </ul>
            </div>
        </expand-box>
        <div class="btn-box">
            <a @click="addrecipe" class="addpading mail-create btn btn-primary btn-block pf-sc-b">上传食谱</a>
        </div>
    </div>
</template>
<style lang="scss">
    @import "../../scss/skins.scss";
    @import "../../scss/fonts.scss";

    .trends-menu-wrp{

        .mail-menu{
            border-bottom: 1px solid #f4f4f4;
            margin: 0;
            margin-top: 0;
            margin-bottom: 10px;
            li{
                border-bottom: 1px solid #f4f4f4;
                margin: 0;
                float:none;
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
                    &.active{
                         font-weight: 600;
                         background: #f8f8f8;
                         color: #444;
                         border-top: 0;
                         border-left-color: #f8b62d;

                    }
                }
            }
        }

        .btn-block {
            display: block;
            width: 100%;
        }
        .mail-create{
            padding: 6px 12px;
            border-color: #367fa9;
            color: white;
            margin-bottom: 20px;
            border-radius: 3px;
            -webkit-box-shadow: none;
            box-shadow: none;
            border: 1px solid transparent;
            text-align: center;
        }
    }
    .addpading{
        padding: 11px 12px !important;
        font-size: 1.2rem;
    }
</style>
<script>
    import { addClass, removeClass } from 'wind-dom/src/class';
    import ExpandBox from '../Com/ExpandBox.vue';
    import Addrecipe  from './Add.vue';
    import auth from '../../js/auth'

    const AddNewsComponent = Vue.extend(Addrecipe);
    const openAddModal = (propsData = {}) => {
        return new AddNewsComponent({
            el: document.createElement('div'),
            propsData
        })
    }

    var menus = [
        {
            index:0,
            type:'教职工'
        },
        {
            index:1,
            type:'学生'
        }
    ]

    export default{
        data(){
            return{
                title:'食谱',
                activeIndexrecipe:0,
                menus:menus
            }
        },
        methods:{
            selectedrecipe:function (item) {
                this.activeIndexrecipe = item.index;
                this.$emit('selectedrecipe', item)
            },
            addSuccess:function () {
              this.$emit('success')  
            },
            addrecipe:function () {
                openAddModal({visible:true,type:this.activeIndexrecipe,callback:this.addSuccess})
            }
        },
        created:function () {
            /*this.$store.commit('TREE_SELECT',0)
            let that    = this
            let url     = 'tevet/selectEventByClassToOneBaby'
            var reqData     = {
                schoolId:auth.getSchoolId(),
                index:0,
            };
            console.log("tt")
            that.$http.post(url,reqData).then(function (res) {
                if(res.body.code == "200") {
                    let data    = res.body.data;
                    that.menus   = data
                }

            },function(res){
            });*/
        },
        components:{
            'expand-box':ExpandBox
        }
    }
</script>

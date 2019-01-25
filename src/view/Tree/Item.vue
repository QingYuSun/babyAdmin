<template>
    <ul class="tree-item nav-pills nav-stacked">
            <li>
                <tree  :item.sync="school"  :title="school.name">
                    <div slot="body">
                        <ul class="tree-sub tree-item nav-pills nav-stacked">
                            <template v-for="(tGrade,k) in school.children">
                                <li>
                                    <a v-if="tGrade.children == null " class="tree-link" @click="selected(tGrade)" :class="{current:(tGrade.gradeId == current)}">
                                        {{tGrade.name}}
                                    </a>
                                    <grade-tree :expandStatus="false" :item.sync="tGrade"  v-if="tGrade.children != null" :title="tGrade.name">
                                        <div slot="body">
                                            <ul class="tree-sub tree-item nav-pills nav-stacked">
                                                <template v-for="(tClass,k) in tGrade.children">
                                                    <li>
                                                        <a  class="tree-link" @click="classSelected(tClass)" :class="{current:tClass.classId == $store.state.tree.current && 'class' == $store.state.tree.treeType}">
                                                            {{tClass.name}}
                                                        </a>
                                                    </li>
                                                </template>
                                            </ul>
                                        </div>
                                    </grade-tree>
                                </li>
                            </template>
                        </ul>
                    </div>
                </tree>
            </li>
    </ul>


</template>
<style lang="scss">
    .tree-wrp{
        .tree-sub{
            .tree-link{
                padding-left: 4rem;
                &.box-header{
                    padding-left: 2rem;
                 }
            }
        }
        .tree-item{
            /*border-bottom: 1px solid #f4f4f4;*/
            margin: 0;
            li{
                /*border-bottom: 1px solid #f4f4f4;*/
                margin: 0;
            a{
                position: relative;
                display: block;
                padding: 10px 15px;
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
                &.active{
                    a{
                        border-left: 3px solid transparent;
                        /*border-left-color: #f8b62d;*/
                    }
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
    import Tree from '../Tree/Tree.vue';
    import GradeTree from  '../Tree/GradeTree.vue'

    export default{
        name:'tree-item',
        props:{
            school:Object,
        },
        data(){
            return{
                title:'哈喽宝贝幼儿园',
                type:''
            }
        },
        computed: {
            current () {
                return this.$store.state.tree.current
            },
        },
        methods:{
            selected:function(item) {
//              console.log('selected',item)
//              let id = 0;
//              if(!!item.gradeId)
//                  id = item.gradeId
//              if(!!item.classId)
//                  id = item.classId
//              this.$store.commit('TREE_SELECT',id)
//              console.log(this.current)
            },
            classSelected:function(item) {
                this.$store.commit('TREE_SELECT',0)
                this.$nextTick(function () {
                    this.$store.commit('TREE_TYPE','class')
                    this.$store.commit('TREE_SELECT',item.classId)
                })
            },
        },
        components:{
            'tree':Tree,
            'grade-tree':GradeTree
        }
    }
</script>

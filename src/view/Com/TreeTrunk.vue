<template>
    <div class="tree-trunk-box">
      <div :class="{active:model.actived}" @click="selected(model)" style="padding: 20px;max-height: 55px;border-bottom: 1px solid #f4f4f4;">
        <div class="box-tools pull-right icon-box" v-if="isFolder" @click="toggle">
            <i v-if="open" class="fa fa-minus"></i>
            <i v-else  class="fa fa-plus"></i>
        </div>
        <span class="tree-title">{{model.name}}</span>
      </div>
      <tree-leaf :children="model.children" :fixedclass="fixedclass" :open='open' @selected="selected"></tree-leaf>
    </div>
</template>
<script>
  // 官方文档：「在我们的例子中，将 tree-folder 组件做为切入起点。我们知道制造矛盾的是 tree-folder-contents 子组件，所以我们在 tree-folder 组件的生命周期钩子函数 beforeCreate 中去注册 tree-folder-contents 组件」
  // 所以原先通过 import 导入组件，然后在 components 中注册组件的方式，改为了在 beforeCreate 函数中去注册组件
  // import TreeFolderContents from './tree-folder-contents'
  export default {
    /*props: ['model','classteacher'],*/
    props: {
      model:Object,
      fixedclass:Object
    },
    data: function () {
      return {
        open:true,
      }
    },
    components: {
      // TreeFolderContents
    },
    beforeCreate: function () {
      this.$options.components.TreeLeaf = require('./TreeLeaf.vue')
    },
    computed: {
        isFolder: function () {
           return ( typeof this.model.children !== 'undefined') && this.model.children.length > 0 ? true : false
        }
    },
    methods: {
        toggle: function () {
          if (this.isFolder) {
            this.open = !this.open
          }
        },
        selected: function (item) {
          let that = this
          that.$emit('selected', item)
        },
    } 
  }
</script>


<style type="text/css">
    
    .tree-trunk-box{
      /*margin-top: 10px*/
    }

    .icon-box{
      /*margin-right: 10px;
      margin-top: 5px*/
    }

    .active{
      background: #f8f8f8;
      border-left: 4px solid #f8b62d;
      padding-left: 16px !important;
      font-weight: bold;
    }

    .tree-title{
        /*font-weight: bold;*/
        display: inline-block;
         font-size: 14px; 
        margin: 0;
        line-height: 1;
        cursor: pointer;
    }

    
    .tree-trunk-box ul {
      /*padding-left: 28px;
      line-height: 1.5em;*/
      list-style-type: dot;
    }
</style>

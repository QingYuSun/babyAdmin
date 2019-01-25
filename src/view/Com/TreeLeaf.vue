<template>
  <ul v-show="open" class="tree-leaf-box">
    <li v-for="child in children">
      <tree-trunk  class="item" v-if="child.children" :model="child" @selected="selected"></tree-trunk>
      <div @click="selected(child)" v-else :class="{active:child.actived}" style="padding: 20px;max-height: 55px;border-bottom: 1px solid #f4f4f4;">
      	<span>{{ child.name }} {{child.number}}</span>
      </div>
    </li>
  </ul>


  <!--   <ul v-show="open" v-if="isFolder">
      <item class="item" v-for="model in model.children" :model="model"></item>
      <li class="add" @click="addChild">+</li>
    </ul> -->
</template>
<script>
  import TreeTrunk from './TreeTrunk.vue'
  export default {
    props: ['children', 'open','fixedclass'],
    data:function() {
    	return{
    		activeFlag:false,
        selectedbaby:Object,
    	}
    },
    created:function(){
      this.childrennumber();
    },
    watch:{
      children(){
        this.childrennumber();

      }
    },
    components: {
      'tree-trunk':TreeTrunk
    },
    computed: {
        isFolder: function () {
           return ( typeof this.model.children !== 'undefined') && this.model.children.length > 0 ? true : false
          // return true
        }
    },
    methods: {
        selected: function (item) {
          this.selectedbaby.actived =false;
        	// console.log('TreeLeaf')
          console.log('pp');
        	this.$emit ('selected',item)
        },
        childrennumber(){
          //判断刷新 新增学生
          if (this.fixedclass != undefined) {
            console.log(JSON.stringify(this.children));
            for (var i = 0; i < this.children.length; i++) {
              console.log(JSON.stringify(this.children[i].children.length));
              for (var p = 0; p < this.children[i].children.length; p++) {
                var ppp = this.children[i].children[p].classId
                  if (ppp == this.fixedclass) {
                  
                  this.children[i].children[p].actived =true;

                  this.selected(this.children[i].children[p]);
                  this.selectedbaby = this.children[i].children[p]
                }
              }
              
              /*console.log(JSON.stringify(this.children[i].children));*/
              
            }
          }
          //添加班级人数（999）
          if (this.children != undefined) {
            for (let index = 0; index < this.children.length; index++) {
                if (!isNaN(this.children[index].number)) {
                  this.children[index].number = `(${this.children[index].number})`
                }
              }
          }
        }
    } 
  }
</script>

<style type="text/css">

   .tree-leaf-box{
      /*margin-top: 10px*/
    }

    .active{
    	background: #f8f8f8;
      border-left: 4px solid #f8b62d;
      padding-left: 16px !important;
      font-weight: bold;
    }

	.item {
	  cursor: pointer;
	}
	.bold {
	  /*font-weight: bold;*/
	}
	.tree-leaf-box ul {
	  /*padding-left: 28px;
	  line-height: 2em;*/
	  list-style-type: dot;
	}
</style>

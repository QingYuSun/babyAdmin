<template>
    <div class="tree-online-box ">
        <tree-trunk :model="model" :fixedclass="fixedclass" @selected="selected"></tree-trunk>
    </div>
</template>
<script>
    import TreeTrunk from './TreeTrunk.vue';
    import ExpandBox from './ExpandBox.vue';
    export default {
        props: ['model','teacher'],
        data: function () {
            return {
                title:'树的整体',
                currentItem:Object,
                fixedclass:0,
            }
        },
        components: {
          'tree-trunk':TreeTrunk,
          'expand-box':ExpandBox
        },
        methods: {
          tvariable(){
            this.$emit('tvariable')
          },
          selected: function (item) {
              if((typeof item.actived !== 'undefined') && (!item.actived)){
                  this.currentItem.actived= false    
                  item.actived = true
                  this.currentItem = item
              }
              this.fixedclass = item.classId
            this.$emit('selected', item)
            
          },
        } 
    }

</script>


<style type="text/css">
    
    .tree-online-box {
      /*font-family: Menlo, Consolas, monospace;*/
      background: #ffffff;
      /*padding-top: 20px;*/
      /*padding-left: 20px;*/
      /*padding-bottom: 20px;*/
      /*border:0px;*/
      /*box-shadow:0px 0px 0px #ffffff;*/
      height: 100%;
      width: 100%;
      overflow-y:auto; 
    }
    .tree-online-box a:hover{
        background: #000000;
    }

    .item {
      cursor: pointer;
    }
    
    .tree-title{
        /*font-weight: bold;*/
        display: inline-block;
         font-size: 14px; 
        margin: 0;
        line-height: 1;
    }

    .bold {
      font-weight: bold;
    }
    .teacher-variable{
      font-weight: bold;
      display: inline-block;
      font-size: 14px;
      margin: 0;
      cursor: pointer;
      width: 100%;
      padding-left: 1.3em;
      line-height: 25px;
    }
    .tactive{
      background: #aaaaaa;
      

    }
</style>

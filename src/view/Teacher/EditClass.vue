<template>
    <box-modal :title="selectedItem.type==2?'修改年级':'修改班级'" :visible="true" transition="roll">
        <div class="msg-wrp" style="padding-bottom: 0">
            <!-- <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label">分类:</label>
                </div>
                <div class="control is-grouped">
                    <p class="control is-expanded">
                        <input name="category" class="input" type="text" placeholder="班级分类">
                    </p>
                </div>
            </div> -->
            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label">名称:</label>
                </div>
                <div class="control">
                    <input name="name" class="input" v-model="selectedItem.name" ></input>
                </div>
            </div>
            <!-- <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label">描述:</label>
                </div>
                <div class="control is-grouped">
                    <p class="control is-expanded">
                        <textarea name="describe"  class="textarea" ></textarea>
                    </p>
                </div>
            </div> -->
            
            <div class="button-group" style="text-align: right;">
                <div class="control" style="display: inline-block;">
                    <button @click="doCancel" type="submit" class="button is-cancel">取消</button>
                </div>
                <div class="control" style="display: inline-block;">
                    <button type="submit"  @click="doSave" class="button is-primary">提交</button>
                </div>
            </div>
        </div>
    </box-modal>
</template>
<style lang="scss">
    .msg-wrp{
        padding: 2em;
        .label{
            font-weight: normal;
        }
    }
</style>
<script>
    import BoxModal from '../Com/BoxModal.vue'
    export default{
        name:'newMsg',
        props:{
            callback:Object,
            selectedItem:Object,
            schoolId:Number
        },
        data(){
            return{
                title:'新建班级',
                msg:'hello vue',
                form:{
                    name:""
                }
            }
        },
        components:{
            'box-modal':BoxModal
        },
        methods:{
            doCancel:function () {
                document.querySelector(".modal-close").click()
            },
            updateGrande:function () {

                if ("" == this.selectedItem.name.trim()) {
                     this.$notify({title: '提示',message: '名称必须填',type: 'warning'});
                    // alert("名称必须填")
                    return
                }
                
                var url          = 'tclass/updateGrade'
                var reqData      = {}
                reqData.schoolId  = this.schoolId;
                reqData.gradeId  = this.selectedItem.id;
                reqData.gradeName  = this.selectedItem.name;

                this.$http.post(url, reqData).then(function (res){
                    if(res.body.code == '200'){
                        
                        this.$notify({title: '成功',message: '修改年级成功',type: 'success'});
                        this.callback()
                        this.doCancel()
                    }
                })

            },
            updateClass:function () {
                
                let that         = this
                var url          = 'tclass/updateClass'
                var reqData      = {}

                reqData.schoolId  = this.schoolId;
                reqData.gradeId  = this.selectedItem.gradeId;
                reqData.classId  = this.selectedItem.id;
                reqData.className  = this.selectedItem.name;

                this.$http.post(url, reqData).then(function (res){
                    if(res.body.code == '200'){
                        
                        this.$notify({title: '成功',message: '修改班级成功',type: 'success'});
                        this.callback()
                        this.doCancel()
                    }else{
                        this.$notify({title: '失败',message: '修改班级失败',type: 'error'});
                    }
                },function(res){
                // 响应错误回调
                })

            },
            doSave:function () {
                if (this.selectedItem.type == 2) {
                    this.updateGrande()
                }

                if (this.selectedItem.type == 3) {
                    this.updateClass()
                }

            }
        }
    }
</script>

<template>
    <box-modal :title="selectedItem.type==1?'新建年级':'新建班级'" :visible="true" transition="roll">
        <div class="msg-wrp" style="padding-bottom: 0;">
           <!--  <div class="control is-horizontal">
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
                    <input name="name" class="input" v-model="form.name" ></input>
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
                    <button type="submit"  @click="doAdd" class="button is-primary">提交</button>
                </div>
            </div>
        </div>
    </box-modal>
</template>
<style lang="scss">
    .msg-wrp{
        padding: 2rem;
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
            addGrande:function () {

                if ("" == this.form.name.trim()) {
                    this.$notify({title: '提示',message: '名称必须填',type: 'warning'});
                    // alert("名称必须填")
                    return
                }
                
                var url          = 'tclass/insertGrade'
                var reqData      = {}
                reqData.schoolId  = this.schoolId;
                reqData.gradeName  = this.form.name;

                this.$http.post(url, reqData).then(function (res){
                    if(res.body.code == '200'){
                        
                        this.$notify({title: '成功',message: '添加年级成功',type: 'success'});
                        this.callback()
                        this.doCancel()
                    }
                })

            },
            addClass:function () {
                
                let that         = this
                var url          = 'tclass/insertClass'
                var reqData      = {}

                reqData.schoolId  = this.schoolId;
                reqData.gradeId  = this.selectedItem.id;
                reqData.className  = this.form.name;

                this.$http.post(url, reqData).then(function (res){
                    if(res.body.code == '200'){
                        
                        this.$notify({title: '成功',message: '添加班级成功',type: 'success'});
                        this.callback()
                        this.doCancel()
                    }else{
                        this.$notify({title: '失败',message: '添加班级失败',type: 'error'});
                    }
                },function(res){
                // 响应错误回调
                })

            },
            doAdd:function () {
                if (this.selectedItem.type == 1) {
                    this.addGrande()
                }

                if (this.selectedItem.type == 2) {
                    this.addClass()
                }

            }
        }
    }
</script>

<template>
    <div class="mail">
        <div class="text-hand">
            <div class="text-left addhover" @click="textadd">
                <span>新建图文素材</span>
            </div>
            <div class="text-right">
                <div class="has-feedback">
                    <span class="text-inall">图文消息(共{{pages.total}}条)</span>
                    <input type="text" class="form-control" placeholder="Search Mail" v-model="word">
                    <span class="form-control-feedback"></span>
                </div>
            </div>
        </div>
        <div>
            <text-list :searchword.sync="word" :itemslist.sync="items" v-on:selectedtext="selectedtext"></text-list>
        </div>
    </div>
</template>

<script>
    import textlist from './infoInbox.vue'
    import Addinfo from './Add.vue'

    const AddinfoComponent = Vue.extend(Addinfo);
    const openAddtext = (propsData = {}) => {
        return new AddinfoComponent({
            el: document.createElement('div'),
            propsData
        })
    }

    export default{
        data(){
            return{
                msg:'hello vue',
                word:'',
                dataChange:'',
                items:[],
                pages:{},
                webpage:1
            }
        },
        watch:{
            word:function(){
                //搜索
                this.ToUserBytext();
            }
        },
        created:function () {
            //加载页面执行
            var self = this
            setTimeout(function () {
                console.log('图文信息')
                self.Phototext()
            }, 200);
            /*this.Phototext();
            setTimeout(function () {
                console.log('  login')
                this.Phototext()
            }, 3000);*/
        },
        components:{
            'text-list':textlist
        },
        methods:{
            successtext () {
                this.Phototext();
            },
            selectedtext(){
                this.Phototext();
            },
            textadd () {
                openAddtext({visible:true,successtextadd:this.successtext})
            },
            change:function () {
                //把数据改成二维数组
                var arr1 = this.items
                var arr2 = [];
                var k=0;
                for ( var i = 0; i < arr1.length/3; i++) {
                    arr2[i] = arr2[i] || [];
                    for ( var j = 0; j < 3; j++) {
                        arr2[i][j] = arr1[k];
                        k++
                    }
                }
                this.items = arr2
            },
            Phototext:function () {
                //读取数据
                this.$store.commit('TREE_SELECT',0)
                let that    = this
                let url     = 'tInfo/selecttInfoByWeb'
                var reqData     = {}
                reqData.pageNum = 1;
                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        that.items   = data.list;
                        that.pages   = data.page;
                        this.change();
                    }
                },function(res){
                    // 响应错误回调
                });
            },
            ToUserBytext:function () {
                //搜索
                this.$store.commit('TREE_SELECT',0)
                let that    = this
                let url     = 'tInfo/selecttInfoByWeb'
                var reqData     = {}
                reqData.pageNum = this.webpage;
                reqData.condition = this.word;
                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
                        let data    = res.body.data;
                        that.items   = data.list;
                        that.pages   = data.page;
                        this.change();
                    }
                },function(res){
                    // 响应错误回调
                });
            }
        },
        mounted:function () {
            
        },
    }
</script>

<style lang="scss">
.text-hand{
    overflow: hidden;
    margin: 2em;
}
.text-left{
    float: left;
    width: 21.2em;
    line-height: 2.95em;
    background-color: #f8b62d;
    text-align: center;
    font-size: 1.3em;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
}
.text-right{
    float: right;
    margin-top: 1em;
}
.form-control{
    padding: 5px;
    outline: none;
}
.has-feedback{
    position: relative;
    display: inline-block;
}
.form-control-feedback{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    display: block;
    line-height: 34px;
    text-align: center;
    pointer-events: none;
    width: 30px;
    height: 30px;
    background-image: url(../../assets/ss.png);
    background-size: 100% 100%;
}
.text-inall{
    margin-right: 5px;
    font-size: 1em;
}
.addhover:hover{
        background:#f7c766 !important;
        color: #fff;
    }
</style>

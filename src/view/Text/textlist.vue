<template>
    <div class="text-list">
    	<ul v-for="item in itemslist">
    		<li class="by-white" v-if="list!=null" v-for="list in item">
    			<div class="text-warp">
	    			<div class="text-time">
	    				<span>发布于 {{newtime(list.createTime)}}</span>
	    				<a href="#"></a>
	    				<button class="glyphicon-remove" @click="deletetext(list.infoId)"></button>
	    			</div>
	    			<div v-if="list.infoImageurls == ''" class="text-img" style="cursor: pointer;" @click="textArticle(list.infoId)">
	    				<span>{{list.title}}</span>
	    			</div>
                    <div v-else class="text-img" style="cursor: pointer;" @click="textArticle(list.infoId)">
                        <span>{{list.title}}</span>
                        <a href="javascript:;">
                            <img :src="list.infoImageurls.split(',')[0]">
                        </a>
                    </div>
	    			<!-- <div class="text-img">
	    				<span v-html="list.content"></span>
	    			</div> -->
    			</div>
    		</li>
            <li v-for="list in item" v-if="list==null">
            </li>
        </ul>
    </div>
</template>
<script>
    let moment = require('moment')
    import ExpandBox from '../Com/ExpandBox.vue'
    import auth from '../../js/auth'

/*    let delArray = function (id,list) {
        //修改列表
        list.forEach((item,i)=>{
            if(item.babyId == id){
                list.splice(i,1)
            }
        })
    }*/

    export default{
        props:{
            searchword:'',
            itemslist:'',
        },
        data(){
            return{
                msg:'hello vue',
                /*tClass: [[{
                        time: '16:51',
                        title: '哈喽宝贝 | 爱贝有方,启智有道',
                        content:'让家长更安心，让老师更省心',
                        textID:1
                    }, {
                        time: '16:51',
                        title: '哈喽宝贝 | 爱贝有方,启智有道',
                        content:'让家长更安心，让老师更省心',
                        textID:2
                    },{
                        time: '16:51',
                        title: '哈喽宝贝 | 爱贝有方,启智有道',
                        content:'让家长更安心，让老师更省心',
                        textID:3
                    }],[{
                        time: '16:51',
                        title: '哈喽宝贝 | 爱贝有方,启智有道',
                        content:'让家长更安心，让老师更省心',
                        textID:4
                    }, {
                        time: '16:51',
                        title: '哈喽宝贝 | 爱贝有方,启智有道',
                        content:'让家长更安心，让老师更省心',
                        textID:5
                    },{
                        time: '16:51',
                        title: '哈喽宝贝 | 爱贝有方,启智有道',
                        content:'让家长更安心，让老师更省心',
                        textID:6
                    }]],*/
            }
        },
        methods:{
            newtime:function(el){
                return moment(el).format('MM月DD')
            },
            textArticle(url){
                //打开详情页面
                // window.open(url);
                window.open(`/#/text/article/${url}.html`);
            },
            deletetext (id) {
                //删除数据
            	let that = this
                this.$confirm('删除该图文信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url     = 'tInfo/deleteInfoByInfoId'
                    let reqData = {
                        infoId: id,
                    }
                    that.$http.post(url, reqData).then(function (res){
                        if(res.body.code == 200){
                        }
                    })
                    this.$emit('selectedtext')
                    /*this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });*/
                    this.$notify({title: '成功',message: '删除成功',type: 'success'});
                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });*/
                    this.$notify.info({title: '取消',message: '已取消删除',type: 'success'});
                });
            }
        },
        components:{
            'expand-box':ExpandBox
        }
    }
</script>
<style lang="scss" scoped>
.text-warp{
	margin: 1em 2em;
}
.text-time{
	line-height: 2em;
    font-size: 1.2em;
    border-bottom: 1px solid #ccc;
    position: relative;
}
.text-img span{
	font-size: 1.4em;
    line-height: 2.5em;
}
.text-img a{
	display: block;
	width: 100%;
	height: 15em;
	background-color: #ccc;
}
.text-img a img{
    width: 100%;
    height: 100%;
}
.text-list ul{
	display:-moz-box; /* Firefox */
	display:-webkit-box; /* Safari and Chrome */
	display:box;
    margin-bottom: 2em;
}
.text-list ul li{
    width: 100%;
    -moz-box-flex:1.0; /* Firefox */
    -webkit-box-flex:1.0; /* Safari and Chrome */
    box-flex:1.0;
    margin: 0 2em;
}
.text-list ul .by-white{
	background-color: #fff;
}
.glyphicon-remove{
	-webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: none;
    border-radius: 290486px;
    cursor: pointer;
    display: inline-block;
    vertical-align: top;
    background: 0 0;
	position: absolute;
	right: 5px;
	height: 2em;
	width: 3em;
	top: 5px;
    outline: none;
}
.glyphicon-remove:before {
	-webkit-transform: rotate(45deg);
    transform: rotate(45deg);
	background-color: red;
	display: block;
    height: 2px;
    left: 50%;
    margin-left: -25%;
    margin-top: -1px;
    position: absolute;
    top: 50%;
    width: 50%;
    content: "";
}
.glyphicon-remove:after {
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
	background-color: red;
	display: block;
    height: 2px;
    left: 50%;
    margin-left: -25%;
    margin-top: -1px;
    position: absolute;
    top: 50%;
    width: 50%;
    content: "";
}
.glyphicon-remove:hover{
	background-color: #fff;
}
</style>
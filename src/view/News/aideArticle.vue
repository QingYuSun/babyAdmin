<template>
    <div>
       <div class="column">
			<div class="more-column">
				<h3 class="bitoti">{{title}}</h3>
				<span class="wordtime">{{date}}</span>
				<!-- <div class="word">
					{{content}}
				</div> -->

				<div class="word" v-html="content"></div>

			</div>
		</div>

    </div>
</template>

<script>
    import auth from '../../js/auth'
    import md5 from 'md5'

    export default{
        'name':'Login',
        data(){
            return{
                id:'-1',
            	content:'',
            	title:'',
				date:'',

			}
        },
        created:function () {
        	console.log('paras : ' +this.$route.params.id)
        	this.id = this.$route.params.id;
        },
        methods:{
            getContent:function () {
            	let that = this 
                var url         = 'classroomAssist/selectById';

                var reqData     = {
                    assistId: that.id 
                }
                console.log('id' + that.id)
                that.$http.post(url,reqData).then(function (res) {
                    if(res.body.code == "200") {
//                        console.log('that' + JSON.stringify(that))
                        let data    = res.body.data;
                        that.title   = data.title
                        that.content   = data.content
						that.date = moment(data.createTime).format('YYYY-MM-DD')

                        document.title = '哈喽宝贝';
                    }

                },function(res){
                    // 响应错误回调
                });


            }
        },
        mounted:function () {
            let that = this
        	setTimeout(function () {
        		console.log('  login')
                that.getContent()
            }, 500);
        }
    }
</script>

<style type="text/css">
html, body, div, span, applet, object, iframe, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td {margin: 0; padding: 0; border: 0; outline: 0; vertical-align: baseline; background: transparent;height: auto !important;}
body {line-height: 1; font: 15px/normal Verdana, Arial, Helvetica, sans-serif;}
blockquote, q {quotes: none;}
h1{font-size: 26px;}
h2{font-size: 24px;}
h3{font-size: 22px;}
h4{font-size: 20px;}
h5{font-size: 18px;}
blockquote:before, blockquote:after, q:before, q:after {content: ''; content: none;}
.main{
    width: 100%;
}

@media screen and (min-width: 1024px){
    .column{
        width: 740px;
        margin: 0 auto;
        position: relative;
        padding: 20px 15px 15px;
        background-color: #fff;
    }
}
.column{
        width: 740px;
        margin: 0 auto;
        position: relative;
        padding: 20px 15px 15px;
        background-color: #fff;
    }
.more-column{
    width: 100%;
}
.bitoti{
    padding-bottom: 10px;
    margin-bottom: 14px;
    border-bottom: 1px solid #e7e7eb;
    margin-bottom: 10px;
    line-height: 1.4;
    font-weight: 400;
    font-size: 24px;
}
.wordtime{
    display: block;
    color: #8c8c8c;
    font-size: 1.1rem;
    text-decoration: none;
    line-height: 18px;
    margin:0.8em 0;
}
.wordtime a{
    text-decoration:none;
    margin-left: 1em;
    color: #417fb9;
}
.word{
    margin-top: 0.8em;
    font-size: 1.4em !important;
}
.word p{
    max-width: 100%!important;
    box-sizing: border-box!important;
    -webkit-box-sizing: border-box!important;
    word-wrap: break-word!important;
    clear: both;
    min-height: 1.5em;
    color: #3e3e3e;
    font-size: 16px;
    font-family: "Helvetica Neue",Helvetica,"Hiragino Sans GB","Microsoft YaHei",Arial,sans-serif;
}
.word img{
    max-width: 100%!important;
    box-sizing: border-box!important;
    -webkit-box-sizing: border-box!important;
    word-wrap: break-word!important;
}
@media screen and (max-width: 768px) {
   .main{
    width: 100%;
}
.column{
    width: 96%;
    margin: 0 auto;
    padding: 10px 0 0 0;
}
.more-column{
    width: 100%;
}
.bitoti{
    padding-bottom: 10px;
    margin-bottom: 14px;
    border-bottom: 1px solid #e7e7eb;
    margin-bottom: 10px;
    line-height: 1.4;
    font-weight: 400;
    font-size: 24px;
}
.wordtime{
    display: block;
    color: #8c8c8c;
    font-size: 1.1rem;
    text-decoration: none;
    line-height: 18px;
    margin:0.8em 0;
}
.wordtime a{
    text-decoration:none;
    margin-left: 1em;
    color: #417fb9;
}
.word{
    margin-top: 0.3em;
    font-size: 0.6em !important;
}
.word p{
    max-width: 100%!important;
    box-sizing: border-box!important;
    -webkit-box-sizing: border-box!important;
    word-wrap: break-word!important;
    clear: both;
    min-height: 1.5em;
    color: #3e3e3e;
    font-size: 16px;
    font-family: "Helvetica Neue",Helvetica,"Hiragino Sans GB","Microsoft YaHei",Arial,sans-serif;
}
.word img{
    max-width: 100%!important;
    box-sizing: border-box!important;
    -webkit-box-sizing: border-box!important;
    word-wrap: break-word!important;
}
   }
</style>

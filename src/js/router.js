/**
 * Created by lifetea on 2016/12/16.
 */

// import VueRouter    from  'vue-router'
VueRouter                     =    require('VueRouter')

//挂载vue-router
Vue.use(VueRouter);

import routes       from  './routes'


//定义路由
var router = new VueRouter({
	history: false,
	hashbang: true,
    mode: 'hash',
    routes // （缩写）相当于 routes: routes
})


export default router
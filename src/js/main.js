/**
 * Created by lifetea on 16/9/20.
 */
// app.js

Vue                     =    require('Vue')

import Main             from '../view/Main.vue'

import router           from './router'

import { sync }         from 'vuex-router-sync'

import store            from  '../vuex/store'

import vueEventCalendar from '../com/index'
Vue.use(vueEventCalendar, {locale: 'zh'})

sync(store, router)

//网络请求
System.import('vue-resource').then(function(resource) {
    Vue.use(resource)
    Vue.http.options.emulateJSON = true;
    //session 失效跳转
    // Vue.http.interceptors.push((request, next) => {
    //     next((response) => {
    //         if(response.status == 200 && response.body.status == 'UNLOGIN'){
    //             window.location.hash = "#/login"
    //         }
    //     });
    // });

    Vue.http.interceptors.push((request, next) => {
       console.log("http.interceptors:  " + request.url);
       request.url = 'babyAdminServer/' + request.url
       console.log("after http.interceptors:  " + request.url);
    next((response) => {
        // ...
        // 请求发送后的处理逻辑
        // ...
        // 根据请求的状态，response参数会返回给successCallback或errorCallback
        console.log('全局 返回')
         if(response.body.code == '401'){
                window.location.hash = "#/logout"
        }
        return response
    })
})

});

//初始化APP
var app = new Vue({
    el:"#main",
    router,
    store,
    render: h => h(Main),
});
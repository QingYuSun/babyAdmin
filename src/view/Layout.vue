<template>
    <div class="main-wrp">
        <nav-bar :show="true"></nav-bar>
        <div class="app-wrp">
            <side-bar :show="true"></side-bar>
            <section class="app-main">
                <div class="container is-fluid app-content">
                    <router-view></router-view>
                </div>
            </section>
        </div>
    </div>
</template>
<style>
    .app-main {
        transform: translate3d(0, 0, 0);
        min-height: 100%;
        width: 100%;
        padding-top: 2rem;
    }
    .app-wrp{
        display: flex;
    }
</style>
<script>
    import navBar    from  './Navbar.vue';
    import sideBar   from  './Sidebar.vue'
    export default{
        name:"LayOut",
        data:function(){
            return{
                msg:'this is layout'
            }
        },
        components:{
            'nav-bar'    : navBar,
            'side-bar'   : sideBar,
//            'footer-bar' : footerBar,
        }
    }
</script>

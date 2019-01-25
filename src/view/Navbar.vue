<template>
  <section class="hero is-bold app-navbar animated" :class="{ slideInDown: show, slideOutDown: !show }">
    <div class="hero-head">
      <nav class="nav">
        <div class="nav-left">
          <router-link class="nav-item" to="/index">
            <img src="../assets/logo.png">
          </router-link>
        </div>
        <div class="nav-center">
          <!--<a class="nav-item hero-brand" href="/">-->
            <!--<img src="http://cdn.2mmr.com/medical/images/icon.png" alt="Vue Admin Panel Framework">-->
            <!--<div class="is-hidden-mobile">-->
              <!--<span class="vue"></span>-->
              <!--<strong class="admin">哈喽宝贝管理后台</strong>-->
            <!--</div>-->
          <!--</a>-->
        </div>
        <div class="nav-right is-flex">
          <router-link class="nav-item" to="/logout">
            <span class="Logout">退出</span>
          </router-link>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
export default {
  'props': {
    'show': Boolean
  }

}
</script>

<style lang="scss" scoped>
@import "../scss/color.scss";
.nav{
  min-height: 70px;
}
.app-navbar {
  position: relative;
  min-width: 100%;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
  background-color: #F8B62D;
  .container {
    margin: auto 10px;
  }
  .nav-item{
    color: white;
    margin-left: 30px;
    img{
      max-height: 42px;
    }
  }
  .nav-right {
    align-items: stretch;
    align-items: stretch;
    flex: 1;
    justify-content: flex-end;
    overflow: hidden;
    overflow-x: auto;
    white-space: nowrap;
  }
}
.Logout{
  padding-right: 20px;
}
.Logout:hover{
  font-weight: bold;
}
</style>

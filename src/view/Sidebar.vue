<template>
  <aside class="menu app-sidebar animated" :class="{ slideInLeft: show, slideOutLeft: !show }">
    <div class="user-wrp">
      <figure class="image is-60x60">
        <img v-if="isEmpty(schoolImg)" src="../assets/head_holder.png" class="borderradius">
        <img v-else  :src="'http://hellobaobei.oss-cn-shanghai.aliyuncs.com/static/images/schoolHead/' + schoolImg" class="borderradius">
      </figure>
      <div class="user-info" style="padding-bottom: 5px">
        <span class="school-name">{{schoolName}}</span>
        <!-- <span class="member-level">vip
          <i class="fa fa-star" aria-hidden="true"></i>
        </span> -->
      </div>
      <div class="user-info" style="padding-top:0;">
        <span class="member-level">vip
          <i class="fa fa-star" aria-hidden="true"></i>
        </span>
      </div>
    </div>

    <ul class="menu-list">
      <li v-for="item in menu">
        <router-link :to="item.path" :exact="true" :aria-expanded="isExpanded(item) ? 'true' : 'false'" v-if="item.path" @click.native="toggle(item)">
          <!--<span class="icon">-->
            <!--<i :class="['fa', item.meta.icon]"></i>-->
          <!--</span>-->
          <span class="item-label">{{ item.meta.label || item.name }}</span>
          <span class="icon is-angle" v-if="item.children && item.children.length">
            <i class="fa fa-angle-down"></i>
          </span>
        </router-link>

        <a :aria-expanded="isExpanded(item)" v-else @click="toggle(item)" v-if="role=='1'">
          <!--<span class="icon">-->
            <!--<i :class="['fa', item.meta.icon]"></i>-->
          <!--</span>-->
          <span class="item-label">{{ item.meta.label || item.name }}</span>
          <span class="icon is-angle" v-if="item.children && item.children.length">
            <i class="fa fa-angle-down"></i>
          </span>
        </a>

        <a :aria-expanded="isExpanded(item)" v-else @click="toggle(item)" v-if="role=='2' && item.meta.trole!='6'">
          <!--<span class="icon">-->
            <!--<i :class="['fa', item.meta.icon]"></i>-->
          <!--</span>-->
          <span class="item-label">{{ item.meta.label || item.name }}</span>
          <span class="icon is-angle" v-if="item.children && item.children.length">
            <i class="fa fa-angle-down"></i>
          </span>
        </a>

        <a :aria-expanded="isExpanded(item)" v-else @click="toggle(item)" v-if="role=='4' && item.meta.trole=='1' || role=='4' && item.meta.trole=='7'">
          <!--<span class="icon">-->
            <!--<i :class="['fa', item.meta.icon]"></i>-->
          <!--</span>-->
          <span class="item-label">{{ item.meta.label || item.name }}</span>
          <span class="icon is-angle" v-if="item.children && item.children.length">
            <i class="fa fa-angle-down"></i>
          </span>
        </a>


        <expanding v-if="item.children && item.children.length">
          <ul v-show="isExpanded(item)">
            <li v-for="subItem in item.children" v-if="subItem.path">
              <!-- <router-link :to="subItem.path" v-if="subItem.role!='1'&& subItem.role!='4' || role=='1' && subItem.role!='4'"> -->
              <router-link :to="subItem.path" v-if="role=='1' && subItem.role!='4'">
                {{ subItem.meta && subItem.meta.label || subItem.name }}
              </router-link>
              <router-link :to="subItem.path" v-if="subItem.role!='4' && role=='2' && subItem.role!='1'">
                <!--generatePath(item, subItem)-->
                {{ subItem.meta && subItem.meta.label || subItem.name }}
              </router-link>
              <router-link :to="subItem.path" v-if="subItem.role=='4' && role=='4'">
                <!--generatePath(item, subItem)-->
                {{ subItem.meta && subItem.meta.label || subItem.name }}
              </router-link>
            </li>
          </ul>
        </expanding>
      </li>
      <li class="menu-help">
        <a aria-expanded="false">
          <span class="item-label">帮助</span>
        </a>
      </li>
      <li>
        <a aria-expanded="false">
          <span class="item-label">关于</span>
        </a>
      </li>
      <li>
        <a aria-expanded="false">
          <span class="item-label">技术支持</span>
        </a>
      </li>
    </ul>
  </aside>
</template>

<style lang="scss" scoped>
  @import '~bulma/sass/utilities/variables';
  @import '~bulma/sass/utilities/mixins';

  .app-sidebar {
      padding: 30px 0 0;
      width: 370px;
      min-width: 45px;
      min-height: 100%;
      z-index: 1024 - 1;
      box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
      overflow-y: auto;
      overflow-x: hidden;
      background:#222D32;
      color:white;

      /*@include mobile() {
        transform: translate3d(-180px, 0, 0);
      }*/

    .icon {
      vertical-align: baseline;
      &.is-angle {
         position: absolute;
         right: 10px;
         transition: transform .377s ease;
        margin-top: 5px;
       }
    }

  .menu-label {
    padding-left: 5px;
  }

  .menu-list {
    position:relative;
    font-size: 16px;
    font-weight: 400;
    li {
      a {
        color: white;
        /*PingFangSCB*/
        /*font-family:'PingFangSCB7e40e1b5c17a94';*/
        font-family:'PingFangSC_R7e9bf74c817a94';
        display: block;
        &:hover {
          /*background: #2d383c;*/
          background: #29363c;
        }

        &[aria-expanded="true"] {
          /*background: #2d383c;*/

          .is-angle {
            transform: rotate(180deg);
          }
        }
        &.router-link-active{
           color: #fff;
           border-left: 5px solid transparent;
           border-radius: 0;
           background: #1f2222;
           border-left-color: #f8b62d;
           padding-left: 10px;
         }
      }
      &.menu-help{
        margin-top: 3rem;
       }
      ul{
        /*background: #394247;*/
        padding-left: 0;
        margin: 0;
        border-left: 0;
        li{
          a{
            /*color: #8aa4af;*/
            color: #fff;
            line-height: 40px;
             padding-left: 16px;
            &:hover{
                /*color: white;
                background: transparent;*/
             }
          }
        }
      }
    }
    .item-label{
      height: 37px;
      line-height: 37px;
      vertical-align: text-bottom;
      padding-left: .6rem;
    }
  }
  }

  .user-wrp{
    text-align: center;
    figure{
      margin: 0 auto;
      &.is-60x60{
         height: 70px;
         width: 70px;

       }
    }
    .user-info{
      padding-top: 1.6rem;
      padding-bottom: 2.2rem;
      .school-name{
        font-family: '微软雅黑';
        font-weight: 500;
        font-size: 16px;
      }
      .member-level{
        font-size: 10px;
        background: #F8B62D;
        padding: 0px 4px;
        border-radius: 3px;
        display: inline-block;
        margin-left: 5px;
        height: 16px;
        text-transform: uppercase;
        line-height: 16px;

        .fa{
           vertical-align: middle;
         }
      }

    }
  }
  .borderradius{
    border-radius: 35px;
    height: 100% !important;
  }
</style>
<script>
    import Expanding from './Com/Expanding.vue'
    import auth from '../js/auth'

    export default {
        props: {
            show: Boolean
        },
        data:function() {
            return {
                isReady: false,
                schoolName:'',
                role:'',
                schoolImg:''
            }
        },

        mounted () {
            this.schoolName = auth.getSchoolName()
            this.role = auth.getRole()
            let route = this.$route
            if (route.name) {
                this.isReady = true
                this.shouldExpandMatchItem(route)
            }
        },
        created:function(){
          this.schoolImg = auth.getschoolImg();
        },
        computed: {
            menu () {
                return this.$store.state.menu
            }
        },

        methods: {
            isExpanded (item) {
              /*console.log(JSON.stringify(item));*/
                return item.meta.expanded
            },
            isEmpty:function (val) {
              if (val == "null" || val == "") {
                console.log(JSON.stringify(val));
                return true
              }else{
                console.log(JSON.stringify(val));
                return false
              }
            },
            toggle (item) {
                this.$store.dispatch("expanded",{el:item,bool:!item.meta.expanded})
            },

            shouldExpandMatchItem (route) {
                let matched = route.matched
                let lastMatched = matched[matched.length - 1]
                let parent = lastMatched.parent || lastMatched

                const p = this.findParentFromMenu(route)
                if (p) {
                    parent = p
                }

                if ('expanded' in parent.meta && parent !== lastMatched) {
                    this.$store.dispatch("expanded",{el:parent,bool:true})
                }
            },

            generatePath (item, subItem) {
                return `${item.component ? item.path + '/' : ''}${subItem.path}`
            },

            findParentFromMenu (route) {
                const menu = this.menu
                for (let i = 0, l = menu.length; i < l; i++) {
                    const item = menu[i]
                    const k = item.children && item.children.length
                    if (k) {
                        for (let j = 0; j < k; j++) {
                            if (item.children[j].name === route.name) {
                                return item
                            }
                        }
                    }
                }
            }
        },
        watch: {
            $route (route) {
                this.isReady = true
                this.shouldExpandMatchItem(route)
            }
        },
        components: {
            Expanding
        },

    }
</script>


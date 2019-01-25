/**
 * Created by lifetea on 16/9/20.
 */
var  Vue       =    require('Vue')

// Vue.use(Vuex);

import conf from '../config/index'

const { menu, config,user } = conf;

const debug = process.env.NODE_ENV !== 'production';

// Vue.use(Vuex);

Vue.config.debug = true;

var count = 1;

const store = new Vuex.Store({
    state: {
        count:count,
        menu:menu,
        config:config,
        tree:{
            current:0
        }
    },
    mutations: {
        doLogin (state) {
            state.user.status = true;
        },
        expanded:function(state,ob){
            ob.el.meta.expanded = ob.bool;
        },
        SIDEBAR (state, status = true) {
            state.config.sidebar = status
        },
        TREE_SELECT (state, index = 0) {
            state.tree.current = index
        },
        TREE_TYPE (state, treeType = "") {
            state.tree.treeType = treeType
        },
    },
    actions: {
        doLogin (commit) {
            commit('doLogin');
        },
        expanded:function(commit,ob){
            store.commit('expanded',ob);
        },
        // Sidebar: show, hide, toggle
        SHOW_SIDEBAR ({ commit }) {
            commit('SIDEBAR', true)
        },
        HIDE_SIDEBAR ({ commit }) {
            commit('SIDEBAR', false)
        },
        TOGGLE_SIDEBAR ({ commit, state }) {
            commit('SIDEBAR', !state.config.sidebar)
        }
    },
    modules: {
        // auth
    },
    strict: debug,
})


export default store
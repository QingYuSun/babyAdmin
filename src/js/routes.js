/**
 * Created by lifetea on 2016/12/16.
 * email: 494886251@qq.com
 * github: https://github.com/lifetea
 */
//login auth
import auth         from  './auth'

//lazy load
const lazyLoading = (name, index = false) => () => System.import(`../view/${name}${index ? '/index' : ''}.vue`)

//要求登录
function requireAuth (to, from, next) {
    if (!auth.loggedIn()) {

        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    } else {
        next()
    }
}

//布局
const routes = [
    { path: '', component: lazyLoading('Layout'),beforeEnter:requireAuth,
        children: [
            {
                path: '',
                component: lazyLoading('Trends/Trends'),
                name:"default",
            },
            {
                path: 'index',
                component: lazyLoading('Trends/Trends'),
                name:'index',
            },
            //消息
            {
                path: '/msg-mail',
                component: lazyLoading('Mail/Mail'),
                name:'msg-mail',
            },
            {
                path: '/msg-trends',
                component: lazyLoading('Trends/Trends'),
                name:'msg-trends',
            },
            {
                path: '/msg-text',
                component: lazyLoading('Text/Text'),
                name:'msg-text',
            },
            //学校
            {
                path: '/school-student',
                component: lazyLoading('Student/Student'),
                name:'school-student',
            },
            {
                path: '/school-teacher',
                component: lazyLoading('Teacher/Teacher'),
                name:'school-teacher',
            },
            {
                path: '/school-school',
                component: lazyLoading('School/School'),
                name:'school-school',
            },
            {
                path: '/company-company',
                component: lazyLoading('Company/Company'),
                name:'company-company',
            },
            //硬件管理
            {
                path: '/signup-baby',
                component: lazyLoading('signup/signup'),
                name:'/signup-baby',
            },
            //报名管理
            {
                path: '/hardware-set',
                component: lazyLoading('Hardware/Hardware'),
                name:'/hardware-set',
            },
            //工作管理
            {
                path: '/work-check',
                component: lazyLoading('Check/Check'),
                name:'work-check',
            },
            {
                path: '/work-tcheck',
                component: lazyLoading('Tcheck/Tcheck'),
                name:'work-tcheck',
            },
            {
                path: '/work-behave',
                component: lazyLoading('Behave/Behave'),
                name:'work-behave',
            },
            {
                path: '/work-event',
                component: lazyLoading('event/event'),
                name:'work-event',
            },
            //课堂助手
            {
                path: '/info-aide',
                component: lazyLoading('aide/aide'),
                name:'info-aide',
            },
            {
                path: '/info-news',
                component: lazyLoading('info/Info'),
                name:'info-news',
            },
            //账户管理
            {
                path: '/account-set',
                component: lazyLoading('Set/Set'),
                name:'account-set',
            },
            {
                path: '/set-company',
                component: lazyLoading('Set/companySet'),
                name:'account-company',
            },
        ]
    },
    {
        path: '/login',
        name:'login',
        component: lazyLoading('Login')
    },
    {
        path: '/logout',
        name:'logout',
        beforeEnter (to, from, next) {
            auth.logout()
            next('/login')
        }
    },
    {
        path: '/newsinfo/article/:id.html',
        component: lazyLoading('News/Article'),
        name:"default",
    },
    {
        path: '/classroomAssist/article/:id.html',
        component: lazyLoading('News/aideArticle'),
        name:"default",
    },
    {
        path: '/tinfo/article/:id.html',
        component: lazyLoading('News/InfoArticle'),
        name:"default",
    },
    {
        path: '/text/article/:id.html',
        component: lazyLoading('News/textArticle'),
        name:"default",
    },
    // {
    //     path: '/newsinfo',
    //     component: lazyLoading('News/Layout'),
    //     children: [
    //         {
    //             path: '/newsinfo/article/:id.html',
    //             component: lazyLoading('News/Article'),
    //             name:"default",
    //         }
    //     ]
    // },
    {
        path: '*',
        component: lazyLoading('Login')
    }
];

export default routes;
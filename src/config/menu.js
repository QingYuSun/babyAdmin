export default [
  // {
  //   path: 'index',
  //   name: 'index',
  //   meta: {
  //     icon: 'fa-tachometer',
  //     label: '主页',
  //   },
  // },
    {
      name: 'msg',
      meta: {
          trole:'1',
          icon: 'fa-cog',
          label: '信息管理',
          expanded: false
      },
      children: [
          {
              name: 'msg-trends',
              path: '/msg-trends',
              meta: {
                  label: '校园动态',
              },
          },
          {
              name: 'msg-mail',
              path: '/msg-mail',
              meta: {
                  label: '消息中心',
              },
          },
          {
              role:'4',
              name: 'msg-text',
              path: '/msg-text',
              meta: {
                  label: '图文信息',
              },
          },
      ]
    },
    {
        name: 'doctor',
        meta: {
            trole:'2',
            icon: 'fa-university',
            label: '学校管理',
            expanded: false
        },
        children: [
            {
                name: 'school-teacher',
                path: '/school-teacher',
                meta: {
                    label: '教师管理',
                },
            },
            {
                name: 'school-student',
                path: '/school-student',
                meta: {
                    label: '学生管理',
                },
            },
            {
                role:'1',
                name: 'school-school',
                path: '/school-school',
                meta: {
                    label: '学校管理',
                },
            },
        ]
    },
    {
        name: 'work',
        meta: {
            trole:'6',
            icon: 'fa-jpy',
            label: '公司管理',
            expanded: false
        },
        children: [
            {
                role:'1',
                name: 'company-company',
                path: '/company-company',
                meta: {
                    label: '公司管理',
                },
            }
        ]
    },
    {
        name: 'work',
        meta: {
            trole:'3',
            icon: 'fa-jpy',
            label: '工作管理',
            expanded: false
        },
        children: [
            {
                name: 'work-check',
                path: '/work-check',
                meta: {
                    label: '宝宝考勤',
                },
            },
            {
                name: 'work-tcheck',
                path: '/work-tcheck',
                meta: {
                    label: '教师考勤',
                },
            },
            {
                name: 'work-behave',
                path: '/work-behave',
                meta: {
                    label: '在校表现',
                },
            },
            {
                name: 'work-event',
                path: '/work-event',
                meta: {
                    label: '事件管理',
                },
            }
        ]
    },
  {
    name: 'signup',
    meta: {
      trole:'4',
      icon: 'fa-jpy',
      label: '报名管理',
      expanded: false
    },
    children: [
      {
        name: 'signup-baby',
        // path: '/set-spread',
        path: '/signup-baby',
        meta: {
          label: '报名管理',
        },
      }
    ]
  },
  {
    name: 'hardware',
    meta: {
      trole:'4',
      icon: 'fa-jpy',
      label: '硬件管理',
      expanded: false
    },
    children: [
      {
        name: 'hardware-set',
        // path: '/set-spread',
        path: '/hardware-set',
        meta: {
          label: '考勤机',
        },
      }
    ]
  },
    {
        name: 'set',
        meta: {
            trole:'5',
            icon: 'fa-jpy',
            label: '学费管理',
            expanded: false
        },
        children: [
           /* {
                name: 'set-spread',
                // path: '/set-spread',
                path: '/',
                meta: {
                    label: '推广管理',
                },
            },*/
            {
                name: 'set-refund',
                // path: '/set-refund',
                path: '#',
                meta: {
                    label: '收费管理',
                },
            }
        ]
    },
    {
        name: 'info',
        meta: {
            trole:'6',
            icon: 'fa-jpy',
            label: '平台资讯管理',
            expanded: false
        },
        children: [
           /* {
                name: 'set-spread',
                // path: '/set-spread',
                path: '/',
                meta: {
                    label: '推广管理',
                },
            },*/
            {
                role:'1',
                name: 'info-aide',
                // path: '/set-refund',
                path: '/info-aide',
                meta: {
                    label: '课堂助手',
                },
            },
            {
               role:'1',
                name: 'info-news',
                // path: '/set-refund',
                path: '/info-news',
                meta: {
                    label: '平台资讯',
                },
            }
        ]
    },
    {
        name: 'account',
        meta: {
            trole:'7',
            icon: 'fa-jpy',
            label: '账户中心',
            expanded: false
        },
        children: [
            {
                name: 'account-set',
                path: '/account-set',
                meta: {
                    label: '校园设置',
                },
            },
            {
                role:'4',
                name: 'account-company',
                path: '/set-company',
                meta: {
                    label: '公司设置',
                },
            }
            /*,
            {
                name: 'hospital',
                path: '/set-hospital',
                meta: {
                    label: '医院管理',
                },
            }*/
        ]
    },
  // {
  //   path: '/logout',
  //   name: 'logout',
  //   meta: {
  //     icon: 'fa-sign-out',
  //     label: '退出',
  //   }
  //
  // }

]


// {
//   label: '审核',
//   icon: 'fa-check-square-o',
//   expanded: false,
//   subMenu: [
//     {
//       link: 'CertList',
//       label: '医生认证'
//     },
//     // {
//     //   link: 'Handsontable',
//     //   label: 'Handsontable'
//     // }
//   ]
// },
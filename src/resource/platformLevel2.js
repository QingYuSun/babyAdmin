/**
 * Created by lifetea on 2016/11/11.
 * email: 494886251@qq.com
 * github: https://github.com/lifetea
 */
export default [
    {
        value: 'UNCERTIFICATION',
        label: '未认证',
        disabled:true,
        tag:'cert-dark'
    },
    {
        value: 'CERTIFICATIONING',
        label: '认证中',
        disabled:true,
        tag:'cert-ing'
    },
    {
        value: 'NOTPASS',
        label: '拒绝',
        disabled:false,
        tag:'cert-fail'
    },
    {
        value: 'CERTIFICATION',
        label: '认证为普通医生',
        disabled:false,
        tag:'cert-success'
    },
    {
        value: 'AUTHORITY',
        label: '认证为权威医生',
        disabled:false,
        tag:'cert-author'
    }
]
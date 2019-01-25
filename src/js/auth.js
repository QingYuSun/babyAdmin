/* globals localStorage */
Vue                     =    require('Vue')
export default {
    login () {
        localStorage.token = true;
        // cb = arguments[arguments.length - 1]
        // if (localStorage.token) {
        //     if (cb) cb(true)
        //     this.onChange(true)
        //     return
        // }
        // pretendRequest(email, pass, (res) => {
        //     if (res.authenticated) {
        //         localStorage.token = res.token
        //         if (cb) cb(true)
        //         this.onChange(true)
        //     } else {
        //         if (cb) cb(false)
        //         this.onChange(false)
        //     }
        // })
    },

    getToken () {
        return localStorage.token
    },

    logout (cb) {
        // console.log(Vue.http.post())


        Vue.http.post('logout', {}).then(function (response) {
            console.log('logout   success')
        }, function (response) {
            console.log('logout   error')
        });


        delete localStorage.token
        delete localStorage.uid
        delete localStorage.schoolId
        delete localStorage.schoolName
        delete localStorage.role
        delete localStorage.schoolImg
        if (cb) cb()
        this.onChange(false)
    },

    loggedIn () {
        return !!localStorage.token
    },

    onChange () {},

    setUserId(uid) {
        localStorage.uid = uid
    },
    getUserId(){
        return localStorage.uid
    },
    setSchoolId(schoolId){
        localStorage.schoolId = schoolId
    },
    getSchoolId(){
        return localStorage.schoolId
    },
    setSchoolName(schoolName){
        localStorage.schoolName = schoolName
    },
    getSchoolName(){
        return localStorage.schoolName
    },
    setRole(role){
        localStorage.role = role
    },
    getRole(){
        return localStorage.role
    },
    setschoolImg(schoolImg){
        localStorage.schoolImg = schoolImg
    },
    getschoolImg(){
        return localStorage.schoolImg
    },

}

// function pretendRequest (email, pass, cb) {
//     setTimeout(() => {
//         if (email === 'joe@example.com' && pass === 'password1') {
//             cb({
//                 authenticated: true,
//                 token: Math.random().toString(36).substring(7)
//             })
//         } else {
//             cb({ authenticated: false })
//         }
//     }, 0)
// }
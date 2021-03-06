/**
 * Created by lifetea on 2016/10/10.
 */
var date = new Date();

var clinicList = new Array(30);

var weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];

function format(s) {
    return s < 10 ? '0' + s: s;
}

for (var i = 0; i < clinicList.length; i++){
    var curr        =   new Date(date.getTime() + i * 86400000);
    var year        =   curr.getFullYear();
    var month       =   format(curr.getMonth() + 1);
    var day         =   format(curr.getDate());
    var stamp       =   new Date(year+'/'+month+'/'+day).getTime();

    clinicList[i]    =   {
        aliasDate       :   month + '-' + day ,
        diagnoseDate    :   year + '-' + month + '-' + day ,
        week            :   weeks[curr.getDay()],
        stamp           :   stamp

    }

}

export default clinicList
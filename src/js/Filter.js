/**
 * Created by lifetea on 2016/10/20.
 */

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


//日期格式化
V.filter('dateFormat', function (value) {
    try
    {
        //在此运行代码
        var time = V.moment(value).format("YY-MM-DD");

        return time
    }
    catch(err)
    {
        return value
    }

})

//时间格式化
V.filter('timeFormat', function (value) {
    try
    {
        //在此运行代码
        var time = V.moment(value).format("YYYY-MM-DD HH:mm:ss");

        return time
    }
    catch(err)
    {
        return value
    }

})

V.filter('payTypeFormat', function (value) {
    try
    {
        if(!value)
            throw new error("时间戳有无");

        let PayType = {
            BANKCARD: "银行卡",
            ALIPAY: "支付宝",
            WECHAT: "微信",
            FREE: "免费",
            BALANCE: "余额",
            FAMILYBALANCE: "家庭组余额"
        }

        for(var a in PayType){
            if(a == value){
                return PayType[a]
            }
        }
    }
    catch(err)
    {
        return "未知"
    }

})

V.filter('payStatusFormat', function (value) {
        var PayStatus = {
            "COMPLETE": "完成",
            "REFUND": "已退款",
            "EXPIRE": "过期",
            "CANCEL": "退款中",
            "INITIAL": "待支付",
            "AGREE": "同意",
            "PAID": "未完成"
        }

        //在此运行代码
        for(var a in PayStatus){
            if(a == value){
                value = PayStatus[a]
                break
            }
        }
        return value
})

V.filter('orderTypeFormat', function (value) {
    var oderType = {
        "REFUND": "退款",
        "DRAWMONEY": "提现",
        "EXPENSE": "消费",
        "RECHARGE": "充值"
    }

    for(var a in oderType){
        if(a == value){
            value = oderType[a]
            break
        }
    }
    return value
})


V.filter('infoConfFormat', function (value) {
    var infoConfType = {
        SPECIFICOPEN: "就诊医生可见",
        CLOSE: "仅自己可见",
        OPEN: "所有医生可见"
    }
    //在此运行代码
    for(var a in infoConfType){
        if(a == value){
            value = infoConfType[a]
            break
        }
    }
    return value
})

V.filter('platformLevelFormat', function (value) {
    let infoConfType = {
        "UNCERTIFICATION": "未认证",
        "CERTIFICATIONING": "认证中",
        "CERTIFICATION": "认证",
        "NOTPASS": "未通过",
        "AUTHORITY": "权威"
    }
    //在此运行代码
    for(let a in infoConfType){
        if(a == value){
            value = infoConfType[a]
            break
        }
    }
    return value
})

V.filter('levelFormat', function (value) {
    let infoConfType = {
        "VISITINGDOCTOR": "主治医师",
        "RESIDENTDOCTOR": "住院医师",
        "ARCHIATERDOCTOR": "主任医师",
        "VICEARCHIATERDOCTOR": "副主任医师"
    }
    //在此运行代码
    for(let a in infoConfType){
        if(a == value){
            value = infoConfType[a]
            break
        }
    }
    return value
})

V.filter('sexFormat', function (value) {
    let infoConfType = {
        "SECRECY": "保密",
        "MAN": "男",
        "WOMAN": "女",
    }
    for(let a in infoConfType){
        if(a == value){
            value = infoConfType[a]
            break
        }
    }
    value = value || '未知'
    return value
})


V.filter('birthdayFormat', function (value) {
    try
    {
        if(value < 0 || !value)
            throw new error("时间戳有无");
        var time = new Date(value).Format("yyyy-MM-dd");

        return time
    }
    catch(err)
    {
        return "未知"
    }
})

V.filter('ageFormat', function (value) {
    try
    {
        if(value < 0 || !value)
            throw new error("时间戳有无");

        let age = V.moment().format("YYYY") - V.moment(value).format("YYYY");
        return age
    }
    catch(err)
    {
        return "未知"
    }
})

//结算状态
V.filter('balanceStatusFilter', function (value) {
    let infoConfType = {
        "CLOSING": "结算",
        "TRANSFERING": "转账中",
        "TRANSFERSUCCEED": "转账成功",
        "TRANSFERFAIL": "转账失败"
    }
    //在此运行代码
    for(let a in infoConfType){
        if(a == value){
            value = infoConfType[a]
            break
        }
    }
    return value
})

//分转元
V.filter('centFormat', function (value) {
    return parseInt(value) / 100
})
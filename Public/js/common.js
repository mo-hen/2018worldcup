//格式化时间戳
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    //Y = date.getFullYear() + '-';
    //M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
    //D = date.getDate() + '日 ';
    //h = date.getHours() + ':';
    //m = date.getMinutes() + ':';
    //s = date.getSeconds();
    //return M+D+h+m;

    //var y = 1900+date.getYear();
    var M = "0" + (date.getMonth() + 1);
    var D = "0" + date.getDate();
    var h = "0" + date.getHours();
    var m = "0" + date.getMinutes();
    return M.substring(M.length - 2, M.length) + "-" + D.substring(D.length - 2, D.length) + " " + h.substring(h.length - 2, h.length) + ":" + m.substring(m.length - 2, m.length);

}

//格式化时间戳
function timestampToDateTime(timestamp) {
    var date = new Date(timestamp);
    var Y = 1900 + date.getYear();
    var M = "0" + (date.getMonth() + 1);
    var D = "0" + date.getDate();
    var h = "0" + date.getHours();
    var m = "0" + date.getMinutes();
    return Y + "-" + M.substring(M.length - 2, M.length) + "-" + D.substring(D.length - 2, D.length) + " " + h.substring(h.length - 2, h.length) + ":" + m.substring(m.length - 2, m.length);

}

//获取时期
function timestampToDateCompare(timestamp1, timestamp2) {
    var date1 = new Date(timestamp1);
    var date2 = new Date(timestamp2);
    var str1 = (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) + '月' + date1.getDate() + '日 ';
    var str2 = (date2.getMonth() + 1 < 10 ? '0' + (date2.getMonth() + 1) : date2.getMonth() + 1) + '月' + date2.getDate() + '日 ';
    return ((str1 == str2) ? true : false);
}

// 获取地址栏参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    // if (r != null) return unescape(r[2]);
    //解决中文乱码
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值
}

//检测钱包地址
function checkAddress(address) {
    // var regEth = /^[0-9a-zA-Z]{32}$/;
    var regEth = /^[0-9A-Z]{32}$/;
    if (regEth.test(address)) {
        return true;
    } else {
        return false;
    }
}

//点击logo返回首页
$('.top-left-img').on('click', function (e) {
    window.location.href = './p.index.html';
})

//设置语言
function switchLanguage(lang) {
    $.ajax({
        type: "get",
        url: requestUrl + '/v1/fifa/change-locale',
        async: false,
        crossDomain: true,
        xhrFields: {withCredentials: true},
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        data: {
            lang: lang
        },
        success: function (data) {
            if (data.code == '0') {
                return true;
            } else {
                return false;
            }
        },
        error: function (err) {
            console.log('***************', err);
            return false;
        }
    });
}

// IP判断
function checkIp() {
    var lang;
    $.ajax({
        url: '//freegeoip.net/json/',
        type: 'GET',
        async: false,
        dataType: 'JSON',
        success: function(data){
            if(data.country_code == "CN"){
                $.cookie('locale', 'zh_CN', {path: '/', expire: 30});
                lang = 'zh'
            }else{
                $.cookie('locale', 'en_US', {path: '/', expire: 30});
                lang = 'en'
            }
        },
        error: function(msg){
            console.log('********************' + msg);
            $.cookie('locale', 'zh_CN', {path: '/', expire: 30});
            lang = 'zh'
        }
    });
    return lang;
}


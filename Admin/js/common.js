NProgress.start();

NProgress.done();

$('.navs ul').prev('a').on('click', function () {
    $(this).next().slideToggle();
});

//退出
$('#logout').on('click', function () {
    $.ajax({
        type: "get",
        url: '/user/logout',
        success: function (msg) {
            window.location.href = "../login.html";
            $.cookie('userId',null,{path:'/'})
            $.cookie('username',null,{path:'/'})
            $.cookie('userTel',null,{path:'/'})
        }
    })
})

function checkLogin() {
    if(!$.cookie('userTel')){
        window.location.href = '/login.html'
    }
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

//格式化时间戳
function timestampToDateTime(timestamp) {
    var date = new Date(timestamp);
    var Y = 1900+date.getYear();
    var M = "0"+(date.getMonth()+1);
    var D = "0"+date.getDate();
    var h = "0"+date.getHours();
    var m = "0"+date.getMinutes();
    // return Y + "-" + M.substring(M.length-2,M.length)+"-"+D.substring(D.length-2,D.length)+" "+h.substring(h.length-2,h.length)+":"+m.substring(m.length-2,m.length);
    return Y + "/" + M.substring(M.length-2,M.length)+"/"+D.substring(D.length-2,D.length)+" "+h.substring(h.length-2,h.length)+":"+m.substring(m.length-2,m.length);

}

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
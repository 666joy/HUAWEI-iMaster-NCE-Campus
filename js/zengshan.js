$(function () {
    $.get("nav.html", function (data) {
        $(".nav").html(data);
    });
    $("#form").ajaxForm(function (data) {
        data = JSON.parse(data)
        console.log(data)
        if (data['errcode'] == '0') {
            layer.msg("添加成功")
        } else {
            layer.msg("添加失败：" + data['errmsg'])
        }
    });
})
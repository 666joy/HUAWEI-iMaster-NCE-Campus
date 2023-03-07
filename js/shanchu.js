$(function () {
    $.get("nav.html", function (data) {
        $(".nav").html(data);
    });
    $("#form").ajaxForm(function (data) {
        data = JSON.parse(data)
        console.log(data)
        if (data['errcode'] == '0') {
            layer.msg("删除成功")
        } else {
            layer.msg("删除失败：" + data['errmsg'])
        }
    });
})
function test(str) {
    switch (str) {
        case "alert-success":
            success_prompt("查询成功");
            break;
        case "alert_warning":
            warning_prompt("错误警告");
            break;
        case "alert-danger":
            fail_prompt("提交失败");
            break;
        case "alert_info":
            info_prompt("未查询到数据");
            break;
        default:
            alert_prompt("未查询到数据");
    }

}

/**
 * 弹出式提示框，默认1.2秒自动消失
 * @param message 提示信息
 * @param style 提示样式，有alert-success、alert-danger、alert-warning、alert-info
 * @param time 消失时间
 */
var prompt = function (message, style, time) {
    style = (style === undefined) ? 'alert-success' : style;
    time = (time === undefined) ? 1200 : time;
    $('<div id="promptModal">')
        .appendTo('body')
        .addClass('alert ' + style)
        .css({
            "display": "block",
            "z-index": 99999,
            "left": ($(document.body).outerWidth(true) - 120) / 2,
            "top": ($(window).height() - 45) / 2,
            "position": "absolute",
            "padding": "20px",
            "border-radius": "5px"
        })
        .html(message)
        .show()
        .delay(time)
        .fadeOut(10, function () {
            $('#promptModal').remove();
        });
};

// 成功提示
var success_prompt = function (message, time) {
    prompt(message, 'alert-success', time);
};

// 失败提示
var fail_prompt = function (message, time) {
    prompt(message, 'alert-danger', time);
};

// 提醒
var warning_prompt = function (message, time) {
    prompt(message, 'alert-warning', time);
};

// 信息提示
var info_prompt = function (message, time) {
    prompt(message, 'alert-info', time);
};

// 信息提示
var alert_prompt = function (message, time) {
    prompt(message, 'alert-pormpt', time);
};

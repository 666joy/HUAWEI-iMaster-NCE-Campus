$(function () {
    layer.load(2);
    $.get("nav.html", function (data) {
        $(".nav").html(data);
    });
    $.ajaxSettings.async = false;
    $.get("http://127.0.0.1:5000/chaxunshebei", function (data) {
        var d = JSON.parse(data)
        layui.use('table', function () {
            var table = layui.table;
            table.render({
                elem: '#t',
                height: 'full-1',
                data: d,
                page: false,
                cols: [[
                    { field: 'name', title: '设备名', width: 120, minWidth: 80, sort: true, fixed: 'left' },
                    { field: 'id', title: '设备ID', width: 310, minWidth: 100, sort: false },
                    { field: 'systemIp', title: '系统IP', width: 130, minWidth: 100, sort: false },
                    { field: 'siteId', title: '站点ID', width: 310, minWidth: 100, sort: false },
                    { field: 'deviceType', title: '类型', width: 80, minWidth: 50, sort: true },
                    { field: 'neType', title: '型号', width: 120, minWidth: 100, sort: true },
                    { field: 'status', title: '状态', width: 100, minWidth: 100, sort: false },
                    { field: 'createTime', title: '创建时间', width: 200, minWidth: 120, sort: true },
                ]],
                limit: 1000
            });
        });
        layer.closeAll('loading');
    })
})
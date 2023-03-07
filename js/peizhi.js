$(function () {
    $.get("nav.html", function (data) {
        $(".nav").html(data);
    });
    // $.get("APform.html", function (data) {
    //     $("#peizhikuang").html(data);
    // });
    layui.use('dropdown', function () {
        var dropdown = layui.dropdown
        dropdown.render({
            elem: '#devicetype',
            data: [
                {
                    title: "AR",
                    id: "AR",
                    href: "#"
                },
                {
                    title: "AP",
                    id: "AP",
                    href: "#",
                },
                {
                    title: "LSW",
                    id: "LSW",
                    href: "#",
                },
                {
                    title: "FW",
                    id: "FW",
                    href: "#",
                }
            ],
            click: function (obj) {
                layer.load(2);
                document.getElementById('devicetype').innerHTML = obj.id + "<i class=\"layui-icon layui-icon-down layui-font-12\"></i>"
                var arr = []
                $.get("http://127.0.0.1:5000/chaxunshebei?deviceType=" + obj.id, function (data) {
                    var d = JSON.parse(data)
                    var listindex = 0
                    for (i of d) {
                        i.title = i.name
                        i.href = "#"
                        i.type = obj.id
                        i.listindex = listindex
                        listindex++
                        arr.push(i)
                    }
                    if (d.length == 0) {
                        arr.push({
                            title: "无设备",
                            id: "-1",
                            href: "#",
                        })
                    }
                    layer.closeAll('loading');
                })
                // document.getElementsByName('device')[0].remove()
                var text = "<button class=\"layui-btn\" name=\"device\" id=\"" + obj.id + "device\" style=\"margin-top: 22px; margin-left:40px; float: left;\">" +
                    "请选择设备" +
                    "<i class=\"layui-icon layui-icon-down layui-font-12\"></i>" +
                    "</button>"
                document.getElementById('gai').innerHTML = text


                dropdown.render({
                    elem: '#' + obj.id + 'device',
                    data: arr,
                    click: function (obj) {
                        document.getElementsByName('id')[0].value = arr[obj.listindex].id
                        document.getElementsByName('esn')[0].value = arr[obj.listindex].esn
                        document.getElementsByName('name')[0].value = arr[obj.listindex].name
                        document.getElementsByName('siteId')[0].value = arr[obj.listindex].siteId
                        document.getElementsByName('description')[0].value = arr[obj.listindex].description
                        document.getElementsByName('deviceModel')[0].value = arr[obj.listindex].deviceModel
                        document.getElementsByName('systemIp')[0].value = arr[obj.listindex].systemIp
                        document.getElementsByName('tags')[0].value = arr[obj.listindex].tags
                        $("[name='role']").val(arr[obj.listindex].role[0])
                        $("[name='performance']").val(arr[obj.listindex].performance)

                        // if (obj.type == "AP") {
                        //     layer.load(2);
                        //     var apshepin = {}
                        //     var apconfig = {}
                        //     $.ajaxSettings.async = false;
                        //     $.get("http://127.0.0.1:5000/chaxunapshepin?deviceId=" + obj.id, function (data) {
                        //         var d = JSON.parse(data)
                        //         if (d['data'] != null) {
                        //             apshepin = d['data']
                        //         } else {
                        //             apshepin = {
                        //                 "antenna2Dot4Gain": "",
                        //                 "antenna2th5Gain": null,
                        //                 "antenna5Gain": "",
                        //                 "deviceId": obj.id,
                        //                 "deviceName": obj.name,
                        //                 "flexibleRadio": 1,
                        //                 "radio2BandwidthEnable": false,
                        //                 "radio2dot4Bandwidth": "auto",
                        //                 "radio2dot4Channel": "auto",
                        //                 "radio2dot4Enabled": true,
                        //                 "radio2dot4Power": "auto",
                        //                 "radio2th5Bandwidth": null,
                        //                 "radio2th5BandwidthEnable": null,
                        //                 "radio2th5Channel": null,
                        //                 "radio2th5Enabled": null,
                        //                 "radio2th5Power": null,
                        //                 "radio5Bandwidth": "auto",
                        //                 "radio5BandwidthEnable": false,
                        //                 "radio5Channel": "auto",
                        //                 "radio5Channel2": null,
                        //                 "radio5Enabled": true,
                        //                 "radio5Power": "auto"
                        //             }
                        //         }
                        //     })
                        //     $.get("http://127.0.0.1:5000/chaxunapip?deviceId=" + obj.id, function (data) {
                        //         var d = JSON.parse(data)
                        //         if (d['data'] != null) {
                        //             apconfig = d['data']
                        //         } else {
                        //             apconfig = {
                        //                 "vlanId": "",
                        //                 "ip": "",
                        //                 "mask": "",
                        //                 "gateway": "",
                        //                 "masterDns": "",
                        //                 "slaveDns": ""
                        //             }
                        //         }
                        //         layer.closeAll('loading');
                        //     })
                        //     $.ajaxSettings.async = true;
                        //     $.get("APform.html", function (data) {
                        //         $("#peizhikuang").html(data)
                        //         document.getElementById('nav').style.height = "1900px"
                        //         document.getElementsByName('deviceId')[0].value = apshepin.id
                        //         document.getElementsByName('deviceName')[0].value = apshepin.deviceName
                        //         document.getElementsByName('vlanId')[0].value = apconfig.vlanId
                        //         document.getElementsByName('ip')[0].value = apconfig.ip
                        //         document.getElementsByName('mask')[0].value = apconfig.mask
                        //         document.getElementsByName('gateway')[0].value = apconfig.gateway
                        //         document.getElementsByName('masterDns')[0].value = apconfig.masterDns
                        //         $("[name='radio2dot4Enabled']").val(apshepin.radio2dot4Enabled);
                        //         document.getElementsByName('radio2dot4Power')[0].value = apshepin.radio2dot4Power
                        //         document.getElementsByName('radio2dot4Channel')[0].value = apshepin.radio2dot4Channel
                        //         $("[name='radio2dot4Bandwidth']").val(apshepin.radio2dot4Bandwidth);
                        //         document.getElementsByName('antenna2Dot4Gain')[0].value = apshepin.antenna2Dot4Gain
                        //         $("[name='radio2BandwidthEnable']").val(apshepin.radio2BandwidthEnable);
                        //         $("[name='radio5Enabled']").val(apshepin.radio5Enabled);
                        //         document.getElementsByName('radio5Power')[0].value = apshepin.radio5Power
                        //         document.getElementsByName('radio5Channel')[0].value = apshepin.radio5Channel
                        //         document.getElementsByName('radio5Channel2')[0].value = apshepin.radio5Channel2
                        //         document.getElementsByName('antenna5Gain')[0].value = apshepin.antenna5Gain
                        //         $("[name='radio5Bandwidth']").val(apshepin.radio5Bandwidth);
                        //         $("[name='radio5BandwidthEnable']").val(apshepin.radio5BandwidthEnable);
                        //         $("[name='radio2th5Enabled']").val(apshepin.radio2th5Enabled);
                        //         document.getElementsByName('radio2th5Power')[0].value = apshepin.radio2th5Power
                        //         document.getElementsByName('radio2th5Channel')[0].value = apshepin.radio2th5Channel
                        //         document.getElementsByName('antenna2th5Gain')[0].value = apshepin.antenna2th5Gain
                        //         document.getElementsByName('radio2th5Bandwidth')[0].value = apshepin.radio2th5Bandwidth
                        //         $("[name='radio2th5BandwidthEnable']").val(apshepin.radio2th5BandwidthEnable)
                        //         $("[name='flexibleRadio']").val(apshepin.flexibleRadio)
                        //     });
                        // }

                        // if (obj.type == "AR") {
                        //     layer.load(2);
                        //     var routeconfig = {}
                        //     $.ajaxSettings.async = false;
                        //     $.get("http://127.0.0.1:5000/chaxunjingtailuyou?deviceId=" + obj.id, function (data) {
                        //         var d = JSON.parse(data)
                        //         if (d['data'] != null) {
                        //             routeconfig = d['data']['routes'][0]
                        //         } else {
                        //             routeconfig = {
                        //                 "mask": "",
                        //                 "description": "",
                        //                 "nextAddress": "",
                        //                 "destinationIp": "",
                        //                 "priority": "",
                        //                 "nextInterface": "",
                        //                 "nqaId": "",
                        //                 "nqaAdminName": "",
                        //                 "nqaTestName": "",
                        //                 "dhcp": "true",
                        //                 "nextLogicInterface": "",
                        //                 "id": ""
                        //             }
                        //         }
                        //         layer.closeAll('loading');
                        //     })
                        //     $.ajaxSettings.async = true;
                        //     $.get("ARform.html", function (data) {
                        //         $("#peizhikuang").html(data)
                        //         document.getElementById('nav').style.height = "1000px"
                        //         document.getElementsByName('deviceId')[0].value = obj.id
                        //         document.getElementsByName('deviceName')[0].value = obj.name
                        //         document.getElementsByName('mask')[0].value = routeconfig.mask
                        //         document.getElementsByName('description')[0].value = routeconfig.description
                        //         document.getElementsByName('nextAddress')[0].value = routeconfig.nextAddress
                        //         document.getElementsByName('destinationIp')[0].value = routeconfig.destinationIp
                        //         document.getElementsByName('priority')[0].value = routeconfig.priority
                        //         document.getElementsByName('nextInterface')[0].value = routeconfig.nextInterface
                        //         // document.getElementsByName('dhcp')[0].value = routeconfig.dhcp
                        //         $("[name='nqaId']").val(routeconfig.dhcp);
                        //         document.getElementsByName('nextLogicInterface')[0].value = routeconfig.nextLogicInterface
                        //         document.getElementsByName('id')[0].value = routeconfig.id
                        //     });
                        // }
                    }
                });
            }
        })
        // dropdown.render({
        //     elem: '#device',
        //     data: [],
        //     click: function (obj) {
        //         layer.msg("请选择设备类型")
        //     }
        // })
    });
    $("#form").ajaxForm(function (data) {
        data = JSON.parse(data)
        console.log(data)
        if (data["errcode"] == "0") {
            layer.msg("修改成功")
        } else {
            layer.msg("修改失败：" + data['errmsg'])
        }
    });
})
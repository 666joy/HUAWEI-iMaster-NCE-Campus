from flask import *
import pymysql
import requests

app = Flask(__name__)


# 获取token
def get_token():
    res = requests.post(
        url='https://cn2.naas.huaweicloud.com:18002/controller/v2/tokens',
        headers={
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        },
        json={"userName": "c4_usr_206", "password": "1qaz@WSX_206"}
    ).json()
    if res['errcode'] == '0':
        return res['data']['token_id']


@app.route('/')
def hello_world():
    return 'Hello C4!'


# 注册
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == "POST":
        try:
            username = request.form['username']
            pw = request.form['password']
        except:
            resp = make_response("bad request")
            resp.headers['Access-Control-Allow-Origin'] = '*'
            return resp

        db = pymysql.connect(host='localhost', user='root',
                             password='123456', database='wt')
        cursor = db.cursor()

        sql1 = "SELECT * FROM users \
            WHERE useraccount = %s" % (username)

        try:
            cursor.execute(sql1)
            results = cursor.fetchall()
        except:
            resp = make_response("error: network down")

        if results:
            resp = make_response("error: useraccount exists")
        else:
            sql2 = "INSERT INTO users(useraccount, userpw) \
                VALUES ('%s', '%s')" % \
                   (username, pw)
            try:
                cursor.execute(sql2)
                db.commit()
                resp = make_response("success: register")
            except:
                db.rollback()
                resp = make_response("error: register failed")
        db.close()
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
    if request.method == "GET":
        resp = make_response("error")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


# 登陆
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        try:
            username = request.form['acc']
            pw = request.form['pw']
        except:
            resp = make_response("bad request")
            resp.headers['Access-Control-Allow-Origin'] = '*'
            return resp

        db = pymysql.connect(host='localhost', user='root',
                             password='123456', database='wt')
        cursor = db.cursor()

        sql1 = "SELECT * FROM users \
            WHERE useraccount = '%s' \
            AND userpw = '%s' " % \
               (username, pw)

        try:
            cursor.execute(sql1)
            results = cursor.fetchall()
        except:
            resp = make_response("error: network down")

        if results:
            resp = make_response("success: login")
        else:
            resp = make_response(
                "error: account does not exist or password is incorrect")

        db.close()
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
    if request.method == "GET":
        resp = make_response("error")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


# 查询设备
@app.route('/chaxunshebei', methods=['GET', 'POST'])
def chaxunshebei():
    if request.method == "GET":
        if request.args.get('deviceType') == None:
            deviceType = ""
        else:
            deviceType = request.args.get('deviceType')
        token = get_token()
        db = pymysql.connect(host='localhost', user='root',
                             password='123456', database='wt')
        cursor = db.cursor()
        sql1 = "SELECT siteId FROM sites"
        try:
            cursor.execute(sql1)
            sitestuple = cursor.fetchall()
        except:
            print("error")
        db.close()
        siteslist = list(sitestuple)
        devicelist = list()
        for siteid in siteslist:
            res = requests.get(
                url='https://cn2.naas.huaweicloud.com:18002/controller/campus/v3/devices',
                headers={
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'X-AUTH-TOKEN': token,
                    'Accept-Language': 'en-US'
                },
                params={
                    "siteId": str(siteid)[2:-3],
                    "deviceType": deviceType
                }
            ).json()['data']
            devicelist.extend(res)
    res = json.dumps(devicelist)
    resp = make_response(res)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


# 修改设备
@app.route('/xiugaishebei', methods=['GET', 'POST'])
def xiugaishebei():
    if request.method == "POST":
        deviceId = request.form['id']
        esn = request.form['esn']
        name = request.form['name']
        siteId = request.form['siteId']
        description = request.form['description']
        # deviceModel = request.form['deviceModel']
        systemIp = request.form['systemIp']
        tags = request.form['tags']
        role = request.form['role']
        performance = request.form['performance']
        token = get_token()
        res = requests.put(
            url='https://cn2.naas.huaweicloud.com:18002/controller/campus/v3/devices/' + deviceId,
            headers={
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'X-AUTH-TOKEN': token,
                'Accept-Language': 'en-US'
            },
            json={
                "esn": esn,
                "name": name,
                "siteId": siteId,
                "description": description,
                # "deviceModel": deviceModel,
                "systemIp": systemIp,
                # "tags": "null",
                "role": [role],
                "performance": performance
            }
        ).json()
        res = json.dumps(res)
        resp = make_response(res)
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


# 创建设备
@app.route('/chuangjianshebei', methods=['GET', 'POST'])
def chuangjianshebei():
    if request.method == "POST":
        esn = request.form['esn']
        name = request.form['name']
        siteId = request.form['siteId']
        description = request.form['description']
        deviceModel = request.form['deviceModel']
        systemIp = request.form['systemIp']
        tags = request.form['tags']
        ztpConfirm = request.form['ztpConfirm']
        role = request.form['role']
        performance = request.form['performance']
        isRegisterEnable = request.form['isRegisterEnable']
        token = get_token()
        res = requests.post(
            url='https://cn2.naas.huaweicloud.com:18002/controller/campus/v3/devices',
            json={
                "devices": [
                    {
                        "esn": esn,
                        "name": name,
                        "siteId": siteId,
                        "description": description,
                        "deviceModel": deviceModel,
                        "systemIp": systemIp,
                        # "tags": "null",
                        "ztpConfirm": ztpConfirm,
                        "role": [role],
                        "performance": performance
                    }
                ],
                "isRegisterEnable": isRegisterEnable
            },
            headers={
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'X-AUTH-TOKEN': token,
                'Accept-Language': 'en-US'
            }
        ).json()
        res = json.dumps(res)
        resp = make_response(res)
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


# 删除设备
@app.route('/shanchushebei', methods=['GET', 'POST'])
def shanchushebei():
    if request.method == "POST":
        id = request.form['id']
        token = get_token()
        res = requests.delete(
            url='https://cn2.naas.huaweicloud.com:18002/controller/campus/v3/devices',
            json={
                "deviceIds": [id],
                "reset": "true"
            },
            headers={
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'X-AUTH-TOKEN': token,
                'Accept-Language': 'en-US'
            }
        ).json()
        res = json.dumps(res)
        resp = make_response(res)
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


# 查询静态路由
@app.route('/chaxunjingtailuyou', methods=['GET', 'POST'])
def chaxunjingtailuyou():
    if request.method == "GET":
        if request.args.get('deviceId') == None:
            deviceId = ""
        else:
            deviceId = request.args.get('deviceId')
        pageSize = 1000

        token = get_token()

        res = requests.get(
            url='https://cn2.naas.huaweicloud.com:18002/controller/campus/v1/networkservice/networkconfig/net/arstaticroute/devices/' + deviceId + '/staticroute',
            headers={
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'X-AUTH-TOKEN': token,
                'Accept-Language': 'en-US'
            },
            params={
                "pageSize": pageSize,
            }
        ).json()
        res = json.dumps(res)
        resp = make_response(res)
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


# 查询AP射频
@app.route('/chaxunapshepin', methods=['GET', 'POST'])
def chaxunapshepin():
    if request.method == "GET":
        if request.args.get('deviceId') == None:
            deviceId = ""
        else:
            deviceId = request.args.get('deviceId')

        token = get_token()

        res = requests.get(
            url='https://cn2.naas.huaweicloud.com:18002/controller/campus/v3/networkconfig/device/' + deviceId + '/apradio/radios',
            headers={
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'X-AUTH-TOKEN': token,
                'Accept-Language': 'en-US'
            }
        ).json()

    res = json.dumps(res)
    resp = make_response(res)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


# 查询APIP设置
@app.route('/chaxunapip', methods=['GET', 'POST'])
def chaxunapip():
    if request.method == "GET":
        if request.args.get('deviceId') == None:
            deviceId = ""
        else:
            deviceId = request.args.get('deviceId')
        token = get_token()
        res = requests.get(
            url='https://cn2.naas.huaweicloud.com:18002/controller/campus/v1/networkservice/networkconfig/net/apstaticip/devices/' + deviceId,
            headers={
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'X-AUTH-TOKEN': token,
                'Accept-Language': 'en-US'
            }
        ).json()
    res = json.dumps(res)
    resp = make_response(res)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


# 查询实时客流量
# @app.route('/immediate', methods=['GET', 'POST'])
# def immediate():
#     token = get_token()
#     num = requests.get(
#         url='https://cn2.naas.huaweicloud.com:18002/controller/campus/v1/performanceservice/endpointbehavior/realtimeflow',
#         params={"siteId": "c7045991-9493-4dad-9754-bee581ed71dd"},
#         headers={
#             'Accept': 'application/json',
#             'Content-Type': 'application/json;charset=UTF-8',
#             'X-AUTH-TOKEN': token,
#             'Accept-Language': 'en-US'
#         }
#     ).json()
#     num = json.dumps(num)
#     resp = make_response(num)
#     resp.headers['Access-Control-Allow-Origin'] = '*'
#     return resp

# 查询历史客流量
# @app.route('/history', methods=['GET', 'POST'])
# def history():
#     token = get_token()
#     num = requests.get(
#         url='https://cn2.naas.huaweicloud.com:18002/controller/campus/v1/performanceservice/endpointbehavior/historyflow',
#         params={"siteId": "c7045991-9493-4dad-9754-bee581ed71dd"},
#         headers={
#             'Accept': 'application/json',
#             'Content-Type': 'application/json;charset=UTF-8',
#             'X-AUTH-TOKEN': token,
#             'Accept-Language': 'en-US'
#         }
#     ).json()
#     num = json.dumps(num)
#     resp = make_response(num)
#     resp.headers['Access-Control-Allow-Origin'] = '*'
#     return resp

# 查询楼层终端设备AP
@app.route('/xunren', methods=['GET', 'POST'])
def xunren():
    if request.method == "GET":
        if request.args.get('deviceId') == None:
            deviceId = ""
        else:
            deviceId = request.args.get('deviceId')
        pageSize = 1000

        token = get_token()

        res = requests.get(
            url='https://cn2.naas.huaweicloud.com:18002/controller/campus/v1/indoormapservice/devices/' + deviceId + '/location-info',
            headers={
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'X-AUTH-TOKEN': token,
                'Accept-Language': 'en-US'
            },
            params={
                "pageSize": pageSize,
            }
        ).json()
        res = json.dumps(res)
        resp = make_response(res)
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


if __name__ == '__main__':
    app.run(debug=True)

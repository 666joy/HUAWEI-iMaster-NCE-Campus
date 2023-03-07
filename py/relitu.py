#  Rssi 3D定位算法
import numpy as np

# 站点
class AP:
    x = 0
    y = 0
    z = 0
    D = 0
    apMac = ""
    terminalList = []


# 定位目标
class Target:
    x = 0
    y = 0
    z = 0


# 两点之间距离
def Get_DIST(A, B):
    dist = ((A.x - B.x) ** 2 + (A.y - B.y) ** 2 + (A.z - B.z) ** 2) ** 0.5
    return dist


# 由Rssi的值计算距离d
def GetDistByRssi(rssi):
    A = -42
    n = 2  # A, n在不同的硬件系统取值不一样
    d = 10 ** ((A - rssi) / 10 / n)
    return d


# 参数设置
Node_number = 10  # AP个数
api_result = []  # api调用结果
db_result = []  # 数据库调用得到预先设置的AP信息（包括apMac, xyz坐标）
search_terminalMac = []
Node = []
for i in range(Node_number):
    for j in range(Node_number):
        if db_result[i].apMac == api_result[j].apMac:
            tmp_node = AP()
            tmp_node.x = db_result[i].x
            tmp_node.y = db_result[i].y
            tmp_node.z = db_result[i].z
            tmp_node.D = tmp_node.x ** 2 + tmp_node.y ** 2 + tmp_node.z ** 2
            tmp_node.apMac = db_result[i].apMac
            tmp_node.terminalList = api_result[j].terminalList
            Node.append(tmp_node)
            for k in api_result[j].terminalList:
                search_terminalMac.append(k.terminalMac)
            break
search_terminalMac = set(search_terminalMac)

result = []
for k in search_terminalMac:
    ZZ = []
    for i in range(Node_number):
        for j in Node[i].terminalList:
            if j.terminalMac == k:
                ZZ.append(j.rssi)

    # 根据Rssi求观测距离
    Zd = np.zeros(Node_number)  # 计算的距离
    for i in range(Node_number):
        Zd[i] = GetDistByRssi(ZZ[i])

    # 用最小二乘法估计目标位置
    H = np.zeros((Node_number - 1, 3))
    b = np.zeros(Node_number - 1)
    for i in range(1, Node_number):
        H[i - 1] = [2 * (Node[i].x - Node[1].x), 2 * (Node[i].y - Node[1].y), 2 * (Node[i].z - Node[1].z)]
        b[i - 1] = Zd[1] ** 2 - Zd[i] ** 2 + Node[i].D - Node[1].D

    H_zhuanzhi = np.transpose(H)  # H'
    HHH = np.dot(np.linalg.inv(np.dot(np.transpose(H), H)), H_zhuanzhi)
    Estimate = np.dot(HHH, b)

    Est_Target = Target()
    Est_Target.x = Estimate[0]
    Est_Target.y = Estimate[1]
    Est_Target.z = Estimate[2]
    result.append(Est_Target)

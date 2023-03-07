function validate_username(username) {
    if (username == "") {
        document.getElementById("test_user").innerHTML = "<font color='red' size='2px'>账号不能为空</font>"
        register_unclickable()
    } else {
        if (document.getElementById("test_user").childNodes[0] != undefined) {
            document.getElementById("test_user").removeChild(document.getElementById("test_user").childNodes[0])
        }
    }
    check()
}

function validate_password(password) {
    if (password == "") {
        document.getElementById("is_test_pw1").innerHTML = "<font color='red' size='2px'>密码不能为空</font>"
        register_unclickable()
    } else {
        if (document.getElementById("is_test_pw1").childNodes[0] != undefined) {
            document.getElementById("is_test_pw1").removeChild(document.getElementById("is_test_pw1").childNodes[0])
        }
    }
    check()
}

function validate_password2(password2) {
    var password = document.getElementById("password").value
    if (password2 == "") {
        document.getElementById("is_test_pw2").innerHTML = "<font color='red' size='2px'>密码不能为空</font>"
        register_unclickable()
    } else if (password != password2) {
        document.getElementById("is_test_pw2").innerHTML = "<font color='red' size='2px'>两次输入的密码不相同</font>"
        register_unclickable()
    } else {
        if (document.getElementById("is_test_pw2").childNodes[0] != undefined) {
            document.getElementById("is_test_pw2").removeChild(document.getElementById("is_test_pw2").childNodes[0])
        }
    }
    check()
}

function check() {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var password2 = document.getElementById("password2").value

    if (username != "" && password != "" && password2 != "" && password == password2) {
        register_clickable()
    }
}

function register_unclickable() {
    var btn = document.getElementById('register')
    btn.disabled = true
}

function register_clickable() {
    var btn = document.getElementById('register')
    btn.disabled = false
}

function formcallback(msg) {
    if (msg == "error: network down") {
        layer.msg('网络错误')
    }
    if (msg == "success: register") {
        layer.msg('注册成功')
    }
    if (msg == "error: useraccount exists") {
        layer.msg('该账号已存在，请重新输入')
    }
    if (msg == "error: register failed") {
        layer.msg('注册失败，请重新尝试')
    }
    if (msg == "success: login") {
        layer.msg('登陆成功')
        window.location.href = "http://localhost:8080/iMaster_campus_system/index.html"
    }
    if (msg == "error: account does not exist or password is incorrect") {
        layer.msg('账号不存在或密码错误')
    }
}

$(function () {

    register_unclickable()

    var signUpButton = document.getElementById('signUp')
    var signInButton = document.getElementById('signIn')
    var container = document.getElementById('dowebok')

    signUpButton.addEventListener('click', function () {
        container.classList.add('right-panel-active')
    })

    signInButton.addEventListener('click', function () {
        container.classList.remove('right-panel-active')
    })

    $("#form1").ajaxForm(function (data) {
        formcallback(data)
    });

    $("#form2").ajaxForm(function (data) {
        formcallback(data)
    });
})
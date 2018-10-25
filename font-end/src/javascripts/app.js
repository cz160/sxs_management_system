// 引入样式
import '../stylesheets/app.scss'

// 引入路由
import router from './router'
import router_two from './router/header'
//引入内容字符串（通过string-loader后 可直接将html页面转换为字符串引入js中）
import body_template  from './views/body.html'
// 渲染整体内容结构
$('#wrapper').html(body_template)
// 启动路由
router.init()
router_two.init()
//根据登录的用户显示正确的用户信息信息
var storage=window.localStorage;
let current_user = JSON.parse(storage.getItem("userInfo"));
//动态渲染用户名
$('.username').text(current_user.username);

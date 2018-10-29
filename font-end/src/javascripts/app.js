// 引入样式
import '../stylesheets/app.scss'
// 引入路由
import router from './router'
import router_two from './router/header'
//引入内容字符串（通过string-loader后 可直接将html页面转换为字符串引入js中）
import body_template  from './views/body.html'
import { userSigninAuth } from './util/auth'
import userinfo_contrller from './controllers/user-info'
//判断是否登录（登录后可以进入，没登录直接到登录页面）
userSigninAuth((auth)=>{
    // 渲染整体内容结构
    $('#wrapper').html(body_template)
    // 启动主体部分路由
    router.init()
    //头部路由
    router_two.init()
    //渲染用户信息
    userinfo_contrller.renderUserInfo();
},()=>{
    //没登录
     window.location.href="http://localhost:9000/system.html"
})












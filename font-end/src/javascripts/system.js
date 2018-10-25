import '../stylesheets/system.scss';
//引入登录页面
import login_template from './views/login.html';
//引入注册页面
import register_template from './views/register.html';
//引入登录控制器
import login_controller from './controllers/login'
//引入注册控制器
import register_controller from './controllers/register'
//页面主体部分
let body_template = login_template + register_template;
//渲染主页面
$('.wraper').html(body_template);
login_controller.login();
register_controller.register();

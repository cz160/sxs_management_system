// 引入样式
import '../stylesheets/app.scss'

// 引入路由
import router from './router'

//引入内容字符串（通过string-loader后 可直接将html页面转换为字符串引入js中）
import body_template  from './views/body.html'


// 渲染整体内容结构
$('#wrapper').html(body_template)


// 启动路由
router.init()
// router.navLink()

//最后webpack会自动将app.js文件引入到index.html页面中
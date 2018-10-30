//根据hash渲染页面（前端路由）
import SMERouter from 'sme-router'
//引入自定义事件工具
import bus from '../util/bus'
import home_template from '../views/home.html'
import not_found_template  from '../views/404.html'
//职位信息和新增职位的控制器
import position_controller from '../controllers/postion'
import map_controller from '../controllers/map'
var router = null

// 启动路由的方法
const _init = () => {
    router = new SMERouter('router-view')
    // 中间件会先执行
    router.use((req, res, next) => {
        _activeLink(req.route)    //根据hash值将对应的列表加上选中
    })
    //根据不同hash值渲染不同的页面
    router.route('/home', (req, res, next) => { // 当路由切换进来的时候执行
        res.render(home_template)
    })
     //新增职位信息
    router.route('/position-save',position_controller.save)
    //列表信息页面
    router.route('/position-list', position_controller.list)
    //修改职位信息页面
    router.route('/position-update',position_controller.update)
    //地图展示页面
    router.route('/map',map_controller.map);
    //错误页面
    router.route('/not-found', (req, res, next) => { // 当路由切换进来的时候执行
        res.render(not_found_template)
        _navLink('.not-found a[to]')
    })

    //初始Hash处理
    router.route('*', (req, res, next) => {
        if ( req.url === '' ) { // 刚进入项目，没有hash值，重定向到home
            res.redirect('/home')
        } else { // 如果路径匹配不到，导向404
            res.redirect('/not-found')
        }
        
    })
    //给bus绑定事件(通过发布订阅模式处理router无法再两个页面中使用的问题)
    bus.on('go',(path,body={})=>{
        router.go(path,body);
    })
    bus.on('back',()=>{
        router.go();
    })
    // 给按钮添加事件
    _navLink()
}

// 给导航按钮添加点击事件
const _navLink = (selector) => {
    let $navs = $(selector || '.sidebar-menu li[to]')
    $navs.on('click', function () {
        let _path = $(this).attr('to')
        router.go(_path);
        _activeLink(_path);
    })
}

// 给导航按钮添加不同的类名
// @param route 当前路由的hash值
const _activeLink = (route) => {
    //取出所有li的to属性的值
    let $navs = $('.sidebar-menu li[to]')
    //将当前路由对应的加上选中
    $navs.filter(`[to='${route}']`).addClass('active').siblings().removeClass('active')
}
export default {
    init: _init,
    navLink: _navLink
}

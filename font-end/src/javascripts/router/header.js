//根据hash渲染页面（前端路由）
import SMERouter from 'sme-router'
//引入头部页面
import head_template from '../views/header.html';
var router = null
// 启动路由的方法
const _init = () => {
    router = new SMERouter('router-head');
    router.route('/home',(req,res,next)=>{
        let user = JSON.parse(window.localStorage.getItem('userInfo')).username;
        let html = template.render(head_template,{
            msg1:'首页',
            msg2:`欢迎${user}来到实习僧后台管理系统...`
        })
        res.render(html);
    })
    //根据hash值渲染页面
    router.route('/position-save',(req,res,next)=>{
        let html = template.render(head_template,{
            msg1:'添加职位页面',
            msg2:'快来添加数据吧！！！'
        })
        res.render(html);
    })
    router.route('/position-list',(req,res,next)=>{
        let html = template.render(head_template,{
            msg1:'职位列表页面',
            msg2:'快来看看有哪些美妙的职位吧'
        })
        res.render(html);
    })
}
export default{
    init:_init
}
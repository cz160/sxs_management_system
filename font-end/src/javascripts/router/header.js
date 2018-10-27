//根据hash渲染页面（前端路由）
import SMERouter from 'sme-router'
//引入头部页面
import head_template from '../views/header.html';
import head_model from '../models/head';
var router = null;
// 记录上一次路由跳转的url
var prevUrl = ''
// 启动路由的方法
const _init = () => {
    router = new SMERouter('router-head');
    router.route('/home',(req,res,next)=>{
        let html = template.render(head_template,head_model.pageHeaderInfo(req.url,prevUrl))
        prevUrl = req.url
        res.render(html);
    })
    //根据hash值渲染页面
    router.route('/position-save',(req,res,next)=>{
        let html = template.render(head_template,head_model.pageHeaderInfo(req.url,prevUrl))
        prevUrl = req.url
        res.render(html);
    })
    router.route('/position-list',(req,res,next)=>{
        let html = template.render(head_template,head_model.pageHeaderInfo(req.url,prevUrl))
        prevUrl = req.url
        res.render(html);
    })
    router.route('/position-update',(req,res,next)=>{
        let html = template.render(head_template,head_model.pageHeaderInfo(req.url,prevUrl))
        prevUrl = req.url
        res.render(html);
    })
}
export default{
    init:_init
}
var express = require('express');

var router = express.Router();

var user_controller = require('../controllers/user');

//处理响应头的格式
var { resApplicationJson } = require('../middlewares')
 router.use(resApplicationJson);
 //获得用户的信息
 router.get('/info',user_controller.getUserInfo);
 //退出
 router.get('/exit', user_controller.exit);
 //登录状态
 router.get('/issignin', user_controller.isSignIn);

 module.exports= router;
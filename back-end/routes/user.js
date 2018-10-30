var express = require('express');

var router = express.Router();

var user_controller = require('../controllers/user');
//判断是否登录的中间件并将解密的token信息放入到req中
var auth = require('../middlewares/auth')
//处理响应头的格式
var { resApplicationJson } = require('../middlewares')
 router.use(resApplicationJson);
 //获得用户的信息
 router.get('/info',auth.userSigninAuth,user_controller.getUserInfo);
 //判断登录状态
 router.get('/issignin',auth.userSigninAuth,user_controller.isSignIn);
//获得所有的用户信息
router.get('/all',user_controller.getAlluser)
 module.exports= router;

let express = require('express');
//利用express.Router来创建路由中间件
let router = express.Router();
let user_controller = require('../controllers/user_controller')
//注册请求
router.post('/signup',user_controller.signup);
//登录请求
router.post('/signin',user_controller.signin);
module.exports = router

let express = require('express');
//利用express.Router来创建路由中间件
let router = express.Router();
let admin_controller = require('../controllers/admin')
//处理注册请求
router.post('/signup',admin_controller.signup);
//处理登录请求
router.post('/signin',admin_controller.signin);
module.exports = router
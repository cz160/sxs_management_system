
let express = require('express');
//利用express.Router来创建路由中间件
let router = express.Router();
let user_controller = require('../controllers/user_controller')
router.post('/save',user_controller.save);
router.post('/find',user_controller.find);
module.exports = router
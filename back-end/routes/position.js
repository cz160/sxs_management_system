let express = require('express');
//利用express.Router来创建路由中间件
let router = express.Router();
//中间件处理文件上传
let fileUpload = require('../middlewares/fileUpload')
let controll_position = require('../controllers/position');
router.get('/listall',controll_position.listall)
router.get('/list',controll_position.list)
router.post('/save',fileUpload,controll_position.save)
router.get('/remove',controll_position.remove)
router.get('/listone',controll_position.listone)
router.post('/update',fileUpload,controll_position.update)

module.exports = router;
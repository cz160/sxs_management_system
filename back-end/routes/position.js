let express = require('express');

let router = express.Router();

let controll_position = require('../controllers/position');

router.get('/list',controll_position.list)
router.post('/save',controll_position.save)
//删除路由
router.get('/remove',controll_position.remove)

module.exports = router;
let express = require('express');

let router = express.Router();

let controll_position = require('../controllers/position');
router.get('/list',controll_position.list)
router.post('/save',controll_position.save)
router.get('/remove',controll_position.remove)
router.get('/listone',controll_position.listone)
router.post('/update', controll_position.update)

module.exports = router;
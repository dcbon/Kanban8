const express = require('express')
const router = express.Router()
const taskCtrl = require('../controllers/taskCtrl')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)

router.post('/', taskCtrl.create)
router.get('/', taskCtrl.read)
router.put('/:id', authorization, taskCtrl.update)
router.delete('/:id', authorization, taskCtrl.delete)


module.exports = router
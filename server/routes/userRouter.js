const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userCtrl')


router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.post('/googlelogin', userCtrl.glogin)


module.exports = router
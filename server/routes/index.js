const router = require('express').Router()
const taskRouter = require('./taskRouter')
const userRouter = require('./userRouter')


router.get('/', (req,res) => res.status(200).json({msg: 'connected'}))
router.use('/tasks', taskRouter)
router.use('/users', userRouter)


module.exports = router
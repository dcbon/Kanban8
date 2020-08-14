const { Task } = require('../models')

async function authorization(req, res, next) {
  try {
    let id = req.params.id
    const task = await Task.findByPk(id)
    if (!task) throw { msg: 'Task not found', status: 404 }
    else if (req.userData.id == task.UserId) next()
    else throw { msg: 'Unauthorized Access', status: 401 }
  }
  catch(err) {
    console.log(err, '>>>>>>>> author');
    next(err)
  }
}

module.exports = authorization
const { Task } = require('../models')

class TaskCtrl {
  static async create(req,res, next) {
    try {
      let UserId = req.userData.id
      let { title, description, category } = req.body
      const data = await Task.create({
        title, 
        description, 
        category,
        UserId
      })
      res.status(201).json({ task: data })
    } catch(err) {
      next(err)
    }
  }

  static async read(req,res, next) {
    try {
      const data = await Task.findAll({
        where: { 
          UserId: req.userData.id 
        }
      })
      res.status(200).json({ tasks: data })
    } catch(err) {
      next(err)
    }
  }

  static async update(req,res, next) {
    try {
      let { title, description, category } = req.body
      const data = await Task.update({
        title, 
        description, 
        category
      }, {
        where: { id: req.params.id }, 
        returning: true
      })
      res.status(200).json({ task: data })
    } catch(err) {
      next(err)
    }
  }
  
  static async delete(req,res, next) {
    try {
      const data = await Task.destroy({
        where: { id: req.params.id }
      })
      res.status(200).json({ task: data })
    } catch(err) {
      next(err)
    }
  }
}

module.exports = TaskCtrl
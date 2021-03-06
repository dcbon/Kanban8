'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User)
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty'
        },
        notNull: {
          msg: 'Title is required'
        }
      }
    },
    description: DataTypes.STRING(1234),
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Category cannot be empty'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate: (task, opt) => {
        if (!task.description) task.description = 'No Description'
        if (!task.category) task.category = 'Backlog'
      }
    },
    modelName: 'Task',
  });
  return Task;
};
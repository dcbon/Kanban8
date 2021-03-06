'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        },
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        },
        notNull: {
          msg: 'Please enter your email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 12],
          msg: 'Password must be 6 to 12 characters'
        },
        notNull: {
          msg: 'Please enter your password'
        }
      }
    },
    organization: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, opt) => {
        if (!user.organization) user.organization = 'Hacktiv8'
        user.password = hashPass(user.password)
      }
    },
    modelName: 'User',
  });
  return User;
};
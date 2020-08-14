const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')


class UserCtrl {
  static async register(req, res, next) {
    try {
      let {email, password} = req.body
      const data = await User.create({
        email,
        password
      })
      res.status(201).json({ user: data})
    } catch(err) {
      console.log(err, '>>>>>>>>register user');
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body
      const user = await User.findOne({
        where: {
          email
        }
      })

      if (!user) throw { msg: 'Invalid email or password'}
      let comparedPass = comparePass(password, user.password)
      if (!comparedPass) throw { msg: 'Invalid email or password', status: 401}
      let payload = {
        id: user.id,
        email: user.email,
      }
      let token = generateToken(payload)
      res.status(200).json({ token })
    } catch(err) {
      console.log(err, '>>>>>>>>login user');
      next(err)
    }
  }

  static glogin(req, res, next) {
    let { id_token } = req.body
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let email = null

    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        const payload = ticket.getPayload()
        email = payload.email
        return User.findOne({
          where: {
            email: payload.email
          }
        })
      })
      .then(user => {
        if (user) return user
        else {
          return User.create({
            email: email,
            password: 'password'
          })
        }
      })
      .then (data => {
        // console.log(data, '+++++++++data create');
        let payload = {
          id: data.dataValues.id,
          email: data.dataValues.email
        }
        // console.log(payload, '+++++++data payload create glogin');
        const token = generateToken(payload)
        res.status(200).json({ token: token })
      })
      .catch(err => {
        console.log(err, '>>>>>>>>login google user');
        next(err)
      })
  }
}

module.exports = UserCtrl
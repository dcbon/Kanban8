function errHandler(err, req, res, next) {
  let msg = []
  let statusCode = 500

  switch (err.name) {
    case 'SequelizeValidationError':
      err.errors.forEach(element => {
        msg.push(element.message)
      });
      statusCode = 400
      break;
    case 'SequelizeDatabaseError':
      // console.log(err);
      err.errors.forEach(element => {
        msg.push(element.message)
      });
      statusCode = 400
      break;
    case 'SequelizeUniqueConstraintError':
      // console.log(err);
      err.errors.forEach(element => {
        msg.push(element.message)
      });
      statusCode = 400
      break;
    case 'JsonWebTokenError':
      msg.push(`Unauthorized access`)
      statusCode = 401
      break;
    default:
      msg.push(err.msg)
      statusCode = err.status || statusCode
      break;
  }

  res.status(statusCode).json({ msg: msg})
}

module.exports = errHandler
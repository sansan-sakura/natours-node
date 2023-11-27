const AppError = require('../utils/appError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    staus: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      staus: err.status,
      message: err.message
    });
  } else {
    console.error('Error 💥', err);
    res.status(500).json({
      staus: 'error',
      message: 'Something went very wrong'
    });
  }
};

const hanldleJWTError = () =>
  new AppError('Invalid token, Please login again', 401);

const handleJWTExpired = () =>
  new AppError('Your token is expired. Please log in agin', 401);

const handleCastraErrorDB = err => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: , ${value} please use another v alue`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.value(err.errors).map(el => el.message);
  const message = `Invalid input data.  ${errors.join('. ')}`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_DEV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_DEV === 'production') {
    let error = { ...err };

    if (error.name === 'CastError') error = handleCastraErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = hanldleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpired();

    sendErrorProd(error, res);
  }
};

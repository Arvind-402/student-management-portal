const errorHandler = (err, req, res, next) => {
  // Log full error stack for debugging
  console.error(err.stack);

  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }

  // Handle Mongoose Duplicate Key Error (e.g. unique field constraint violation)
  if (err.code === 11000) {
    statusCode = 400;
    const key = Object.keys(err.keyValue)[0];
    message = `${key.charAt(0).toUpperCase() + key.slice(1)} must be unique`;
  }

  // Handle Mongoose Bad ObjectId Format
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Resource not found: Invalid ID structure';
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};

module.exports = errorHandler;

// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err); // optional: for debugging/logging
  
    // Duplicate key error (MongoDB)
    if (err.code === 11000) {
      const duplicatedField = Object.keys(err.keyValue)[0];
      return res.status(400).json({
        status: false,
        message: `${duplicatedField} already exists.`,
      });
    }
  
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        status: false,
        message: messages.join(', '),
      });
    }
  
    // CastError: e.g., invalid MongoDB ObjectId
    if (err.name === 'CastError') {
      return res.status(400).json({
        status: false,
        message: `Invalid ${err.path}: ${err.value}`,
      });
    }
  
    // Default fallback
    return res.status(err.statusCode || 500).json({
      status: false,
      message: err.message || 'Internal Server Error',
    });
  };
  
  module.exports = errorHandler;
  
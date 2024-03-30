const { errorResponse } = require("./response");

const errorHandler = (err, req, res, next) => {
    console.error(err.message); // Log the error
    let message = err.message || "Internal Server Error";
    let statusCode = err.statusCode || 500;
    res.status(statusCode) 
    errorResponse(res,statusCode,message) 
  };
  
  module.exports = errorHandler;
  
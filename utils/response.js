const errorResponse = (res, statusCode, message) => {
    return res.status((statusCode || 500)).json({ success: false, message:( message || "Something Went Wrong") });
  };
  
const successResponse = (res, statusCode, data,message = "success") => {
    return res.status(statusCode).json({ success: true, data: data ,message:message });
  };

  module.exports = { errorResponse, successResponse };  
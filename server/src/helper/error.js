/**
 * Implements Error
 * @param {Number} statusCode
 * @param {String} message
 */
export class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

/**
 * Handle error
 * @param {ErrorHandler} err
 * @param {Response} res
 */
export const handleError = (err, res) => {
  try {
    // Handle database error
    if (err.name === "MongoError") {
      const { message } = err;
      // handle error fields (require, validate, unique)
      if (err.code === 11000) {
        return res.status(409).json({ statusCode: 409, message }); // Conflict
      } else {
        return res.status(503).json({ statusCode: 503, message }); // Service Unavailable
      }
    } else {
      // Normal error
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({
        statusCode,
        message: err.message
      });
    }
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error });
  }
};

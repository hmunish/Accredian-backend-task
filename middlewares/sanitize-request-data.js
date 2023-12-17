const sanitizeData = require('../utilities/sanitize-data');

const sanitizeRequestData = (req, res, next) => {
  try {
    // Sanitizing request body to avoid security threats
    const sanitizedBody = {};
    Object.entries(req.body).forEach(([key, value]) => {
      const sanitizedKey = sanitizeData(key);
      const sanitizedValue = sanitizeData(value);
      sanitizedBody[sanitizedKey] = sanitizedValue;
    });
    req.body = sanitizedBody;

    // Sanitizing request query to avoid security threats
    const sanitizedQuery = {};
    Object.entries(req.query).forEach(([key, value]) => {
      const sanitizedKey = sanitizeData(key);
      const sanitizedValue = sanitizeData(value);
      sanitizedQuery[sanitizedKey] = sanitizedValue;
    });
    req.query = sanitizedQuery;

    // Sanitizing JWT authorization token if exist to avoid security threats
    if (req.headers.authorization) {
      req.headers.authorization = sanitizeData(req.headers.authorization);
    }

    next();
  } catch (err) {
    res.status(400).send({ message: 'Invalid inputs sent' });
  }
};

module.exports = sanitizeRequestData;

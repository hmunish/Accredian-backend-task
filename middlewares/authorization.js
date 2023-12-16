const User = require('../models/users');
const { decodeJWT } = require('../utilities/jwt-helper');

exports.authorization = async (req, res, next) => {
  try {
    // If no authorization header present return with 401 unauthorized response
    if (!req.headers.authorization) {
      return res.status(401).send({ message: 'User not authorized' });
    }
    const decoded = decodeJWT(req.headers.authorization);

    // Finding if requested user exist
    const user = await User.findByPk(decoded.id, {
      attributes: {
        exclude: ['password'],
      },
    });

    // If user does not exist return with 401 unauthorized response
    if (!user) res.status(401).send({ message: 'User not authorized' });

    // If user exist attach user with current request & call next middleware in the route
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).send({ message: 'User not authorized' });
  }
};

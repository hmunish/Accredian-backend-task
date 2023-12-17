const JWT = require('jsonwebtoken');

exports.getJWT = (id) => JWT.sign({ id }, process.env.JWTSECRETKEY);
exports.decodeJWT = (token) => JWT.verify(token, process.env.JWTSECRETKEY);

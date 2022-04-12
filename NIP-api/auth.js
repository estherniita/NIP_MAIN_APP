const jwt = require("jsonwebtoken");
const jwtSecret = 'ed5bb7357c326ad301c8d6d44cc74822d22f3ed515d3c43c385a2a2f24e11a2b287cca';

const env = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, jwtSecret, env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
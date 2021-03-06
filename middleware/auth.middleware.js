const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'no authentication' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = decoded.userId;
    next();
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};

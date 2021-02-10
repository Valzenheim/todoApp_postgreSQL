const Router = require('express');
const router = new Router();

router.post('/register', (req, res) => {
  res.status(200).json({ message: 'register done' });
});

module.exports = router;

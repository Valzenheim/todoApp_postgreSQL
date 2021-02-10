const Router = require('express');
const router = new Router();

router.post('/login', (req, res) => {
  res.status(200).json({ message: 'login done' });
});

module.exports = router;

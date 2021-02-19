const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const { User } = require('../../models/user');
const router = Router();

router.post(
  '/login',
  [
    check('name', 'Wrong login. Please, try again.').isLength({ min: 3 }),
    check('password', 'Wrong password. Please try again.').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const userData = req.body;
      console.log('@@@@@@@ userData:', userData.password);

      if (!errors.isEmpty()) {
        res.status(400).json({
          message: errors.array()[0].msg,
        });
      }

      let user = await User.findOne({ where: { name: userData.name } });
      console.log('@@@@@@@ user:', user);

      if (!user) {
        return res
          .status(400)
          .json({ message: 'Wrong user login. Please try again.' });
      }

      if (userData.password !== user.password) {
        return res
          .status(400)
          .json({ message: 'Wrong password. Please try again.' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(200).json({
        token,
        userId: user.id,
        userName: user.name,
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

module.exports = router;

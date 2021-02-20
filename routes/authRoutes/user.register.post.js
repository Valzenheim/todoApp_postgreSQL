const Router = require('express');
const { check, validationResult } = require('express-validator');
const { User } = require('../../models/user');
const jwt = require('jsonwebtoken');
const router = new Router();

router.post(
  '/register',
  [
    check('name', 'Login must be longer, than 3 characters').isLength({
      min: 3,
    }),
    check('password', 'password must be longer than 6 characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const userData = req.body;

      if (!errors.isEmpty()) {
        res.status(400).json({
          message: errors.array()[0].msg,
        });
      }

      let oldUser = await User.findOne({ where: { name: userData.name } });

      if (oldUser) {
        return res.status(400).json({ message: `This user already exists` });
      }

      const user = await User.create(userData);

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

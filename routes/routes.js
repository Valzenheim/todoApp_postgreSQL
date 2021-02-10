const Router = require('express');
const router = new Router();
const loginRouter = require('./authRoutes/user.login.post');
const regRouter = require('./authRoutes/user.register.post');

router.use('/user', loginRouter);
router.use('/user', regRouter);

module.exports = router;

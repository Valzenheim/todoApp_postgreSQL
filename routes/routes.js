const Router = require('express');
const router = new Router();
const loginRouter = require('./authRoutes/user.login.post');
const regRouter = require('./authRoutes/user.register.post');
const createTask = require('./tasksRoutes/task.create.post');

router.use('/user', loginRouter);
router.use('/user', regRouter);
router.use('/list', createTask);

module.exports = router;

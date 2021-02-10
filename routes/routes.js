const Router = require('express');
const router = new Router();
const loginRouter = require('./authRoutes/user.login.post');
const regRouter = require('./authRoutes/user.register.post');
const createTask = require('./tasksRoutes/task.post');
const removeTask = require('./tasksRoutes/task.delete');
const getList = require('./tasksRoutes/task.get');

router.use('/user', loginRouter);
router.use('/user', regRouter);
router.use('/list', createTask);
router.use('/list', removeTask);
router.use('/list', getList);

module.exports = router;

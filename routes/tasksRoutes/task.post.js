const Router = require('express');
const router = new Router();
const { Task } = require('../../models/task');
const auth = require('../../middleware/auth.middleware');

router.post('/task', auth, async (req, res) => {
  try {
    const taskData = req.body;
    taskData.ownerId = res.locals.user;

    if (!taskData.taskName || !taskData.ownerId) {
      throw new Error('wrong task data');
    }

    await Task.create(taskData);

    return res.status(200).json();
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;

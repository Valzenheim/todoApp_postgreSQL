const Router = require('express');
const router = new Router();
const { Task } = require('../../models/task');

router.post('/', async (req, res) => {
  try {
    const taskData = req.body;

    // if (!taskData.taskName || !taskData.done || !taskData.ownerId) {
    //   throw new Error('wrong task data');
    // }

    const task = await Task.create(taskData);

    return res.status(200).json(task);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;

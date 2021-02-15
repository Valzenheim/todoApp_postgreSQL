const Router = require('express');
const router = new Router();
const { Task } = require('../../models/task');

router.get('/list', async (req, res) => {
  try {
    console.log('@@@@@@@ ownerId:', req.query);

    const { userId } = req.query;
    const { filter } = req.query;
    const { chrono } = req.query;

    if (!filter) filter = 'all';
    if (!chrono) chrono = 'true';

    if (filter === 'all') {
      const task = await Task.findAll({ where: { ownerId: userId } });
    }

    return res.status(200).json(task);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;

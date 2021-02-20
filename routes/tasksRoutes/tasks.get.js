const Router = require('express');
const router = new Router();
const { Task } = require('../../models/task');
const auth = require('../../middleware/auth.middleware');

router.get('/list/', auth, async (req, res) => {
  try {
    const userId = req.local.userId;
    const chrono = req.query.chrono;
    const filter = req.query.filter;

    let searchParams = {
      ownerId: userId,
    };

    filter !== undefined && filter !== 'all'
      ? (searchParams.done = filter === 'done' ? true : false)
      : searchParams;

    const tasks = await Task.findAll({
      where: searchParams,
      order: chrono === 'false' ? [['createdAt', 'DESC']] : [['createdAt']],
    });

    return res.status(200).json(tasks);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;

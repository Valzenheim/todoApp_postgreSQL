const Router = require('express');
const router = new Router();
const { Task } = require('../../models/task');
const auth = require('../../middleware/auth.middleware');

router.get('/list/', auth, async (req, res) => {
  try {
    const userId = res.locals.user;
    const chrono = req.query.chrono;
    const filter = req.query.filter;
    const count = req.query.count;
    const page = req.query.page;

    let searchParams = {
      ownerId: userId,
    };

    filter !== undefined && filter !== 'all'
      ? (searchParams.done = filter === 'done' ? true : false)
      : searchParams;

    const tasks = await Task.findAndCountAll({
      where: searchParams,
      order: chrono === 'false' ? [['createdAt', 'DESC']] : [['createdAt']],
      offset: page * count,
      limit: count,
    });

    return res.status(200).json(tasks);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;

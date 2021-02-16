const Router = require('express');
const router = new Router();
const { Task } = require('../../models/task');

router.get('/list/', async (req, res) => {
  try {
    console.log('@@@@@@@ ownerId:', req.query.chrono);

    const userId = req.query.userId;
    let filter = req.query.filter;
    let chrono = req.query.chrono;

    !chrono ? (chrono = false) : null;
    console.log('@@@@@@@ filter:', filter);
    console.log('@@@@@@@ chrono:', chrono);
    let task = null;

    if (filter === 'all') {
      task = await Task.findAll({
        where: {
          ownerId: userId,
          done: filter !== undefined ? (!!filter ? 'true' : 'false') : null,
        },
        order: !chrono ? [['updatedAt', 'DESC']] : [['updatedAt']],
      });
    } else if (filter === 'done') {
    } else if (filter === 'active') {
    }

    return res.status(200).json(task);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;

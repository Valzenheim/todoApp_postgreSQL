const Router = require('express');
const router = new Router();
const { Task } = require('../../models/task');

router.get('/list/', async (req, res) => {
  try {
    let { userId, filter, chrono } = req.query;

    console.log('@@@@@@@ ownerId:', userId);
    console.log('@@@@@@@ filter:', filter);
    console.log('@@@@@@@ chrono:', chrono);
    const queryParams = {
      where: {
        ownerId: userId,
      },
    };

    const task = await Task.findAll({
      where: {
        ownerId: userId,
      },
      order:
        chrono !== 'undefined' && !chrono
          ? [['createdAt', 'DESC']]
          : [['createdAt']],
    });

    return res.status(200).json(task);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;

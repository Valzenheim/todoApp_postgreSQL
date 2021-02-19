const Router = require('express');
const router = new Router();
const { Task } = require('../../models/task');

router.get('/list/', async (req, res) => {
  try {
    console.log('@@@@@@@ query:', req.query);
    console.log(req.query);
    const userId = req.query.ownerId;
    const chrono = req.query.chrono;
    const filter = req.query.filter;
    console.log(userId);

    let searchParams = {
      ownerId: userId,
    };

    filter ? (searchParams.done = filter) : null;

    console.log('@@@@@@@ chrono:', chrono);

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

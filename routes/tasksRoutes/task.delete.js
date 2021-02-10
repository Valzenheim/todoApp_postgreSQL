const Router = require('express');
const router = new Router();
const { Task } = require('../../models/task');

router.delete('/', async (req, res) => {
  try {
    const { index } = req.body;
    console.log('@@@@@@@ req.body:', index);

    if (!index) {
      throw new Error('wrong index');
    }

    const task = Task.destroy({
      where: {
        id: index,
      },
    });

    return res.status(200).json(task);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;

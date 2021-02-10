const Router = require('express');
const router = new Router();
const { Task } = require('../../models/task');

router.post('/remove', async (req, res) => {
  try {
    console.log('@@@@@@@ req.body:', req.body);
    const { index } = req.body;

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

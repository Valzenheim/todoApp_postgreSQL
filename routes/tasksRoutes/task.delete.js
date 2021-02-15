const Router = require('express');
const router = new Router();
const { Task } = require('../../models/task');

router.delete('/list', async (req, res) => {
  try {
    if (!req.query) {
      throw new Error('wrong parameters');
    }

    const task = await Task.destroy({
      where: req.query,
    });

    return res.status(200).json(task);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;

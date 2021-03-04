const Router = require('express');
const router = new Router();
const { Task } = require('../../models/task');
const auth = require('../../middleware/auth.middleware');

router.delete('/task', auth, async (req, res) => {
  try {
    if (!req.query) {
      throw new Error('wrong query parameters');
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

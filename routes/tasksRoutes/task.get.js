const Router = require('express');
const router = new Router();
const { Task } = require('../../models/task');

router.get('/', async (req, res) => {
  try {
    const owner = req.body;

    if (!owner) {
      throw new Error('wrong owner');
    }

    const task = Task.findAll(owner);

    return res.status(200).json(task);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;

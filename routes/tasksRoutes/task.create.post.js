const Router = require('express');
const router = new Router();
const { Task } = require('../../models/task');

router.post('/create', async (req, res) => {
  try {
    console.log(req.body);

    const { value } = req.body;

    const task = await Task.create({ value });

    console.log(task);

    return res.status(200).json(task);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;

const Router = require('express');
const router = new Router();
const { Task } = require('../../models/task');

router.put('/', async (req, res) => {
  try {
    const { target, newValue } = req.body;

    if (!target || !newValue) {
      throw new Error('wrong data');
    }

    console.log('@@@@@@@ target, newValue:', target, newValue);

    const task = await Task.update(newValue, { where: target });
    console.log('@@@@@@@ task:', task);

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

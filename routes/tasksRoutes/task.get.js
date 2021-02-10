const Router = require('express');
const router = new Router();
const { Task } = require('../../models/task');

router.get('/', async (req, res) => {
  try {
    const ownerId = req.body;
    console.log('@@@@@@@ owner:', ownerId);

    if (!ownerId) {
      throw new Error('wrong owner');
    }

    const task = await Task.findAll({ where: ownerId });

    console.log('@@@@@@@ task:', task);

    return res.status(200).json(task);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;

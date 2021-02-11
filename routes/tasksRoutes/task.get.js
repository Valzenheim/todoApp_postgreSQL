const Router = require('express');
const router = new Router();
const { Task } = require('../../models/task');

router.get('/', async (req, res) => {
  try {
    console.log('@@@@@@@ ownerId:', req.params.id);

    const task = await Task.findAll({ where: { ownerId: req.params.id } });

    return res.status(200).json(task);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;

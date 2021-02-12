const Router = require('express');
const router = new Router();
const { Task } = require('../../models/task');

router.delete('/', async (req, res) => {
  try {
    const { deleteParams } = req.body;
    console.log('@@@@@@@ index:', deleteParams);

    if (!deleteParams) {
      throw new Error('wrong index');
    }

    const task = await Task.destroy({
      where: deleteParams,
    });

    return res.status(200).json(task);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;

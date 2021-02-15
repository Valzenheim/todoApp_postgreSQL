const Router = require('express');
const router = new Router();
const { Task } = require('../../models/task');

router.delete('/list', async (req, res) => {
  try {
    const queryParams = req.query;
    console.log(typeof queryParams.id);
    console.log(typeof queryParams.done);
    console.log('@@@111@@@@ index:', req.query);
    console.log('@@@@222@@@ index:', typeof req.query);

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

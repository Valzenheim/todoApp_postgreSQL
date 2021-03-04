const Router = require('express');
const router = new Router();
const { Task } = require('../../models/task');
const auth = require('../../middleware/auth.middleware');

router.delete('/task', auth, async (req, res) => {
  try {
    const params = req.query;
    params.ownerId = res.locals.user;

    if (!req.query) {
      throw new Error('wrong query parameters');
    }

    await Task.destroy({
      where: params,
    });

    return res.status(200).json();
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;

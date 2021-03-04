const Router = require('express');
const router = new Router();
const { Task } = require('../../models/task');
const auth = require('../../middleware/auth.middleware');

router.put('/task', auth, async (req, res) => {
  try {
    const reqObject = req.body;

    if (!reqObject.newValue) {
      throw new Error('wrong data');
    }

    await Task.update(reqObject.newValue, {
      where: { id: reqObject.id, ownerId: res.locals.user },
    });

    return res.status(200).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

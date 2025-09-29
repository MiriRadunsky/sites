const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { UserModel, validateUser, validLogin, createToken } = require('../models/userModel');
const { auth } = require('../middlewares/auth');


router.post('/', async (req, res) => {
  const validBody = validateUser(req.body);
  if (validBody.error) return res.status(400).json(validBody.error.details);

  try {
    let user = new UserModel(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    user = user.toObject();
    delete user.password;

    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ msg: 'Email already in system, try log in', code: 11000 });
    }
    console.error(err);
    res.status(500).json({ msg: 'err', err });
  }
});

router.post('/login', async (req, res) => {
  const { error } = validLogin(req.body);
  if (error) return res.status(400).json(error.details);

  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ msg: 'Password or email is wrong ,code:1' });

    const ok = await bcrypt.compare(req.body.password, user.password);
    if (!ok) return res.status(401).json({ msg: 'Password or email is wrong ,code:2' });

    const token = createToken(user._id);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'err', err });
  }
});


router.get('/myEmail', auth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.tokenData._id, { email: 1 });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'err', err });
  }
});

router.get('/myInfo', auth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.tokenData._id, { password: 0 , __v: 0 });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'err', err });
  }
});



module.exports = router;

const userModel = require('../db/models/users');
const bcrypt = require('bcrypt')
const router = require('express').Router()
const path = require('path')

router.route('/check')
  .post((req, res) => {
    if (req.session.user) {
      return res.status(200).json({ user: req.session.user })
    }
    res.sendStatus(401);
  })

router.route('/signup')
  .post(async (req, res) => {

    const { email, name, password } = req.body;
    const avatar = req.files.image;
    const uploadPath = path.join(process.env.PWD, `/public/img/${avatar.name}`);
    avatar.mv(uploadPath, async function (err) {
      if (err) {

        return res.status(500).send(err)
      }
    })

    if (email && name && password) {
      const cryptPass = await bcrypt.hash(password, Number(process.env.SALT_ROUND))
      try {
        const currentUser = await userModel.create({ ...req.body, password: cryptPass, img: `/img/${avatar.name}` })
        req.session.user = { id: currentUser._id, name: currentUser.name }
        return res.json({ user: { id: currentUser._id, name: currentUser.name } })
      } catch (err) {
        console.log(err);
        return res.sendStatus(500)
      }
    } else {
      return res.sendStatus(500)
    }
  })

router.route('/edit')
  .post(async (req, res) => {
    const { name, password, id } = req.body;
    const avatar = req.files?req.files.image:null;
    let updDoc = {}
    if (name.length) {
      updDoc.name = name
    }
    if (password.length) {
      updDoc.password = await bcrypt.hash(password, Number(process.env.SALT_ROUND))
    }
    if (avatar) {
      const uploadPath = path.join(process.env.PWD, `/public/img/${avatar.name}`);
      avatar.mv(uploadPath, async function (err) {
        if (err) {
          console.log(err);
          return res.status(500).send(err)
        }
      })
      updDoc.img = `/img/${avatar.name}`
    }
    try {
      const currentUser = await userModel.findOneAndUpdate({ _id: id }, { ...updDoc })
    } catch (err) {
      console.log(err);
      return res.sendStatus(500)
    }


  })

router.route('/signin')
  .post(async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      try {
        let currentUser = await userModel.find({ email })
        currentUser = { ...currentUser[0]['_doc'] }
        if (currentUser && await bcrypt.compare(password, currentUser.password)) {
          console.log('Success');
          req.session.user = { id: currentUser._id, name: currentUser.name }
          return res.json({ user: { id: currentUser._id, name: currentUser.name } })
        } else {
          return res.sendStatus(500)
        }
      } catch (err) {

        return res.sendStatus(500)
      }
    } else {
      return res.sendStatus(500)
    }

  })


router.route('/logout')
  .post((req, res) => {
    req.session.destroy()
    res.clearCookie('sid').sendStatus(200)
  })








module.exports = router

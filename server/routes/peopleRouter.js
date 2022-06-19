const userModel = require('../db/models/users')

const router = require('express').Router()


router.route('/')
.get(async (req, res) => {
    const accounts = await userModel.find()
    res.json(accounts)
  })



module.exports = router

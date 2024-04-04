const express = require('express')
const { createCheckOutSession } = require('./stripe.controller')
const router = express.Router()


router.post("/create-checkout-session", createCheckOutSession)

module.exports = router
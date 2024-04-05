const express = require('express')
const { createCheckOutSession, verifySession } = require('./stripe.controller')
const router = express.Router()


router.post("/create-checkout-session", createCheckOutSession)
router.post("/verify-session", verifySession)

module.exports = router
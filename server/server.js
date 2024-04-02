const express = require('express')
const cors = require('cors')
require('dotenv').config()


const userRouter = require('./resources/users/users.router')
const authRouter = require('./resources/auth/auth.router')

const stripeRouter = require('./stripe/stripe.router')

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use("/payments", stripeRouter)

app.listen(3001, () => console.log("💫🌷🎈🍾🎉 3001"))
const express = require('express')
const cookieSession = require('cookie-session')
const cors = require('cors')
require('dotenv').config()
const initStripe = require('./stripe')


const userRouter = require('./resources/users/users.router')
const authRouter = require('./resources/auth/auth.router')
const stripeRouter = require('./stripe/stripe.router')
const productsRouter = require('./resources/products/products.router')

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieSession({
    secret: "s3cr3tk3y",
    maxAge: 1000 * 60 * 60,
}))


// ändra till samma, antingen api eller inte
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use("/payments", stripeRouter)
app.use("/products", productsRouter)

app.listen(3001, () => console.log("💫🌷🎈🍾🎉 3001"))
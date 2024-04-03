const initStripe = require('../stripe');

const createCheckOutSession = async (req, res) => {

    const stripe = initStripe()
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [{
            price: "price_1P1Pwv01f7VXReymUyPYhQzL",
            quantity: 1,
        }],
        success_url: "http://localhost:5173/confirmation",
        cancel_url: "http://localhost:5173",
    })
    res.status(200).json({ url: session.url})

}

module.exports = { createCheckOutSession }
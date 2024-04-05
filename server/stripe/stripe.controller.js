const initStripe = require('../stripe');
const fs = require('fs').promises;

const createCheckOutSession = async (req, res) => {

    const stripe = initStripe()
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer: "cus_K9Z9Z9Z9Z9Z9Z9",
        line_items: [{
            price: "price_1P1Pwv01f7VXReymUyPYhQzL",
            quantity: 1,
        }],
        success_url: "http://localhost:5173/confirmation",
        cancel_url: "http://localhost:5173",
    })
    res.status(200).json({ url: session.url, sessionId: session.id})

}

const verifySession = async (req, res) => {
    const stripe = initStripe()

    console.log("nu kommer jag hit")

    const sessionId = req.body.sessionId

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === "paid") {
        const lineItems = await stripe.checkout.sessions.listLineItems(sessionId)



        const order = {
            orderNumber: Math.floor(Math.random() * 100000000),
            customerName: session.customer_details.name,
            products: lineItems.data,
            total: session.amount_total,
            date: new Date()
        }

        const orders = JSON.parse(await fs.readFile("./orders.json"))
        orders.push(order)
        await fs.writeFile("./orders.json", JSON.stringify(orders, null, 4))

        res.status(200).json( {verified: true})

    }

}

module.exports = { createCheckOutSession, verifySession }
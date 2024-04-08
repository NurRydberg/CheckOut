const initStripe = require('../stripe');
const fs = require('fs').promises;

const createCheckOutSession = async (req, res) => {
    const cart = req.body
    const stripe = initStripe()
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer: "cus_PsnobQWtfmficb",
        line_items: cart.map(item => {
            return {
                price: item.product,
                quantity: item.quantity,
            }
        }),
        success_url: "http://localhost:5173/confirmation",
        cancel_url: "http://localhost:5173",
    })
    res.status(200).json({ url: session.url, sessionId: session.id})

}

const verifySession = async (req, res) => {
    const stripe = initStripe()

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
        try {
            let orders = [];
            try {
                orders = JSON.parse(await fs.readFile("./data/orders.json"));
            } catch (error) {
                console.log("No orders found")
            }
            orders.push(order);
            await fs.writeFile("./data/orders.json", JSON.stringify(orders, null, 2));
            } catch (error) {
                console.error(error);
            }
            res.status(200).json({ verified: true });
        }

    }



module.exports = { createCheckOutSession, verifySession }
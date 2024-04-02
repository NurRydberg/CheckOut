const initStripe = require('.stripe.js');

const createCheckOutSession = async (req, res) => {

    const stripe = initStripe();
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [{
            price: "",
            quantity: 1,
        }],
        success_url: "",
        cancel_url: "",
    })

}

module.exports = { createCheckOutSession }
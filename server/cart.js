// const express = require('express');
// const app = express();
// const stripe = require('stripe')(STRIPE_KEY);
// const fs = require('fs');

// app.use(express.json());

// // Funktion för att spara ordern till en fil
// function saveOrderToFile(order) {
//   const orderData = JSON.stringify(order, null, 2); // Konvertera orderobjektet till JSON-format
//   fs.appendFileSync('order.json', orderData + '\n'); // Spara ordern till order.json-filen
// }

// // Skapa en checkout-session med Stripe
// app.post('/payments/create-checkout-session', async (req, res) => {
//   const { lineItems } = req.body;

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: lineItems,
//       mode: 'payment',
//       success_url: 'http://localhost:3000/success', // URL efter lyckad betalning
//       cancel_url: 'http://localhost:3000/cancel', // URL vid avbruten betalning
//     });

//     res.json({ id: session.id });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Verifiera sessionen och spara ordern vid lyckad betalning
// app.post('/payments/verify-session', async (req, res) => {
//   const { sessionId } = req.body;

//   try {
//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     if (session.payment_status === 'paid') {
//       saveOrderToFile(session); // Spara ordern till filen när betalningen är verifierad
//       res.json({ verified: true });
//     } else {
//       res.json({ verified: false });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(3001, () => {
//   console.log('Server is running on port 3001');
// });

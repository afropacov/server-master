// This is your test secret API key.
const stripe = require('stripe')('sk_test_51OfCIbHxzEsNocOD4UxzyCZhw7xlO4TT7fxCKfnumOHeSeGTkU85L46r1G0aPfLrWNrQ7pLA2qgTNWeIweOJGlKZ00aOa1P3Cr');
const express = require('express');
const router = express.Router();

const YOUR_DOMAIN = 'https://david-capstone-project.netlify.app';

router.post('/', async (req, res) => {

    const total = (req.body.total);

    console.log('hit!');

    const session = await stripe.checkout.sessions.create({



        payment_method_types: ['card', 'klarna', 'cashapp'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Order from GymSuplements', // Replace with your product name
                    },
                    unit_amount: total * 100, // Replace with the actual amount in cents
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success.html`,
        cancel_url: `${YOUR_DOMAIN}/cart.html`,
    });

    res.json({id: session.id});
});

module.exports = router;

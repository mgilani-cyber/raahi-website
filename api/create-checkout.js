const Stripe = require('stripe');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { quantity, email, name, phone } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: process.env.STRIPE_PRICE_ID,
      quantity: parseInt(quantity) || 1,
    }],
    mode: 'payment',
    customer_email: email,
    metadata: { name, phone },
    success_url: 'https://raahi-website-drab.vercel.app/events?success=true',
    cancel_url: 'https://raahi-website-drab.vercel.app/events',
  });

  res.json({ url: session.url });
};

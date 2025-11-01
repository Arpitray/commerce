import stripe from 'stripe';

const stripe = new stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { cartItems } = req.body;
import Stripe from "stripe";
import userModel from "../models/user.model.js";
import transactionModel from "../models/transaction.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function stripeWebhook(req, res) {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      const { transactionId, appId } = session.metadata || {};

      // Ignore events not created by this app
      if (appId !== "quickgpt") {
        return res.json({
          received: true,
          message: "Ignored event: Invalid app",
        });
      }

      const transaction = await transactionModel.findOne({
        _id: transactionId,
        isPaid: false,
      });

      if (!transaction) {
        return res.json({
          received: true,
          message: "Transaction not found or already processed",
        });
      }

      // Add credits to the user
      await userModel.updateOne(
        { _id: transaction.userId },
        {
          $inc: {
            credits: transaction.credits,
          },
        },
      );

      // Mark transaction as paid
      transaction.isPaid = true;
      await transaction.save();

      console.log(
        `Payment successful. Credits added to user ${transaction.userId}`,
      );

      break;
    }

    default:
      console.log(`Unhandled event: ${event.type}`);
  }

  res.json({ received: true });
}

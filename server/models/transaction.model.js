import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: { type: String, required: true },
    amount: { type: Number, required: true },
    credits: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const transactionModel = new mongoose.model("Transaction", transactionSchema);
export default transactionModel;

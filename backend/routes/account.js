// backend/api/index.js
const express = require("express");
const { Account } = require("../db/db");
const { authMiddleware } = require("../middleware");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  // console.log(req.userId)
  const account = await Account.findOne({
    userId: req.userId,

  });

  // console.log(account)

  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  // creating the session:-
  const session = await mongoose.startSession();

  // here start session:-
  session.startTransaction();

  const { amount, to } = req.body;
  console.log(amount,to);
  console.log(req.userId)

  // sender money account:-
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );
  console.log("sender "+amount,account?.balance)

  if (!account || account.balance < amount) {
    await session.abortTransaction(); // abort transaction:-
    return res.status(400).json({
      
      message: "Insufficient balance",
    });
  }

  
  // reciever money account:-
  const toAccount = await Account.findOne({ userId: to }).session(session);
  console.log("reciever "+toAccount.balance)

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  // Perform the transfer

  // sender account money decrement:-
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);

  // reciever account money increment:-
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);
  // Commit the transaction
  await session.commitTransaction(); // commit:-

  console.log("transferred rupees")

  res.json({
    message: "Transfer successful",
  });
});



module.exports = router;

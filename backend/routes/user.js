const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // Import bcrypt
const { User, Account } = require("../db/db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");

// Signup route
router.post("/signup", async (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  const existingUser = await User.findOne({ username: req.body.username });

  if (existingUser) {
    return res.status(411).json({ message: "Email already taken/Incorrect inputs" });
  }

  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds, you can adjust it based on your needs

  const user = await User.create({
    username: username,
    password: hashedPassword, // Save the hashed password
    firstName: firstName,
    lastName: lastName,
  });

  const userId = user._id;

  // Create a new account for the user
  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.json({
    message: "User created successfully",
    token: token,
  });
});

// Signin route
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(411).json({ message: "Error while logging in" });
  }

  // Compare the provided password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    return res.json({ token: token });
  } else {
    return res.status(411).json({ message: "Error while logging in" });
  }
});

// Get the current logged-in user
router.get("/getCurrentUser", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});






















// Backend Route to fetch users excluding the current user
router.post("/bulk", async (req, res) => {
  const { filter, currentUserId } = req.body;
  console.log("filter"+filter)
  console.log("currentUserId"+currentUserId)

  try {
    
   
  // Fetch users, excluding the current user by their ID
    const users = await User.find({
      _id: { $ne: currentUserId }, // Exclude current user
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
    });

    // Respond with the filtered users
    res.json({
      users: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

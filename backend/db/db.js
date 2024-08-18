const mongoose = require("mongoose");


mongoose
  .connect("mongodb+srv://jharishu2003:NQAy4CZTbzRfvNmf@cluster0.9piyr.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });


// Create a Schema for Users
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    
    
  },
  password: {
    type: String,
    
    
  },
  firstName: {
    type: String,
    
    
  },
  lastName: {
    type: String,
    
    
  },
});

// Create a model from the schema
const User = mongoose.model("User", userSchema);

const accountSchema = new mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: 'User',
      required: true
  },
  balance: {
      type: Number,
      required: true
  }
});

const Account = mongoose.model('Account', accountSchema);


module.exports = {
  User,
  Account,
};

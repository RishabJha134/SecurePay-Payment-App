require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// routing:-
const mainRouter = require("./routes/index");

app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});

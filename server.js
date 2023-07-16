require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./app/views"));
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./app/routes"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const flash = require("connect-flash");
const session = require("express-session");
const { flashMessage } = require("./app/middlewares/FlashMessage");

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./app/views"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash()); // flash messages

app.use(flashMessage);

app.use("/", require("./app/routes"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

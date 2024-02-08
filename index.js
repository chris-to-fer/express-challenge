import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { json } from "express";
import { log } from "console";

// import bodyParser from "body-parser";
//import { body } from "express-validator";

//const { body, validationResult } = require("express-validator");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);

// Reads the PORT value from the environment variable `PORT`.
// If not found, uses the default value of 3000.
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.static("public"));

// app.use(express.static(__dirname + "/public"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/", function (req, res) {
  console.log("serving index.html...");
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/echo/:message", function (req, res) {
  const echo = req.params.message;
  echo === "secret" ? res.send("the secret is... 42!") : res.send(`${echo}`);
});

app.get("/login", function (req, res) {
  console.log("serving login.html...");
  res.sendFile(path.join(__dirname, "/login.html"));
  //req.success === true ? res.redirect("/my-account") : res.redirect("/error");
});

app.post("/login", (req, res) => {
  console.log("body", req.body);

  req.body.email === "user@email.com" && req.body.password === "very-secret"
    ? res.json({ success: true })
    : res.json({ success: false });
});

app.get("/error", function (req, res) {
  console.log("serving error.html...");
  res.sendFile(path.join(__dirname, "/error.html"));
});

app.get("/my-account", function (req, res) {
  console.log("serving error.html...");
  res.sendFile(path.join(__dirname, "/my-account.html"));
});

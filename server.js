const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.static("public"));
const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.use("/api/stripe-webhooks", require("./routes/stripe-webhooks"));

app.use(express.json());

app.use("/api/stripe", require("./routes/stripe"));

app.use("/api/auth", require("./routes/auth"));

app.use("/api/user", require("./routes/project"));

app.use("/api/profile", require("./routes/user"));

const PORT = 8000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
}

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

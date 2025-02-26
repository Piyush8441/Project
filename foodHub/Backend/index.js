const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const mongoDB = require("./db");
mongoDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome To The Backend");
});

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/LoginUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OderData"));
app.listen(port, () => {
  console.log(`Backend Is started On ${port}`);
});

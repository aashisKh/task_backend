const express = require("express");
const router = require("./router");
const cors = require("cors");
const { connectDB } = require("./database");
const app = express();
let port = 4000;
connectDB();
app.use(
  cors({
    allowedHeaders: "*",
  })
);
app.use(express.json());

app.use("/task", router);

app.listen(port, () => {
  console.log("Server is running on PORT " + port);
});

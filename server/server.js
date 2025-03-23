const express = require("express");
const cors = require("cors");
const blogRouter = require("./route/blog-route");

require("./db");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter)

app.use("/api", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

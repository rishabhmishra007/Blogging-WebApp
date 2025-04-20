const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(
    "process.env.MONGO_URI"
  )
  .then(() => console.log("Connected mongo db"))
  .catch((err) => console.log(err));

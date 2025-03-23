const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(
    "mongodb+srv://rishabh23:XiWzx4KZta9A6mCl@cluster0.kclym.mongodb.net/"
  )
  .then(() => console.log("Connected mongo db"))
  .catch((err) => console.log(err));

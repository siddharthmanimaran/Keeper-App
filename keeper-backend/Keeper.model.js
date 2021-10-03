const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Keeper = new Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Keeper", Keeper);

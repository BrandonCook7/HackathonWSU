const { model, Schema } = require("mongoose");

const tagSchema = new Schema({
  category: { type: String, unique: true },
  icon:  { type: String },
  color: { type: Array },
});

module.exports = model("tag", tagSchema);
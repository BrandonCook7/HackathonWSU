const { model, Schema } = require("mongoose");

const tagSchema = new Schema({
  category: { type: String, unique: true },
  icon:  { type: String },
  color: { type: String },
});

module.exports = model("tag", tagSchema);
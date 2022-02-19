const { model, Schema } = require("mongoose");

const eventSchema = new Schema({
  //tags: { type: String, default: null },
  //email: { type: String, unique: true },
  //password: { type: String },
  //token: { type: String }
});

module.exports = model("event", eventSchema);
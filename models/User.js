const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  reputation: { type: Number, default: 0}
});

module.exports = model("user", userSchema);
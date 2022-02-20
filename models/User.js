const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  reputation: { type: Number, default: 0},
  short_description: {type: String, default: ""},
  interests: { type: [String], default: [] }
});

module.exports = model("user", userSchema);
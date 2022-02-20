const { model, Schema } = require("mongoose");
const User = require('./User');
const Tag = require('./Tag');

const eventSchema = new Schema({
  host: { type: String }, //Host User
  // created: { type: Date, default: Date.now },
  start: { type: String },
  name: { type: String, unique: true },
  description: { type: String },
  requirements: { type: Number },
  location: { type: String }, //Google API String Location
  tags: { type: [String] },
  joined: { type: [String] },
  slots: { type: Number }
});

module.exports = model("event", eventSchema);
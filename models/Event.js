const { model, Schema } = require("mongoose");
const User = require('./User');
const Tag = require('./Tag');

const eventSchema = new Schema({
  host: { type: User.schema }, //Host User
  created: { type: Date, default: Date.now },
  start: { type: Date },
  name: { type: String },
  description: { type: String },
  requirements: { type: [String], default: null },
  location: { type: String }, //Google API String Location
  tags: { type: [Tag.schema], default: null },
  joined: { type: [User.schema], default: null },
  slots: { type: Number }
});

module.exports = model("event", eventSchema);
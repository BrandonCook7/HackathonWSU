const { model, Schema } = require("mongoose");
const User = require('./User');
const Tag = require('./Tag');
const { v4: uuidv4 } = require('uuid');

const eventSchema = new Schema({
  host: { type: String }, //Host User
  created: { type: Date, default: Date.now },
  start: { type: Date },
  name: { type: String },
  description: { type: String },
  requirements: { type: Number, default: null },
  location: { type: String }, //Google API String Location
  tags: { type: [String], default: null },
  joined: { type: [String], default: null },
  slots: { type: Number },
  uuid: {type: String, default: uuidv4(), unique: true}
});

module.exports = model("event", eventSchema);
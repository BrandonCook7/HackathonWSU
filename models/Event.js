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
  requirements: { type: Number, default: 0 },
  location: { type: String }, //Google API String Location
  tags: { type: [String], default: [] },
  joined: { type: [String], default: [] },
  slots: { type: Number },
  eventHasHappened: { type: Boolean, default: false},
  uuid: {type: String, default: uuidv4(), unique: true}
});

module.exports = model("event", eventSchema);
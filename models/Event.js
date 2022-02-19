const { model, Schema } = require("mongoose");
const User = require('./User');
const Requirement = require('./Requirement');
const Tag = require('./Tag');

const eventSchema = new Schema({
  host: { type: User }, //Host User
  created: { type: Date, default: Date.now },
  start: { type: Date },
  name: { type: String },
  description: { type: String },
  requirements: { type: [Requirement], default: null },
  location: { type: String }, //Google API String Location
  tags: { type: [Tag], default: null },
});

module.exports = model("event", eventSchema);
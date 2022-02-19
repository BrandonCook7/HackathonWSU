const { model, Schema } = require("mongoose");
const User = require('../../models/User');
const Requirement = require('../../models/Requirement');
const Tag = require('../../models/Tag');

const eventSchema = new Schema({
  id:  { type: Number, unique: true }, //UID
  host: { type: User }, //Host User
  created: { type: Date }, //Date.now() in Mutation
  start: { type: Date }, //Event start time
  name: { type: String },
  description: { type: String },
  requirements: { type: [Requirement], default: null },
  location: { type: String }, //Google API String Location
  tags: { type: [Tag], default: null },
});

module.exports = model("event", eventSchema);
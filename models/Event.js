const { model, Schema } = require("mongoose");

const eventSchema = new Schema({
  id:  { type: Number, unique: true }, //UID
  host: { type: String, unique: true }, //Host Email
  name: { type: String },
  description: { type: String },
  requirements: { type: Array, default: null }, //Requirement Type
  location: { type: String }, //Google API String Location
  tags: { type: Array, default: null }, //Tag Type
});

module.exports = model("event", eventSchema);
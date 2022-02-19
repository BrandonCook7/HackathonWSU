const { model, Schema } = require("mongoose");

const eventSchema = new Schema({
  eventId:  { type: Number, unique: true }, //UID
  eventHost: { type: String, unique: true }, //Host Email
  eventName: { type: String },
  eventDescription: { type: String },
  requirements: { type: Array, default: null }, //Requirement Type
  location: { type: String }, //Google API String Location
  tags: { type: Array, default: null }, //Tag Type
});

module.exports = model("event", eventSchema);
const { model, Schema } = require("mongoose");

const eventSchema = new Schema({
  eventName: { type: String },
  eventId:  { type: Number, unique: true },
  tags: { type: Array, default: null },
  reqs: { type: Array, default: null }
});

module.exports = model("tag", tagSchema);
const { model, Schema } = require("mongoose");

const requirementSchema = new Schema({
  operation: { type: String }, //Has, Greater Than, Less Than, Etc.
  attribute: { type: String }, //Reputation, Might Expand Later
  value: { type: String }, //Value of Attribute
});

module.exports = model("requirment", requirementSchema);
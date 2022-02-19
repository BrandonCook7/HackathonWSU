const { model, Schema } = require("mongoose");

const requirementSchema = new Schema({
  operation: { type: String},
  attribute: { type: String },
  value: { type: String }
});

module.exports = model("requirment", requirmentSchema);
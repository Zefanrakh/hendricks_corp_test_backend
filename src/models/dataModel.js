const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  created_at: { type: Date, required: true },
  value: { type: Number, required: true },
});

module.exports = mongoose.model("Data", dataSchema);

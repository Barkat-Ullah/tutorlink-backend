const mongoose = require("mongoose");

const divisionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  bn_name: { type: String, required: true },
  lat: { type: String, required: true },
  long: { type: String, required: true },
});

export const Division = mongoose.model("Division", divisionSchema);



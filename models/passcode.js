const mongoose = require("mongoose");

const PasscodeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  code: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Passcode", PasscodeSchema);

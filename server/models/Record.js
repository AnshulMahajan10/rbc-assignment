const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Record = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  originationTime: { type: Number, required: true },
  clusterId: { type: String, required: true },
  userId: { type: String, required: true },
  devices: {
    phone: String,
    voicemail: String
  }
});

const RecordModel = mongoose.model("Record", Record);

module.exports = RecordModel;
const mongoose = require("mongoose");
const { Schema } = mongoose;

const scheduleSchema = new Schema({
  festivalName: String,
  artists: [
    {
      name: String,
      image: String,
      location: String,
      startTime: String,
      endTime: String,
      id: String,
    },
  ],
});

const ScheduleModel = mongoose.model("schedule", scheduleSchema);
module.exports = ScheduleModel;

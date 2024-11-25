const ScheduleModel = require("../models/Schedule");

const addSchedule = async (req, res) => {
  try {
    const { festivalName, artist } = req.body;

    let schedule = await ScheduleModel.findOne({ festivalName });

    if (schedule) {
      const artistExists = schedule.artists.some(
        (existingArtist) => existingArtist.id == artist.id
      );

      if (!artistExists) {
        schedule.artists.push(artist);
      } else {
        schedule.artists = schedule.artists.filter(
          (existingArtist) => existingArtist.id != artist.id
        );
      }
    } else {
      schedule = new ScheduleModel({
        festivalName,
        artists: [artist],
      });
    }

    res.status(200).json({ message: "Schedule updated successfully" });
    await schedule.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getSchedule = async (req, res) => {
  try {
    const schedule = await ScheduleModel.find({});
    res.send(schedule);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

const removeArtist = async (req, res) => {
  try {
    const { festivalName, artist } = req.body;

    let schedule = await ScheduleModel.findOne({ festivalName });

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    if (schedule) {
      schedule.artists = schedule.artists.filter(
        (existingArtist) => existingArtist.id != artist.id
      );
    }

    res.status(200).json({ message: "Artist removed successfully" });
    await schedule.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addSchedule,
  getSchedule,
  removeArtist,
};

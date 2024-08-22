const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  addSchedule,
  getSchedule,
  removeArtist,
} = require("../controllers/scheduleController");

// middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

router.post("/addSchedule", addSchedule);
router.get("/getSchedule", getSchedule);
router.delete("/removeArtist", removeArtist);

module.exports = router;

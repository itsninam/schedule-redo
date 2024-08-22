import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useFestivals } from "../../contexts/FestivalsContext";
import Artists from "../Artists";
import axios from "axios";

function DaySchedule() {
  const { day } = useParams();

  const { formatDate, isMyScheduleRoute, currentFestival, myCurrentSchedule } =
    useFestivals();

  const filteredSchedule = isMyScheduleRoute
    ? myCurrentSchedule.flatMap((fest) =>
        fest.artists.filter((artist) => formatDate(artist.startTime) === day)
      )
    : currentFestival.flatMap((fest) =>
        fest.artists.filter((artist) => formatDate(artist.startTime) === day)
      );

  const scheduleTimes = [
    ...new Set(filteredSchedule.flatMap((festival) => festival.startTime)),
  ];

  const handleAddToSchedule = async (artist) => {
    try {
      await axios.post("http://localhost:8000/addSchedule", {
        festivalName: currentFestival[0].festivalName,
        artist: artist,
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        console.error(error);
      }
    }
  };

  const handleRemoveFromSchedule = async (artist) => {
    try {
      axios
        .delete("http://localhost:8000/removeArtist", {
          data: {
            festivalName: currentFestival[0].festivalName,
            artist: artist,
          },
        })
        .then((response) => {
          console.log(response.data.message);
        })
        .catch((error) => {
          console.error("Error deleting event:", error);
        });
    } catch (err) {
      console.error("Error in delete request:", err);
    }
  };

  // const deleteMyEvent = async (req, res) => {
  //   try {
  //     const { festivalName, timeSlotId } = req.params;

  //     const festival = await MyScheduleModel.findOne({
  //       festivalName: festivalName,
  //     });

  //     if (!festival) {
  //       return res.status(404).json({ message: "Festival not found" });
  //     }

  //     const dayIndex = festival.festivalData.findIndex((day) =>
  //       day.timeSlot.find((slot) => slot._id.toString() === timeSlotId)
  //     );

  //     if (dayIndex === -1) {
  //       return res.status(404).json({ message: "Time slot not found" });
  //     }

  //     const updatedTimeSlots = festival.festivalData[dayIndex].timeSlot.filter(
  //       (slot) => slot._id.toString() !== timeSlotId
  //     );

  //     festival.festivalData[dayIndex].timeSlot = updatedTimeSlots;
  //     await festival.save();

  //     res.json({ message: "Time slot deleted successfully" });
  //   } catch (error) {
  //     console.error("Error deleting time slot:", error);
  //     res.status(500).json({ message: "Internal error" });
  //   }
  // };

  return (
    <ul>
      {scheduleTimes.map((time) => {
        return (
          <Fragment key={time}>
            <li className="schedule-time">
              {new Date(time).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </li>

            <Artists
              filteredSchedule={filteredSchedule}
              time={time}
              handleAddToSchedule={handleAddToSchedule}
              handleRemoveFromSchedule={handleRemoveFromSchedule}
            />
          </Fragment>
        );
      })}
    </ul>
  );
}

export default DaySchedule;

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
            />
          </Fragment>
        );
      })}
    </ul>
  );
}

export default DaySchedule;

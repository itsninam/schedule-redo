import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useFestivals } from "../../contexts/FestivalsContext";
import Artists from "../Artists";

function DaySchedule() {
  const { day } = useParams();

  const { formatDate, dispatch, mySchedule, isMyScheduleRoute, currentFest } =
    useFestivals();

  const filteredSchedule = isMyScheduleRoute
    ? mySchedule.filter((artist) => formatDate(artist.startTime) === day)
    : currentFest.flatMap((fest) =>
        fest.artists.filter((artist) => formatDate(artist.startTime) === day)
      );

  const scheduleTimes = [
    ...new Set(
      filteredSchedule.flatMap((festival) =>
        new Date(festival.startTime).getHours()
      )
    ),
  ];

  const handleAddToSchedule = (artist) => {
    dispatch({ type: "add_to_myschedule", payload: artist });
  };

  return (
    <ul>
      {scheduleTimes.map((time) => {
        return (
          <Fragment key={time}>
            <li>{time}</li>

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

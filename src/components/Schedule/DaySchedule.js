import React from "react";
import { useParams } from "react-router-dom";
import { useFestivals } from "../../contexts/FestivalsContext";

function DaySchedule() {
  const { day } = useParams();
  const { festivals } = useFestivals();

  if (festivals.length === 0) {
    return <p>No schedule available</p>;
  }

  return (
    <ul>
      {festivals.flatMap((fest) =>
        fest.artists
          .filter(
            (artist) =>
              new Date(artist.startTime).toISOString().split("T")[0] === day
          )
          .map((item, index) => {
            return <li key={index}>{item.name}</li>;
          })
      )}
    </ul>
  );
}

export default DaySchedule;

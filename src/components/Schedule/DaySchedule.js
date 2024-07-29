import React from "react";
import { useParams } from "react-router-dom";

function DaySchedule({ festivals }) {
  const { day } = useParams();


  return (
    <div>
      {festivals.flatMap((fest) =>
        fest.artists
          .filter(
            (artist) =>
              new Date(artist.startTime).toISOString().split("T")[0] === day
          )
          .map((item, index) => {
            return <p key={index}>{item.name}</p>;
          })
      )}
    </div>
  );
}

export default DaySchedule;

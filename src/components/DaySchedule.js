import React from "react";
import { useParams } from "react-router-dom";

function DaySchedule({ festivals }) {
  const { festival } = useParams();

  return (
    <div>
      {festivals.flatMap((fest) =>
        fest.artists
          .filter(
            (artist) =>
              new Date(artist.startTime).toISOString().split("T")[0] ===
              festival
          )
          .map((item, index) => {
            return <p key={index}>{item.name}</p>;
          })
      )}
    </div>
  );
}

export default DaySchedule;

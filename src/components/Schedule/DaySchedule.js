import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useFestivals } from "../../contexts/FestivalsContext";

function DaySchedule() {
  const { day } = useParams();
  const { festivals, formatDate } = useFestivals();

  if (festivals.length === 0) {
    return <p>No schedule available</p>;
  }

  const filteredFestivals = festivals.flatMap((fest) =>
    fest.artists.filter((artist) => formatDate(artist.startTime) === day)
  );

  const festivalTimes = [
    ...new Set(
      filteredFestivals.flatMap((festival) =>
        new Date(festival.startTime).getHours()
      )
    ),
  ];

  return (
    <ul>
      {festivalTimes.map((time) => {
        return (
          <Fragment key={time}>
            <li>{time}</li>

            <ul>
              {filteredFestivals
                .filter(
                  (festival) => new Date(festival.startTime).getHours() === time
                )
                .map((festival, index) => {
                  return <p key={index}>{festival.name}</p>;
                })}
            </ul>
          </Fragment>
        );
      })}
    </ul>
  );
}

export default DaySchedule;

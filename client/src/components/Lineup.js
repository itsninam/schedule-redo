import React from "react";
import { useFestivals } from "../contexts/FestivalsContext";

function Lineup() {
  const { currentFestival } = useFestivals();

  return (
    <>
      {currentFestival.map((festival) => {
        return (
          <img
            key={festival.festivalName}
            src={require(`../assets/${festival.lineupImage}`)}
            alt={festival.festivalName}
          />
        );
      })}
    </>
  );
}

export default Lineup;

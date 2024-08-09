import React from "react";
import { useFestivals } from "../contexts/FestivalsContext";

function Header() {
  const { currentFestival } = useFestivals();

  if (currentFestival.length === 0) {
    return <h1>RaveSync</h1>;
  }
  return (
    <>
      {currentFestival.map((festival) => {
        return <h1 key={festival.festivalName}>{festival.festivalName}</h1>;
      })}
    </>
  );
}

export default Header;

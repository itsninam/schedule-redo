import React from "react";
import { useFestivals } from "../contexts/FestivalsContext";
import titleCase from "../helpers/titleCase";

function Header() {
  const { currentFestival } = useFestivals();

  if (currentFestival.length === 0) {
    return <h1>RaveSync</h1>;
  }
  return (
    <>
      {currentFestival.map((festival) => {
        return (
          <h1 key={festival.festivalName}>
            {titleCase(festival.festivalName.replace(/-/g, " "))}
          </h1>
        );
      })}
    </>
  );
}

export default Header;

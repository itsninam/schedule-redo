import React from "react";
import { useFestivals } from "../contexts/FestivalsContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { festivals, dispatch } = useFestivals();
  const navigate = useNavigate();

  const setCurrentFestival = (chosenFestival) => {
    const currentFestival = festivals.filter(
      (festival) => festival.festivalName === chosenFestival.festivalName
    );

    localStorage.setItem("currentFestival", JSON.stringify(currentFestival));
    navigate("/schedule");
    dispatch({ type: "get_current_fest", payload: currentFestival });
  };

  return (
    <section>
      {festivals.map((festival) => {
        return (
          <p
            key={festival.festivalName}
            onClick={() => setCurrentFestival(festival)}
          >
            {festival.festivalName}
          </p>
        );
      })}
    </section>
  );
}

export default Home;

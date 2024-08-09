import React, { useEffect } from "react";
import { useFestivals } from "../contexts/FestivalsContext";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  const { festivals, dispatch } = useFestivals();
  const navigate = useNavigate();
  const location = useLocation();

  const setCurrentFestival = (chosenFestival) => {
    const currentFestival = festivals.filter(
      (festival) => festival.festivalName === chosenFestival.festivalName
    );

    localStorage.setItem("currentFestival", JSON.stringify(currentFestival));
    navigate("/schedule");
    dispatch({ type: "get_current_fest", payload: currentFestival });
  };

  useEffect(() => {
    if (location.pathname === "/") {
      localStorage.removeItem("currentFestival");

      dispatch({ type: "reset_current_fest" });
    }
  }, [dispatch, location.pathname]);

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

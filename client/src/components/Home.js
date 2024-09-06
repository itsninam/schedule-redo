import React, { useEffect } from "react";
import { useFestivals } from "../contexts/FestivalsContext";
import { useLocation, useNavigate } from "react-router-dom";
import titleCase from "../helpers/titleCase";
import NoData from "./NoData";
import emptyFolder from "../assets/empty-folder.svg";

function Home() {
  const { festivals, dispatch, isLoading } = useFestivals();
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="main-section">
      {festivals.length === 0 ? (
        <NoData
          data={festivals}
          message="No festivals available"
          svg={emptyFolder}
        />
      ) : (
        <ul className="festival-list">
          {festivals.map((festival) => {
            return (
              <li
                key={festival.festivalName}
                onClick={() => setCurrentFestival(festival)}
                className="festival"
              >
                <div className="festival-container">
                  <p className="festival-name">
                    {titleCase(festival.festivalName.replace(/-/g, " "))}
                  </p>
                  <div className="festival-details">
                    <p>
                      <span>
                        {new Date(festival.startDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}{" "}
                        -{" "}
                      </span>
                      <span>
                        {new Date(festival.endDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        ,
                      </span>
                    </p>
                    <p>{festival.location}</p>
                  </div>
                </div>
                <img
                  className="festival-logo"
                  src={require(`../assets/${festival.logo}`)}
                  alt={festival.festivalName}
                />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default Home;

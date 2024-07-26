import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import data from "./data/festivals.json";
import homeRoutes from "./routes/homeRoutes";
import getScheduleRoutes from "./routes/scheduleRoutes";

import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Navigation from "./components/Navigation";
import MySchedule from "./components/MySchedule";
import DaySchedule from "./components/DaySchedule";
import getFestivalRoutes from "./routes/festivalRoutes";

function App() {
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    setFestivals(data.festivals);
  }, []);

  const festivalDays = [
    ...new Set(
      festivals.flatMap((festival) =>
        festival.artists.map(
          (artist) => new Date(artist.startTime).toISOString().split("T")[0]
        )
      )
    ),
  ];

  return (
    <div className="App">
      <Navigation routes={homeRoutes} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="schedule"
          element={<Navigation routes={getScheduleRoutes(festivalDays)} />}
        >
          <Route
            element={<Navigation routes={getFestivalRoutes(festivalDays)} />}
          >
            <Route index element={<Navigate to={festivalDays[0]} replace />} />
            <Route
              path=":festival"
              element={<DaySchedule festivals={festivals} />}
            />
          </Route>

          <Route path="my-schedule" element={<MySchedule />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;

import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import data from "./data/festivals.json";
import homeRoutes from "./routes/homeRoutes";

import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Navigation from "./components/Navigation";
import SchedulePage from "./components/Schedule/SchedulePage";
import DaySchedule from "./components/Schedule/DaySchedule";
import ScheduleList from "./components/Schedule/ScheduleList";
import MyScheduleList from "./components/Schedule/MyScheduleList";

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
        <Route path="schedule" element={<SchedulePage />}>
          <Route index element={<Navigate to="list" replace />} />
          <Route
            path="list"
            element={<ScheduleList festivalDays={festivalDays} />}
          >
            <Route index element={<Navigate to={festivalDays[0]} replace />} />
            <Route
              path=":day"
              element={<DaySchedule festivals={festivals} />}
            />
          </Route>
          <Route path="my-list" element={<MyScheduleList />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;

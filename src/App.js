import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import data from "./data/festivals.json";

import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Navigation from "./components/Navigation";
import SchedulePage from "./components/SchedulePage";
import MySchedule from "./components/MySchedule";
import ScheduleNav from "./components/ScheduleNav";
import DaySchedule from "./components/DaySchedule";

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
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="schedule"
          element={<SchedulePage festivalDays={festivalDays} />}
        >
          <Route element={<ScheduleNav festivalDays={festivalDays} />}>
            <Route index element={<Navigate to={festivalDays[0]} replace />} />
            <Route
              path=":festival"
              element={<DaySchedule festivals={festivals} />}
            />
            ;
          </Route>
          <Route path="my-schedule" element={<MySchedule />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;

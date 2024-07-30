import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import homeRoutes from "./routes/homeRoutes";

import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Navigation from "./components/Navigation";
import SchedulePage from "./components/Schedule/SchedulePage";
import DaySchedule from "./components/Schedule/DaySchedule";
import ScheduleList from "./components/Schedule/ScheduleList";
import MyScheduleList from "./components/Schedule/MyScheduleList";
import { useFestivals } from "./contexts/FestivalsContext";

function App() {
  const { festivalDates } = useFestivals();

  return (
    <div className="App">
      <Navigation routes={homeRoutes} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="schedule" element={<SchedulePage />}>
          <Route index element={<Navigate to="list" replace />} />
          <Route path="list" element={<ScheduleList />}>
            <Route index element={<Navigate to={festivalDates[0]} replace />} />
            <Route path=":day" element={<DaySchedule />} />
          </Route>
          <Route path="my-list" element={<MyScheduleList />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;

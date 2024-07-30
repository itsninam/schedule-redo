import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import homeRoutes from "./routes/homeRoutes";

import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Navigation from "./components/Navigation";
import SchedulePage from "./components/Schedule/SchedulePage";
import DaySchedule from "./components/Schedule/DaySchedule";
import ScheduleList from "./components/Schedule/ScheduleList";
import { useFestivals } from "./contexts/FestivalsContext";

function App() {
  const { festivalDates, isMyScheduleRoute } = useFestivals();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="schedule" element={<SchedulePage />}>
          <Route index element={<Navigate to="list" replace />} />
          <Route
            path={isMyScheduleRoute ? "my-list" : "list"}
            element={<ScheduleList />}
          >
            <Route index element={<Navigate to={festivalDates[0]} replace />} />
            <Route path=":day" element={<DaySchedule />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Navigation routes={homeRoutes} />
    </div>
  );
}

export default App;

import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { useFestivals } from "./contexts/FestivalsContext";
import homeRoutes from "./routes/homeRoutes";

import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Navigation from "./components/Navigation";
import SchedulePage from "./components/Schedule/SchedulePage";
import DaySchedule from "./components/Schedule/DaySchedule";
import ScheduleList from "./components/Schedule/ScheduleList";
import Header from "./components/Header";

function App() {
  const { festivalDates, isMyScheduleRoute, festivalRoute } = useFestivals();

  return (
    <div className="wrapper">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="schedule" element={<SchedulePage />}>
          <Route
            index
            element={<Navigate to={`${festivalRoute}/list`} replace />}
          />
          <Route
            path={
              isMyScheduleRoute
                ? `${festivalRoute}/my-list`
                : `${festivalRoute}/list`
            }
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

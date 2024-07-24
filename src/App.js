import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Navigation from "./components/Navigation";
import SchedulePage from "./components/SchedulePage";
import Schedule from "./components/Schedule";
import MySchedule from "./components/MySchedule";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="schedule" element={<SchedulePage />}>
          <Route index element={<Navigate to="day1" replace />} />
          <Route path=":day" element={<Schedule />} />
          <Route path="my-schedule" element={<MySchedule />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;

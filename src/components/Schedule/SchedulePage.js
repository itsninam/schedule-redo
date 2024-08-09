import { Outlet } from "react-router-dom";
import Navigation from "../Navigation";
import getScheduleRoutes from "../../routes/scheduleRoutes";
import { useFestivals } from "../../contexts/FestivalsContext";

function SchedulePage() {
  const { festivalRoute } = useFestivals();

  return (
    <section className="main-section">
      <Navigation
        className="schedule-nav"
        routes={getScheduleRoutes(festivalRoute)}
      />

      <Outlet />
    </section>
  );
}

export default SchedulePage;

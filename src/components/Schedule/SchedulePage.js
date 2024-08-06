import { Outlet } from "react-router-dom";
import Navigation from "../Navigation";
import getScheduleRoutes from "../../routes/scheduleRoutes";
import { useFestivals } from "../../contexts/FestivalsContext";

function SchedulePage() {
  const { festivalRoute } = useFestivals();

  return (
    <section>
      <Navigation routes={getScheduleRoutes(festivalRoute)} />

      <Outlet />
    </section>
  );
}

export default SchedulePage;

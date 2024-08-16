import { Outlet } from "react-router-dom";
import Navigation from "../Navigation";
import getFestivalRoutes from "../../routes/festivalRoutes";
import { useFestivals } from "../../contexts/FestivalsContext";

function ScheduleList() {
  const { festivalDates, isMyScheduleRoute, isLoading, festivalRoute } =
    useFestivals();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (festivalDates.length === 0) {
    return (
      <p>
        {isMyScheduleRoute
          ? "Add artists to your schedule"
          : "No schedule available"}
      </p>
    );
  }

  return (
    <section>
      <Navigation
        className="days-nav"
        routes={getFestivalRoutes(
          festivalDates,
          isMyScheduleRoute,
          festivalRoute
        )}
      />

      <Outlet />
    </section>
  );
}

export default ScheduleList;

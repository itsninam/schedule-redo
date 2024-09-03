import { Outlet } from "react-router-dom";
import Navigation from "../Navigation";
import getFestivalRoutes from "../../routes/festivalRoutes";
import { useFestivals } from "../../contexts/FestivalsContext";
import emptyFolder from "../../assets/empty-folder.svg";

function ScheduleList() {
  const { festivalDates, isMyScheduleRoute, isLoading, festivalRoute } =
    useFestivals();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (festivalDates.length === 0) {
    return (
      <div className="section-container">
        {isMyScheduleRoute && (
          <img
            className="empty-folder-img"
            src={emptyFolder}
            alt="Empty folder image"
          />
        )}
        <p>
          {isMyScheduleRoute
            ? "Add artists to your schedule"
            : "No schedule available"}
        </p>
      </div>
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

import { Outlet } from "react-router-dom";
import Navigation from "../Navigation";
import getFestivalRoutes from "../../routes/festivalRoutes";
import { useFestivals } from "../../contexts/FestivalsContext";
import NoData from "../NoData";
import emptyFolder from "../../assets/empty-folder.svg";

function ScheduleList() {
  const { festivalDates, isMyScheduleRoute, isLoading, festivalRoute } =
    useFestivals();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {festivalDates.length === 0 ? (
        <NoData
          svg={emptyFolder}
          message={
            isMyScheduleRoute
              ? "Add artists to your schedule"
              : "No schedule available"
          }
        />
      ) : (
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
      )}
    </>
  );
}

export default ScheduleList;

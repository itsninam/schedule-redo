import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation";
import getFestivalRoutes from "../../routes/festivalRoutes";
import { useFestivals } from "../../contexts/FestivalsContext";

function ScheduleList() {
  const { festivalDates, isLoading } = useFestivals();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (festivalDates.length === 0) {
    return <p>No schedule available</p>;
  }

  return (
    <section>
      <Navigation routes={getFestivalRoutes(festivalDates)} />

      <Outlet />
    </section>
  );
}

export default ScheduleList;

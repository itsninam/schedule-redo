import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation";
import getFestivalRoutes from "../../routes/festivalRoutes";

function ScheduleList({ festivalDays }) {
  return (
    <div>
      <Navigation routes={getFestivalRoutes(festivalDays)} />

      <Outlet />
    </div>
  );
}

export default ScheduleList;

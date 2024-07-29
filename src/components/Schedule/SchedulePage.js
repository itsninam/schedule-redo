import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation";
import scheduleRoutes from "../../routes/scheduleRoutes";

function SchedulePage() {
  return (
    <div>
      <Navigation routes={scheduleRoutes} />

      <Outlet />
    </div>
  );
}

export default SchedulePage;

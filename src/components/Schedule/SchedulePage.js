import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation";
import scheduleRoutes from "../../routes/scheduleRoutes";

function SchedulePage() {
  return (
    <section>
      <Navigation routes={scheduleRoutes} />

      <Outlet />
    </section>
  );
}

export default SchedulePage;

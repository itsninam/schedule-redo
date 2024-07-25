import React from "react";
import { Link, Outlet } from "react-router-dom";

function SchedulePage({ festivalDays }) {
  return (
    <div>
      <nav>
        <ul>
          <Link to={`/schedule/${festivalDays[0]}`}>Schedule</Link>
          <Link to="/schedule/my-schedule">My Schedule</Link>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

export default SchedulePage;

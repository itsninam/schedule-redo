import React from "react";
import { Link, Outlet } from "react-router-dom";

function ScheduleNav({ festivalDays }) {
  return (
    <div>
      {festivalDays.map((festival, index) => {
        return (
          <Link key={index} to={festival}>
            {festival}
          </Link>
        );
      })}

      <Outlet />
    </div>
  );
}

export default ScheduleNav;

import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function ScheduleNav({ festivalDays }) {
  return (
    <div>
      {festivalDays.map((festival, index) => {
        return (
          <NavLink key={index} to={festival}>
            {festival}
          </NavLink>
        );
      })}

      <Outlet />
    </div>
  );
}

export default ScheduleNav;

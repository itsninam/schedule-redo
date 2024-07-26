import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Navigation({ routes }) {
  return (
    <>
      <nav>
        <ul>
          {routes.map((route, index) => {
            return (
              <li key={index}>
                <NavLink to={route.routeLink}>{route.routeName}</NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Navigation;
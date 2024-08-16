import React from "react";
import { NavLink } from "react-router-dom";

function Navigation({ routes, className }) {
  return (
    <>
      <nav className={className}>
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
    </>
  );
}

export default Navigation;

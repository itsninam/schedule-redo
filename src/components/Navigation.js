import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/schedule">Schedule</Link>
      </ul>
    </nav>
  );
}

export default Navigation;

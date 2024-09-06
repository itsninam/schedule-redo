import React from "react";

function NoData({ message, svg }) {
  return (
    <section className="section-container">
      <img className="empty-folder-img" src={svg} alt="Empty folder" />
      <p>{message}</p>
    </section>
  );
}

export default NoData;

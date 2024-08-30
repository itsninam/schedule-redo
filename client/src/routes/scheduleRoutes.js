const getScheduleRoutes = (festivalRoute) => {
  const scheduleRoutes = [
    {
      routeName: "Schedule",
      routeLink: `${festivalRoute}/list`,
    },
    {
      routeName: "My Schedule",
      routeLink: `${festivalRoute}/my-list`,
    },
    {
      routeName: "Lineup",
      routeLink: `${festivalRoute}/lineup`,
    },
  ];

  return scheduleRoutes;
};

export default getScheduleRoutes;

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
  ];

  return scheduleRoutes;
};

export default getScheduleRoutes;

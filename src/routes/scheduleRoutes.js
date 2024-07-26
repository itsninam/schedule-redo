const getScheduleRoutes = (festivalDays) => {
  const scheduleRoutes = [
    {
      routeName: "Schedule",
      routeLink: festivalDays[0],
    },
    {
      routeName: "My Schedule",
      routeLink: "my-schedule",
    },
  ];

  return scheduleRoutes;
};

export default getScheduleRoutes;

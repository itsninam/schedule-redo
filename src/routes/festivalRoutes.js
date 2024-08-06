const dayOfWeek = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"];

const getFestivalRoutes = (festivalDates, isMyScheduleRoute, festivalRoute) => {
  const festivalRoutes = festivalDates.map((day) => ({
    routeName: `${dayOfWeek[new Date(day).getDay()]}/${
      new Date(day).getDate() + 1
    }`,
    routeLink: isMyScheduleRoute
      ? `/schedule/${festivalRoute}/my-list/${day}`
      : `/schedule/${festivalRoute}/list/${day}`,
  }));

  return festivalRoutes;
};

export default getFestivalRoutes;

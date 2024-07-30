const dayOfWeek = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"];

const getFestivalRoutes = (festivalDates, isMyScheduleRoute) => {
  const festivalRoutes = festivalDates.map((day) => ({
    routeName: `${dayOfWeek[new Date(day).getDay()]}/${
      new Date(day).getDate() + 1
    }`,
    routeLink: isMyScheduleRoute
      ? `/schedule/my-list/${day}`
      : `/schedule/list/${day}`,
  }));

  return festivalRoutes;
};

export default getFestivalRoutes;

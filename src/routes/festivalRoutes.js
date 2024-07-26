const dayOfWeek = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"];

const getFestivalRoutes = (festivalDays) => {
  const festivalRoutes = festivalDays.map((day) => ({
    routeName: `${dayOfWeek[new Date(day).getDay()]}/${
      new Date(day).getDate() + 1
    }`,
    routeLink: day,
  }));

  return festivalRoutes;
};

export default getFestivalRoutes;

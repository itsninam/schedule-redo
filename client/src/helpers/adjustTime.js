const adjustTime = (time) => {
  const date = new Date(time);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const totalMinutes = hours * 60 + minutes;

  return hours < 12 ? totalMinutes + 24 * 60 : totalMinutes;
};

export default adjustTime;

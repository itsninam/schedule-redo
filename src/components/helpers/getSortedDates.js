const getSortedDates = (date) => {
  const sortedDate = date.sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  return sortedDate;
};

export default getSortedDates;

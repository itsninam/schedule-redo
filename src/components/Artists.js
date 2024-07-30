function Artists({ filteredSchedule, time, handleAddToSchedule }) {
  return (
    <ul>
      {filteredSchedule
        .filter((schedule) => new Date(schedule.startTime).getHours() === time)
        .map((artist) => {
          return (
            <li key={artist.id} onClick={() => handleAddToSchedule(artist)}>
              {artist.name}
            </li>
          );
        })}
    </ul>
  );
}

export default Artists;

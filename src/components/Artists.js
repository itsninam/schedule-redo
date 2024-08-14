function Artists({ filteredSchedule, time, handleAddToSchedule }) {
  return (
    <li>
      {filteredSchedule
        .filter((schedule) => schedule.startTime === time)
        .map((artist) => {
          return (
            <li key={artist.id} onClick={() => handleAddToSchedule(artist)}>
              {artist.name}
            </li>
          );
        })}
    </li>
  );
}

export default Artists;

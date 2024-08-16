function Artists({ filteredSchedule, time, handleAddToSchedule }) {
  return (
    <li>
      {filteredSchedule
        .filter((schedule) => schedule.startTime === time)
        .map((artist) => {
          return (
            <p key={artist.id} onClick={() => handleAddToSchedule(artist)}>
              {artist.name}
            </p>
          );
        })}
    </li>
  );
}

export default Artists;

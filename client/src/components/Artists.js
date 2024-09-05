import { useFestivals } from "../contexts/FestivalsContext";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";

function Artists({
  filteredSchedule,
  time,
  handleAddToSchedule,
  handleRemoveFromSchedule,
}) {
  const { mySchedule, festivalRoute, isMyScheduleRoute } = useFestivals();

  const currentSchedule = mySchedule.find(
    (schedule) => schedule.festivalName === festivalRoute
  );

  return (
    <li className="artist-list">
      {filteredSchedule
        .filter((schedule) => schedule.startTime === time)
        .map((artist) => {
          return (
            <div
              className="artist"
              onClick={() =>
                isMyScheduleRoute
                  ? handleRemoveFromSchedule(artist)
                  : handleAddToSchedule(artist)
              }
              key={artist.id}
            >
              <div className="left-container">
                <img
                  className="artist-image"
                  src={require(`../assets/${artist.image}`)}
                  alt={artist.name}
                />

                <div className="info-container">
                  <p>{artist.name}</p>
                  <span>{artist.location} </span>
                  <span>
                    {new Date(artist.startTime).toLocaleString("en-US", {
                      timeZone: "UTC",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}{" "}
                    -{" "}
                    {new Date(artist.endTime).toLocaleString("en-US", {
                      timeZone: "UTC",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </span>
                </div>
              </div>
              {currentSchedule?.artists.some(
                (art) => art.name === artist.name
              ) ? (
                <MdOutlineCheckBox className="icon" />
              ) : (
                <MdOutlineCheckBoxOutlineBlank className="icon" />
              )}
            </div>
          );
        })}
    </li>
  );
}

export default Artists;

import { useFestivals } from "../contexts/FestivalsContext";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { FaSquareCheck } from "react-icons/fa6";
import { PiMapPinBold } from "react-icons/pi";

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
                  <span>
                    <PiMapPinBold className="pin-icon" /> {artist.stage}{" "}
                  </span>
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
                <FaSquareCheck className="icon checked" />
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

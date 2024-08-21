import { useEffect } from "react";
import { useFestivals } from "../contexts/FestivalsContext";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";

function Artists({ filteredSchedule, time, handleAddToSchedule }) {
  const { mySchedule, festivalRoute, fetchSchedule } = useFestivals();

  const currentSchedule = mySchedule.find(
    (schedule) => schedule.festivalName === festivalRoute
  );

  useEffect(() => {
    fetchSchedule();
  }, [handleAddToSchedule, fetchSchedule]);

  return (
    <li className="artist-list">
      {filteredSchedule
        .filter((schedule) => schedule.startTime === time)
        .map((artist) => {
          return (
            <div
              className="artist"
              onClick={() => handleAddToSchedule(artist)}
              key={artist.id}
            >
              <p>{artist.name}</p>
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

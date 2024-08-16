import { useFestivals } from "../contexts/FestivalsContext";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";

function Artists({ filteredSchedule, time, handleAddToSchedule }) {
  const { mySchedule } = useFestivals();

  return (
    <li>
      {filteredSchedule
        .filter((schedule) => schedule.startTime === time)
        .map((artist) => {
          return (
            <p key={artist.id} onClick={() => handleAddToSchedule(artist)}>
              {artist.name}
              {mySchedule[0]?.artists.some(
                (art) => art.name === artist.name
              ) ? (
                <MdOutlineCheckBox />
              ) : (
                <MdOutlineCheckBoxOutlineBlank />
              )}
            </p>
          );
        })}
    </li>
  );
}

export default Artists;

import React, { Fragment, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFestivals } from "../../contexts/FestivalsContext";
import Artists from "../Artists";
import axios from "axios";

function DaySchedule() {
  const { day } = useParams();

  const {
    formatDate,
    isMyScheduleRoute,
    currentFestival,
    myCurrentSchedule,
    fetchSchedule,
    festivalRoute,
    festivalDates,
  } = useFestivals();

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();

  const filteredSchedule = isMyScheduleRoute
    ? myCurrentSchedule.flatMap((fest) =>
        fest.artists.filter((artist) => formatDate(artist.startTime) === day)
      )
    : currentFestival.flatMap((fest) =>
        fest.artists.filter((artist) => formatDate(artist.startTime) === day)
      );

  const scheduleTimes = [
    ...new Set(
      filteredSchedule
        .flatMap((festival) => festival.startTime)
        .sort((a, b) => a.localeCompare(b))
    ),
  ];

  const handleAddToSchedule = async (artist) => {
    try {
      await axios.post("http://localhost:8000/addSchedule", {
        festivalName: currentFestival[0].festivalName,
        artist: artist,
      });

      await fetchSchedule();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (isMyScheduleRoute) {
      if (!festivalDates.includes(currentPath)) {
        navigate(`/schedule/${festivalRoute}/my-list/${festivalDates[0]}`, {
          replace: true,
        });
      }
    }
  }, [festivalDates, festivalRoute, isMyScheduleRoute, navigate, currentPath]);

  const handleRemoveFromSchedule = async (artist) => {
    try {
      await axios.delete("http://localhost:8000/removeArtist", {
        data: {
          festivalName: currentFestival[0].festivalName,
          artist: artist,
        },
      });

      await fetchSchedule();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Error deleting event:", error.response.data.message);
      } else {
        console.error("Error in delete request:", error);
      }
    }
  };

  const sortedTimes = scheduleTimes.sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <ul className="schedule-container">
      {sortedTimes.map((time) => {
        return (
          <Fragment key={time}>
            {/* currently not using, may add back later */}
            {/* <li className="schedule-time">
              {new Date(time).toLocaleString("en-US", {
                timeZone: "UTC",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </li> */}

            <Artists
              filteredSchedule={filteredSchedule}
              time={time}
              handleAddToSchedule={handleAddToSchedule}
              handleRemoveFromSchedule={handleRemoveFromSchedule}
            />
          </Fragment>
        );
      })}
    </ul>
  );
}

export default DaySchedule;

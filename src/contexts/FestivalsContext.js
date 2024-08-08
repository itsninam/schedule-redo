import { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import getSortedDates from "../helpers/getSortedDates";
import formatDate from "../helpers/formatDate";

function reducer(state, action) {
  switch (action.type) {
    case "fetch_data": {
      return {
        ...state,
        festivals: action.payload,
        isLoading: false,
      };
    }
    case "fetch_data_error": {
      return {
        ...state,
        isLoading: false,
      };
    }
    case "add_to_myschedule": {
      const updatedMySchedule = state.mySchedule.map((schedule) => {
        if (schedule.festivalName === state.currentFest[0].festivalName) {
          const artistExists = schedule.artists.some(
            (existingArtist) => existingArtist.id === action.payload.id
          );

          if (artistExists) {
            return schedule;
          }

          return {
            ...schedule,
            artists: [...schedule.artists, action.payload],
          };
        }
        return schedule;
      });

      const festivalExists = state.mySchedule.some(
        (schedule) =>
          schedule.festivalName === state.currentFest[0].festivalName
      );

      const newSchedule = {
        festivalName: state.currentFest[0].festivalName,
        artists: [action.payload],
      };

      return {
        ...state,
        mySchedule: festivalExists
          ? updatedMySchedule
          : [...state.mySchedule, newSchedule],
      };
    }
    case "get_current_fest": {
      return {
        ...state,
        currentFest: JSON.parse(localStorage.getItem("currentFestival")) || "",
      };
    }

    default:
      return "Unrecognized command";
  }
}

const initialState = {
  festivals: [],
  isLoading: true,
  mySchedule: [],
  currentFest: JSON.parse(localStorage.getItem("currentFestival")) || [],
};

const FestivalsContext = createContext();
const BASE_URL = "http://localhost:9000/festivals";

function FestivalsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();
  const { isLoading, festivals, mySchedule, currentFest } = state;

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL);
      dispatch({ type: "fetch_data", payload: response.data });
    } catch (error) {
      dispatch({ type: "fetch_data_error" });
      console.error("Error fetching festivals:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isMyScheduleRoute = location.pathname.includes("my-list");

  const myCurrentSchedule = mySchedule.filter(
    (festival) => festival.festivalName === currentFest[0].festivalName
  );

  const dates = [
    ...new Set(
      isMyScheduleRoute
        ? myCurrentSchedule.flatMap((festival) =>
            festival.artists.map((artist) => formatDate(artist.startTime))
          )
        : currentFest.flatMap((festival) =>
            festival.artists.map((artist) => formatDate(artist.startTime))
          )
    ),
  ];

  const festivalDates = getSortedDates(dates);

  const festivalRoute = currentFest[0].festivalName;

  return (
    <FestivalsContext.Provider
      value={{
        isLoading,
        festivals,
        festivalDates,
        formatDate,
        mySchedule,
        dispatch,
        isMyScheduleRoute,
        currentFest,
        festivalRoute,
        myCurrentSchedule,
      }}
    >
      {children}
    </FestivalsContext.Provider>
  );
}

function useFestivals() {
  const context = useContext(FestivalsContext);
  if (context === undefined)
    throw new Error("FestivalsContext was used outside the festivals provider");
  return context;
}

export { FestivalsProvider, useFestivals };

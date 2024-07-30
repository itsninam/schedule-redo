import { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import getSortedDates from "../components/helpers/getSortedDates";
import formatDate from "../components/helpers/formatDate";

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
      const elementExists = state.mySchedule.some(
        (schedule) => schedule.id === action.payload.id
      );

      return {
        ...state,
        mySchedule: elementExists
          ? state.mySchedule
          : [...state.mySchedule, action.payload],
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
};

const FestivalsContext = createContext();
const BASE_URL = "http://localhost:9000/festivals";

function FestivalsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();
  const { isLoading, festivals, mySchedule } = state;

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

  const dates = [
    ...new Set(
      isMyScheduleRoute
        ? mySchedule.map((artist) => formatDate(artist.startTime))
        : festivals.flatMap((festival) =>
            festival.artists.map((artist) => formatDate(artist.startTime))
          )
    ),
  ];

  const festivalDates = getSortedDates(dates);

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

import {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useCallback,
} from "react";
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
      return {
        ...state,
        mySchedule: action.payload,
        isLoading: false,
      };
    }
    case "get_current_fest": {
      return {
        ...state,
        currentFestival:
          JSON.parse(localStorage.getItem("currentFestival")) || [],
      };
    }

    case "reset_current_fest": {
      return {
        ...state,
        currentFestival: [],
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
  currentFestival: JSON.parse(localStorage.getItem("currentFestival")) || [],
};

const FestivalsContext = createContext();
const BASE_URL = "http://localhost:9000/festivals";

function FestivalsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();
  const { isLoading, festivals, mySchedule, currentFestival } = state;

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL);
      dispatch({ type: "fetch_data", payload: response.data });
    } catch (error) {
      dispatch({ type: "fetch_data_error" });
      console.error("Error fetching festivals:", error);
    }
  };

  const fetchSchedule = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/getSchedule");

      dispatch({ type: "add_to_myschedule", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const isMyScheduleRoute = location.pathname.includes("my-list");

  const myCurrentSchedule = mySchedule.filter(
    (festival) => festival.festivalName === currentFestival[0]?.festivalName
  );

  const dates = [
    ...new Set(
      isMyScheduleRoute
        ? myCurrentSchedule.flatMap((festival) =>
            festival.artists.map((artist) => formatDate(artist.startTime))
          )
        : currentFestival.flatMap((festival) =>
            festival.artists.map((artist) => formatDate(artist.startTime))
          )
    ),
  ];

  const festivalDates = getSortedDates(dates);

  const festivalRoute = currentFestival[0]?.festivalName;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchSchedule();
  }, [isMyScheduleRoute, fetchSchedule]);

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
        currentFestival,
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

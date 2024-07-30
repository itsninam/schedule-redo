import { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";

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

    default:
      return "Unrecognized command";
  }
}

const initialState = {
  festivals: [],
  isLoading: true,
};

const FestivalsContext = createContext();
const BASE_URL = "http://localhost:9000/festivals";

function FestivalsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, festivals } = state;

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

  const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  const festivalDates = [
    ...new Set(
      festivals.flatMap((festival) =>
        festival.artists.map((artist) => formatDate(artist.startTime))
      )
    ),
  ];

  return (
    <FestivalsContext.Provider
      value={{
        isLoading,
        festivals,
        festivalDates,
        formatDate,
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

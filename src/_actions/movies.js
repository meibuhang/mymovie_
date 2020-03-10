import { GET_MOVIES_POPULAR } from "../config/constant";
import axios from "axios";

export const getPopular = () => {
  return {
    type: GET_MOVIES_POPULAR,
    payload: axios({
      method: "GET",
      url:
        "https://api.themoviedb.org/3/movie/popular?api_key=7fe26f747001d020e92fed615ac69b70"
    })
  };
};

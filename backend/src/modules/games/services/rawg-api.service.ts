import axios from "axios";

const rawg = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: process.env.RAWG_API_KEY
  }
});

const getGames = async (page = 1) => {
    return rawg.get(`/games?page=${page}`)
}

export { getGames }
import axios from "axios";

const api = axios.create({
  baseURL: "https://agro-api.onrender.com",
});

export { api };

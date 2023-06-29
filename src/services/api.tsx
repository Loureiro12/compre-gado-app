import axios from "axios";

const api = axios.create({
  baseURL: "https://api.ofertaever.com",
});

export { api };

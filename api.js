import axios from "axios";

const api = axios.create({
  baseURL: "https://json-xdra.onrender.com/",
});

export default api;

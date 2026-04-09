import axiso from "axios";

const api = axiso.create({
  baseURL: "http://localhost:5000/api",
});

export default api;

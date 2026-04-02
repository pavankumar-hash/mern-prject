import axisos from "axios";

const api = axisos.create({
  baseURL: "http://localhost:5000/api",
});

export default api;

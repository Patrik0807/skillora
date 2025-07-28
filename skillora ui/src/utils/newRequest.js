import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://skillora-server-zump.onrender.com/api/",
  withCredentials: true,
});

export default newRequest;
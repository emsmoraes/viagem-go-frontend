import axios from "axios";

import { API_URL } from "@/constants"; 

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

export default api;
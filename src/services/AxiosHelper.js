import axios from "axios";

//export const BASE_URL = "http://localhost:8089";
export const BASE_URL = "http://13.49.145.115:8089";
export const myAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

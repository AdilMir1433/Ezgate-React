import axios from "axios";
import { header } from "common/Header";
const API_BASE_URL = "http://localhost:8089";

export const addLocation = async (location) => {
  try {
    const endpoint = `${API_BASE_URL}/locations/web/add`;
    const response = await axios.post(endpoint, location, header());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllLocations = async (communityId) => {
  try {
    const endpoint = `${API_BASE_URL}/locations/web/get/${communityId}`;
    const response = await axios.get(endpoint,header());
    return response.data;
  } catch (error) {
    throw error;
  }
}

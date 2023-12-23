import axios from "axios";
import { header } from "common/Header";
const API_BASE_URL = "http://localhost:8089";

export const addCommunity = async (community) => {
  try {
    const endpoint = `${API_BASE_URL}/community/web/add`;
    const response = await axios.post(endpoint, community, header());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCommunity = async () => {
  try {
    const endpoint = `${API_BASE_URL}/community/all`;
    const response = await axios.get(endpoint,header());
    return response.data;
  } catch (error) {
    throw error;
  }
};
import axios from "axios";
import { header } from "common/Header";
const API_BASE_URL = "http://localhost:8089";

export const addStreet = async (streetDto) => {
  try {
    const endpoint = `${API_BASE_URL}/streets/web/add`;
    const res = await axios.post(endpoint, streetDto, header());
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAllStreets = async (communityID) => {
  try {
    const endpoint = `${API_BASE_URL}/streets/web/get/${communityID}`;
    const res = await axios.get(endpoint, header());
    return res.data;
  } catch (error) {
    throw error;
  }
};

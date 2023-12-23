import axios from "axios";
import { header } from "common/Header";
const API_BASE_URL = "http://localhost:8089";


export const addResident = async (residentDto) => {
    try {
      const endpoint = `${API_BASE_URL}/residents/web/add`;
      const response = await axios.post(endpoint, residentDto, header());
      return response.data;
    } catch (error) {
      throw error;
    }
  };

 export const getResidents = async () => {
  try {
    const endpoint = `${API_BASE_URL}/residents/web/get`;
    const response = await axios.get(endpoint,header());
    return response.data;
  } catch (error) {
    throw error;
  }
 } 
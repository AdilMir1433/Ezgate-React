import { header } from "common/Header";
import { myAxios } from "./AxiosHelper";
import axios from "axios";
const API_BASE_URL = "http://localhost:8089";

//get blocks by community Id
export const getBlocksByCommunityId = (communityId) => {
  return myAxios
    .get(`/blocks/web/get/${communityId}`, header())
    .then((response) => response.data);
};

//add blocks
export const addBlock = (blockDto) => {
  return myAxios
    .post(`/blocks/web/add`, blockDto, header())
    .then((response) => response.data);
};

export const getAllBlocks = async (communityID) => {
  try {
    const endpoint = `${API_BASE_URL}/blocks/web/get/${communityID}`;
    const res = await axios.get(endpoint, header());
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addSingleBlock = async (block) => {
  try {
    const endpoint = `${API_BASE_URL}/blocks/web/add`;
    const res = await axios.post(endpoint, block, header());
    return res.data;
  } catch (error) {
    throw error;
  }
};

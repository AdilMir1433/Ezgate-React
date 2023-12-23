import { myAxios } from "./AxiosHelper";

export const userLogin = async (username, password) => {
  try {
    const res = await myAxios
      .post(`/authentication/web/login`, {
        username: username,
        password: password
      })
      .then((res) => res.data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const userSignup = async (username, password) => {
  try{
    const response = await myAxios
    .post(`/authentication/web/signup`,{
      username: username,
      userPassword: password
    })
    .then((response) => response.data);
    return response;
  }
  catch(error)
  {
    throw error;
  }
};
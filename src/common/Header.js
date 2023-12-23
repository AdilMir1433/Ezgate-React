export const header = () => {
  return {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "application/json",
    },
  };
};

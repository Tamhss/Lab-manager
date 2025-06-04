export const getAuthConfig = () => {
  if (typeof window === "undefined") {
    return {
      headers: {
        Authorization: "",
      },
    };
  }

  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

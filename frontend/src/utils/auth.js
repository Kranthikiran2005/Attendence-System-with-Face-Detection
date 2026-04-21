export const getAuth = () => {
  return {
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    user: localStorage.getItem("user"),
    id: localStorage.getItem("id"),
  };
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
  localStorage.removeItem("id");
};
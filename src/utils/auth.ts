export const authToken = (value) => {
  localStorage.setItem("token", value);
};

export const authUser = (value) => {
  localStorage.setItem("user", value);
};

export const authIdiom = (value) => {
  localStorage.setItem("idiom", value);
};

export const authRol = (value) => {
  localStorage.setItem("rol", value);
};

export const getAuthUser = () => {
  return localStorage.getItem("user");
};

export const getAuthRol = () => {
  return localStorage.getItem("rol");
};

export const getAuthIdiom = () => {
  return localStorage.getItem("idiom");
};

export const removeLocalStorage = () => {
  localStorage.clear();
};

// export const authenticated = () => {

// }

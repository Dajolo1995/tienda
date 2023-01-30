export const setShoppingCart = (value) => {
  localStorage.setItem("shopping", JSON.stringify(value));
};

export const getShoppingCart = () => {
  const data: string | null = localStorage.getItem("shopping");
  return JSON.parse(data);
};

export const deleteShoppingCart = () => {
  localStorage.removeItem("shopping");
};

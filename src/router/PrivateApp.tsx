import { Navigate } from "react-router-dom";
import { getAuthRol } from "../utils/auth";

export const PrivateApp = ({ children }) => {
  return !getAuthRol() ? <Navigate to="/" /> : children;
};

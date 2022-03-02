import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { UserContext } from "../App";

export function Protected({ children }) {
  const { user } = useContext(UserContext);
  const location = useLocation;

  if (user) {
    return children;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}

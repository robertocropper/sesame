import React, { useContext } from "react";
import { UserContext } from "../../App";
import False from "./auth-false";
import True from "./auth-true";

export function NavBar() {
  const { user } = useContext(UserContext);
  return user ? <True /> : <False />;
}

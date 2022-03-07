import React, { useEffect } from "react";
import { useLocation } from "react-router";

export const Scroll = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

import React from "react";
import { Directory } from "../../directory/directory.component";
import { Outlet } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <Directory />
      <Outlet />
    </div>
  );
};

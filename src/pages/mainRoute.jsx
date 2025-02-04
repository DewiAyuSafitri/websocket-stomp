import React from "react";
const MainDashboard = React.lazy(() => import("./Dashboard"));
const Detail = React.lazy(() => import("./Detail"));

const mainRoute = [
  { path: "/", element: <MainDashboard /> },
  { path: "/detail", element: <Detail /> },
];
export default mainRoute;

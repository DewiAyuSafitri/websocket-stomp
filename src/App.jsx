import "./App.css";
import React from "react";
import Dashboard from "./component/dashboard";
import DashboardWithoutSock from "./component/DashboardWithoutSock";

function App() {
  return (
    <>
      {/* <Dashboard /> */}
      <DashboardWithoutSock />
    </>
  );
}

export default App;

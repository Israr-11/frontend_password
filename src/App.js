import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Data from "./data/Data";
import DataCreate from "./data/DataCreate";
import DataEdit from "./data/DataEdit";
import HomePage from "./components/login/HomePage";
import Register from "./components/register/Register";
import Cookies from "universal-cookie";

function App() {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/data" element={token ? <Data /> : <Navigate to="/" />} />
        <Route
          path="/data/create"
          element={token ? <DataCreate /> : <Navigate to="/" />}
        />
        <Route
          path="/data/:id/edit"
          element={token ? <DataEdit /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;

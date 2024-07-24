import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";

const App = () => {
  const accessToken = useSelector((state) => state.auth.access_token);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={accessToken ? <Home /> : <Login />} />
          <Route path="/menu" element={accessToken ? <Menu /> : <Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

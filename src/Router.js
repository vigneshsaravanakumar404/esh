import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Us from "./Us";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/us" element={<Us />} />
    </Routes>
  </Router>
);

export default AppRouter;

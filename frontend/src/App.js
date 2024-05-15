import React, { Profiler } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CandidatesList from "./pages/candidates_list.js";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<CandidatesList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

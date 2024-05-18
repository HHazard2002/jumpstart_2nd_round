import React, { Profiler } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CandidatesList from "./pages/candidates_list.js";
import InterviewRequest from "./pages/interview_request.js";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content bg-gray-100 h-full">
          <Routes>
            <Route path="/candidates" element={<CandidatesList />} />
            <Route path="/interview-request" element={<InterviewRequest />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

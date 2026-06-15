import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import CandidateProfile from "./pages/CandidateProfile";
import Login from "./pages/Login";
import Candidates from "./pages/Candidates";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<ResumeUpload />} />
        <Route path="/candidate/:id" element={<CandidateProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/analytics" element={<Analytics />} />        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
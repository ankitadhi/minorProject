import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import "./index.css";

import { AuthProvider } from "./components/AuthContext";
import Dashboard from "./components/Dashboard";

import ResumeBuilder from "./components/ResumeBuilder";
import Parser from "./components/Parser";
import AboutUs from "./components/AboutUs";



const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resumes" element={<Dashboard />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/parser" element={<Parser />} />
        <Route path="/resumes/edit/:templateId" element={<ResumeBuilder />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;

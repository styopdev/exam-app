import React from "react";
import { Routes, Route } from "react-router-dom";
import DepartmentSelection from "./pages/Department";
import UserInfoForm from "./pages/UserInfo";
import Exam from "./pages/Exam";
import ExamFinished from "./pages/ExamFinished";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />

      <main className="main-app">
        <Routes>
          <Route path="/" element={<DepartmentSelection />} />
          <Route path="/start-exam/:departmentId" element={<UserInfoForm />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/exam-finished" element={<ExamFinished />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import DepartmentSelection from "./components/Department";
import UserInfoForm from "./components/UserInfo";
import ExamComponent from "./components/ExamComponent";
import ExamFinished from "./components/ExamFinished";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DepartmentSelection />} />
      </Routes>
      <Header />
      <main className="main-app">
        <Routes>
          <Route path="/start-exam/:departmentId" element={<UserInfoForm />} />
          <Route path="/exam-component" element={<ExamComponent />} />
          <Route path="/exam-finished" element={<ExamFinished />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signUp" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {/* add other routes here */}
    </Routes>
  );
}
export default App;

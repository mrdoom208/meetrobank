import { Routes, Route } from "react-router-dom";

import Login from "./pages/login.tsx";
import RecoveryAccess from "./pages/recoverAccess.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/recoveraccess" element={<RecoveryAccess />} />
    </Routes>
  );
}

export default App;

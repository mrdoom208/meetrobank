import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.tsx";
import RecoveryAccess from "./pages/recoverAccess.tsx";
import NotFound from "./pages/notFound.tsx";

function App() {
  return (
    <BrowserRouter basename="/client">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recoveraccess" element={<RecoveryAccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

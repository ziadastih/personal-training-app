import { Routes, Route } from "react-router-dom";
import CoachHomePage from "./pages/CoachHomePage";
import ClientsPage from "./pages/ClientsPage";
import ProgramsPage from "./pages/ProgramsPage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/coach" element={<CoachHomePage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <NavBar />
    </div>
  );
}

export default App;

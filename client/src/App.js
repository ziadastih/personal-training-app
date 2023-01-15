import { Routes, Route } from "react-router-dom";
import CoachHomePage from "./pages/CoachHomePage";
import ClientsPage from "./pages/ClientsPage";
import ProgramsPage from "./pages/ProgramsPage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import NutritionPage from "./pages/NutritionPage";
import CreateProgramPage from "./pages/CreateProgramPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/coach" element={<CoachHomePage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/nutrition" element={<NutritionPage />} />
        <Route path="/createProgram" element={<CreateProgramPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <NavBar />
    </div>
  );
}

export default App;

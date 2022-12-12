import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/coach/:coachid/client/:clientid" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;

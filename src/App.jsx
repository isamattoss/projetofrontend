import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cadastro from './Cadastro';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        {/* For now, redirect root to cadastro since that's what we are building */}
        <Route path="/" element={<Navigate to="/cadastro" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

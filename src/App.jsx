import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Cadastro from './Cadastro';
import Perfil from './Perfil';
import Home from './Home';
import Escreva from './Escreva';
import Metas from './Metas';
import PrivateRoute from './PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/perfil"element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
        <Route
          path="/home"element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
         <Route
          path="/escreva"element={
            <PrivateRoute>
              <Escreva />
            </PrivateRoute>
          }
        />
        <Route
          path="/metas"element={
            <PrivateRoute>
              <Metas />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

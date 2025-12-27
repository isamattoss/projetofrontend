import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    // Verifica se existe um token no localStorage
    const token = localStorage.getItem('auth_token');

    console.log('PrivateRoute: Verificando token...', token ? 'Token existe' : 'Token não encontrado');

    // Se não houver token, redireciona para login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Se houver token, renderiza o componente filho
    return children;
};

export default PrivateRoute;

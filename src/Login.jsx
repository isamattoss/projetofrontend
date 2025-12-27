import React, { useState } from 'react';
import { User, Key, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './login.style.css';
import logo from './logo.png';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({//valores inputs
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target; //pega valores
        setFormData(prev => ({ ...prev, [name]: value })); //armazena
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' })); //erros
        }
    };
    const validate = () => { //validação
        const newErrors = {};
        if (!formData.email) newErrors.email = 'E-mail';
        if (!formData.password) newErrors.password = 'Senha';
        if (!formData.password) newErrors.password = 'Preencha a senha';
        if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate(); //verificação
        if (Object.keys(newErrors).length > 0) { //erros
            setErrors(newErrors);
            return;
        }
        console.log('Dados de login:', formData);

        // Gera um token simples (em produção, isso viria do backend)
        const token = btoa(`${formData.email}:${Date.now()}`);
        localStorage.setItem('auth_token', token);

        // Redireciona para a página de perfil após login bem-sucedido
        navigate('/perfil');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <header className="login-header">
                    <img src={logo} alt="Logo Revisão Online" className="login-logo" />
                </header>

                <h2 className="login-titulo">Login</h2>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="login-input-group">
                        <div className="login-input-icon">
                            <User size={18} />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'login-input-field error' : 'login-input-field'}
                        />
                        {errors.email && <span className="mensagem-erro">{errors.email}</span>}
                    </div>

                    <div className="login-input-group">
                        <div className="login-input-icon">
                            <Key size={18} />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Senha"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'login-input-field error' : 'login-input-field'}
                        />
                        <button
                            type="button"
                            className="login-eye-button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        {errors.password && <span className="mensagem-erro">{errors.password}</span>}
                    </div>

                    <div className="login-forgot-password">
                        <Link to="/recuperar-senha">Esqueci a minha senha</Link>
                    </div>

                    <button type="submit" className="login-button">
                        LOGIN
                    </button>
                </form>

                <div className="login-footer">
                    <p>Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
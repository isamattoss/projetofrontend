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
        // Redireciona para a página de perfil após login bem-sucedido
        navigate('/perfil');
    };

    return (
        <div className="login">
            <div className="card">
                <header className="header">
                    <img src={logo} alt="Logo Revisão Online" className="logo" />
                </header>

                <h2 className="titulo">Login</h2>

                <form onSubmit={handleSubmit} className="form">
                    <div className="input">
                        <div className="icons">
                            <User size={18} color="#888" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'input-field error' : 'input-field'}
                        />
                        {errors.email && <span className="mensagem-erro">{errors.email}</span>}
                    </div>

                    <div className="input">
                        <div className="icons">
                            <Key size={18} color="#888" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Senha"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'input-field error' : 'input-field'}
                        />
                        <button
                            type="button"
                            className="olho"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} color="#888" /> : <Eye size={20} color="#888" />}
                        </button>
                        {errors.password && <span className="mensagem-erro">{errors.password}</span>}
                    </div>

                    <div className="senha">
                        <Link to="/recuperar-senha">Esqueci a minha senha</Link>
                    </div>

                    <button type="submit" className="botao">
                        LOGIN
                    </button>
                </form>

                <div className="rodape">
                    <p>Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
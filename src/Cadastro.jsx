import React, { useState } from 'react';
import { User, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import './cadastro.style.css';
import logo from './logo.png';

const Cadastro = () => {
    const [formData, setFormData] = useState({ //armazena os valores dos inputs
        matricula: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    const [errors, setErrors] = useState({}); //armazena os erros

    const handleChange = (e) => {
        const { name, value } = e.target; //pega esses valores do input
        setFormData(prev => ({ ...prev, [name]: value })); //insere valores no formdata
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {}; //verificação
        if (!formData.matricula) newErrors.matricula = 'Preencha este campo';
        if (!formData.password) newErrors.password = 'Preencha a senha';
        if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault(); //impede que a página recarregue
        const newErrors = validate();//verificação
        if (Object.keys(newErrors).length > 0) { //se tiver erros...
            setErrors(newErrors);
            return;
        }
        alert('Cadastro realizado com sucesso!');
    };

    return (
        <div className="cadastro">
            <div className="card">
                <header className="header">
                    <Link to="/login" className="voltar">
                        <ArrowLeft size={28} />
                    </Link>
                       <img src={logo} alt="Logo Revisão Online" className="logo" />
                </header>

                <h2 className="criar">Cadastre-se</h2>

                <form onSubmit={handleSubmit} className="form">
                    <div className="input-container">
                        <div className="icons">
                            <User size={18} color="#888" />
                        </div>
                        <input
                            type="text"
                            name="matricula"
                            placeholder="E-mail"
                            value={formData.matricula}
                            onChange={handleChange}
                            className={errors.matricula ? 'input-field error' : 'input-field'}
                        />
                        {errors.matricula && <span className="mensagem-erro">{errors.matricula}</span>}
                    </div>

                    <div className="input-container">
                        <div className="icons">
                            <Lock size={18} color="#888" />
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

                    <div className="input-container">
                        <div className="icons">
                            <Lock size={18} color="#888" />
                        </div>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirme sua senha"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'input-field error' : 'input-field'}
                        />
                        <button 
                            type="button" 
                            className="olho"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={20} color="#888" /> : <Eye size={20} color="#888" />}
                        </button>
                        {errors.confirmPassword && <span className="mensagem-erro">{errors.confirmPassword}</span>}
                    </div>

                    <button type="submit" className="cadastrar">
                        CADASTRAR
                    </button>
                </form>

                <div className="rodape">
                    <p>Já tem uma conta? <Link to="/login">Clique aqui</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Cadastro;
import React, { useState } from 'react';
import { User, Key, ArrowLeft, Eye, EyeOff } from 'lucide-react';
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
        if (!formData.matricula) {
            newErrors.matricula = 'Preencha este campo';
        } else {
            const emailForm = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailForm.test(formData.matricula)) {
                newErrors.matricula = 'Insira um e-mail válido';
            }
        }
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
        <div className="cadastro-container">
            <div className="cadastro-card">
                <header className="cadastro-header">
                    <Link to="/login" className="cadastro-voltar">
                        <ArrowLeft size={28} />
                    </Link>
                    <img src={logo} alt="Logo Revisão Online" className="cadastro-logo" />
                </header>

                <h2 className="cadastro-titulo">Cadastre-se</h2>

                <form onSubmit={handleSubmit} className="cadastro-form">
                    <div className="cadastro-input-group">
                        <div className="cadastro-input-icon">
                            <User size={18} />
                        </div>
                        <input
                            type="text"
                            name="matricula"
                            placeholder="E-mail"
                            value={formData.matricula}
                            onChange={handleChange}
                            className={errors.matricula ? 'cadastro-input-field error' : 'cadastro-input-field'}
                        />
                        {errors.matricula && <span className="mensagem-erro">{errors.matricula}</span>}
                    </div>

                    <div className="cadastro-input-group">
                        <div className="cadastro-input-icon">
                            <Key size={18} />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Senha"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'cadastro-input-field error' : 'cadastro-input-field'}
                        />
                        <button
                            type="button"
                            className="cadastro-eye-button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        {errors.password && <span className="mensagem-erro">{errors.password}</span>}
                    </div>

                    <div className="cadastro-input-group">
                        <div className="cadastro-input-icon">
                            <Key size={18} />
                        </div>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirme a senha"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'cadastro-input-field error' : 'cadastro-input-field'}
                        />
                        <button
                            type="button"
                            className="cadastro-eye-button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        {errors.confirmPassword && <span className="mensagem-erro">{errors.confirmPassword}</span>}
                    </div>

                    <button type="submit" className="cadastro-button">
                        CADASTRAR
                    </button>
                </form>

                <div className="cadastro-footer">
                    <p>Já tem uma conta? <Link to="/login">Clique aqui</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Cadastro;
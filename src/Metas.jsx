import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './metas.style.css';
import logo from './logo2.png';
import { User, Home as HomeIcon, MessagesSquare, PencilLine, CheckCheck, BotMessageSquare, Bell, LogOut, Trophy } from 'lucide-react';
import { listaRedacoes } from './redacoes';

const Metas = () => {
    const navigate = useNavigate();
  

const [perfil] = useState({ nome: "Teste Júnior" });
const [redacoes] = useState(listaRedacoes || []);

const handleLogout = () => {
        localStorage.removeItem('auth_token');
        navigate('/login');
    };

 return (
        <div className="layout">
            <aside className="sidebar">
                <div className="logo">
                    <img src={logo} alt="RevisãoOnline" className="logo-image" />
                </div>

                <nav className="menu">
                    <Link to="/home" className="item">
                        <HomeIcon size={20} />
                        <span>Meu espaço</span>
                    </Link>
                    <div className="item">
                        <MessagesSquare size={20} />
                        <span>Grupos</span>
                    </div>
                    <div>
                    <Link to="/escreva" className="item">
                        <PencilLine size={20} />
                        <span>Escreva</span>
                    </Link>
                    </div>
                    <div className="item">
                        <CheckCheck size={20} />
                        <span>Revise</span>
                    </div>
                    <div className="item">
                        <BotMessageSquare size={20} />
                        <span>Chat</span>
                    </div>
                    <div className="item">
                        <Bell size={20} />
                        <span>Notificações</span>
                    </div>
                    <Link to="/metas" className="item clicado">
                        <Trophy size={20} />
                        <span>Metas</span>
                    </Link>
                    <Link to="/perfil" className="item">
                        <User size={20} />
                        <span>Perfil</span>
                    </Link>
                    <Link to="/login" className="item" onClick={handleLogout} style={{ marginTop: 'auto', marginBottom: '10px', cursor: 'pointer' }}>
                        <LogOut size={20} />
                        <span>Sair</span>
                    </Link>
                </nav>

                <div className="rodape">
                    <div className="rodape-fim">
                        <div className="avatar-rodape">
                            {perfil.nome ? perfil.nome.charAt(0).toUpperCase() : <User size={20} />}
                        </div>
                        <div className="info-rodape">
                            <span className="nome-rodape">{perfil.nome || 'Visitante'}</span>
                        </div>
                    </div>
                </div>
            </aside>
            <main className="main-content">
                <h1>Metas</h1>
                <p>aaaaaaaaaaaaaaa</p>
            </main>
        </div>
    );
};

export default Metas;
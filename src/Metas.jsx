import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './metas.style.css';
import logo from './logo2.png';
import { User, Home as HomeIcon, MessagesSquare, PencilLine, CheckCheck, BotMessageSquare, Bell, LogOut, Trophy } from 'lucide-react';
import { listaRedacoes } from './redacoes';
import Grafico from './grafico';

const Metas = () => {
    const navigate = useNavigate();
  

const [perfil] = useState({ nome: "Teste Júnior" });
const [redacoes] = useState(listaRedacoes || []);

const handleLogout = () => {
        localStorage.removeItem('auth_token');
        navigate('/login');
    };

const redacoesCorrigidas = redacoes.filter(r => r.status === 'Corrigida' && r.nota !== null);
const mediaNotas = redacoesCorrigidas.length > 0 ? Math.round(redacoesCorrigidas.reduce((acc, r) => acc + r.nota, 0) / redacoesCorrigidas.length) : 0;
const melhorNota = redacoesCorrigidas.length > 0 ? Math.max(...redacoesCorrigidas.map(r => r.nota)) : 0;
const ultimaNota = redacoesCorrigidas.length > 0 ? redacoesCorrigidas.sort((a,b) => b.id - a.id)[0].nota : 0;

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
                <div className='metas-header'>
                <div>
                <h2>Metas e Evolução</h2>
                <p>Acompanhe seu progresso na escrita!</p>
                </div>
                </div>

                <div className='status-grid'>
                    <div className='status-card'>
                        <div className='status-icon media'>
                            <Trophy size={24} />
                        </div>
                        <div className='status-info'>
                            <span className='status-label'>Média Geral: </span>
                            <span className='status-value'>{mediaNotas}</span>
                        </div>
                    </div>

                    <div className='status-card'>
                        <div className='status-icon ultima'>
                            <PencilLine size={24} />
                        </div>
                        <div className='status-info'>
                            <span className='status-label'>Última Nota: </span>
                            <span className='status-value'>{ultimaNota}</span>
                        </div>
                    </div>

                    <div className='status-card'>
                        <div className='status-icon total'>
                            <CheckCheck size={24} />
                        </div>
                        <div className='status-info'>
                            <span className='status-label'>Redações Corrigidas: </span>
                            <span className='status-value'>{redacoesCorrigidas.length}</span>
                        </div>
                    </div>
                </div>

                <Grafico redacoes={redacoes} />
            </main>
        </div>
    );
};

export default Metas;
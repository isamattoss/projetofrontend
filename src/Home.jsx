import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.style.css';
import logo from './logo2.png';
import { User, Home as HomeIcon, MessagesSquare, PencilLine, CheckCheck, BotMessageSquare, Bell, LogOut } from 'lucide-react';
import { listaRedacoes } from './redacoes';

const Home = () => {
    const navigate = useNavigate();
  

const [perfil] = useState({ nome: "Teste Júnior" });
const [redacoes] = useState(listaRedacoes || []);
//consts para status
const totalEscrita = redacoes?.filter(r => r.status === 'Em escrita').length || 0;
const totalAvaliacao = redacoes.filter(r => r.status === 'Em avaliação').length || 0;
const totalCorrigida = redacoes.filter(r => r.status === 'Corrigida').length || 0;

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
                    <Link to="/home" className="item clicado">
                        <HomeIcon size={20} />
                        <span>Meu espaço</span>
                    </Link>
                    <div className="item">
                        <MessagesSquare size={20} />
                        <span>Grupos</span>
                    </div>
                    <div className="item">
                        <PencilLine size={20} />
                        <span>Escreva</span>
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

            <main className='conteudo'>
                <div className="card-container">
                    <div className="card-header">
                        <h2><PencilLine size={20} /> Minhas redações</h2>
                    </div>
                    <div className="ops-container"></div>
                    <button className='btn-badge-vermelho'>Em escrita ({totalEscrita})</button>
                    <button className='btn-badge-amarelo'>Em avaliação ({totalAvaliacao})</button>
                    <button className='btn-badge-verde'>Corrigidas ({totalCorrigida})</button>
                    <div className='pesquisa'>
                        <input type='text' placeholder="Pesquisar"/>
                    </div>
                </div>

                <div className="redacoes-lista">
                    {redacoes.map((redacao) => (
                        <div className="redacao-item" key={redacao.id}>
                            <div className="redacao-header">
                                <h3>{redacao.titulo}</h3>
                                <p>{redacao.tema}</p>
                            </div>
                            <div className="redacao-status">
                                {redacao.status === 'Corrigida' ? (<span className="badge badge-verde">Corrigida (Nota: {redacao.nota}) </span>) 
                                : redacao.status === 'Em avaliação' ? (<span className="badge badge-amarelo">Em avaliação </span>)
                                : redacao.status === 'Em escrita' ? (<span className="badge badge-vermelho">Em escrita </span>) : null}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Home;
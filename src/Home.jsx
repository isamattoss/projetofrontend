import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.style.css';
import logo from './logo2.png';
import { User, Home as HomeIcon, MessagesSquare, PencilLine, CheckCheck, BotMessageSquare, Bell, LogOut, Trophy } from 'lucide-react';
import { listaRedacoes } from './redacoes';

const Home = () => {
    const navigate = useNavigate();
  

const [perfil] = useState({ nome: "Teste Júnior" });
const [redacoes] = useState(listaRedacoes || []);
const [filtroStatus, setFiltroStatus] = useState(null);
const [termoBusca, setTermoBusca] = useState('');
//consts para status
const totalEscrita = redacoes?.filter(r => r.status === 'Em escrita').length || 0;
const totalAvaliacao = redacoes.filter(r => r.status === 'Em avaliação').length || 0;
const totalCorrigida = redacoes.filter(r => r.status === 'Corrigida').length || 0;

const redacoesFiltradas = redacoes.filter(redacao => {
    const matchStatus = !filtroStatus || redacao.status === filtroStatus;
    const matchBusca = !termoBusca || 
    redacao.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
    redacao.tema.toLowerCase().includes(termoBusca.toLowerCase());
    return matchStatus && matchBusca;
});

 const handleFiltroStatus = (status) => {
    setFiltroStatus(filtroStatus === status ? null : status);
 }; 

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
                    <Link to="/metas" className="item">
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

            <main className='conteudo'>
                <div className="card-container">
                    <div className="card-header">
                        <h2><PencilLine size={20} /> Minhas redações</h2>
                    </div>
                    <div className="ops-container"></div>
                    <button className={`btn-badge-vermelho ${filtroStatus === 'Em escrita' ? 'ativo' : ''}`} onClick={() => handleFiltroStatus('Em escrita')}>Em escrita ({totalEscrita})</button>
                    <button className={`btn-badge-amarelo ${filtroStatus === 'Em avaliação' ? 'ativo' : ''}`} onClick={() => handleFiltroStatus('Em avaliação')}>Em avaliação ({totalAvaliacao})</button>
                    <button className={`btn-badge-verde ${filtroStatus === 'Corrigida' ? 'ativo' : ''}`} onClick={() => handleFiltroStatus('Corrigida')}>Corrigidas ({totalCorrigida})</button>
                    <div className='pesquisa'>
                        <input type='text' value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)} placeholder="Pesquisar por título ou tema da redação..."/>
                    </div>
                </div>

                <div className="redacoes-lista">
                    {redacoesFiltradas.length > 0 ? (
                        redacoesFiltradas.map((redacao) => (
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
                    ))
                    ):(
                        <div className='nenhuma-redacao'>
                        <p>Nenhuma redação encontrada {filtroStatus && `com status ${filtroStatus}`} {termoBusca && `para "${termoBusca}"`}</p>
                </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Home;
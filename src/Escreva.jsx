import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './escreva.style.css';
import { temasRedacao } from './temas';
import logo from './logo2.png';
import { User, Home as HomeIcon, MessagesSquare, PencilLine, CheckCheck, BotMessageSquare, Bell, LogOut, ArrowBigDown} from 'lucide-react';

const Escreva = () => {
    const navigate = useNavigate();
    const [perfil] = useState({ nome: "Teste Júnior" });
    const [contadorCaracteres, setContadorCaracteres] = useState(0);
    const [contadorPalavras, setContadorPalavras] = useState(0);
    const [mostrarToast, setMostrarToast] = useState(false);
    const [tipoToast, setTipoToast] = useState('sucesso');
    const [mensagemToast, setMensagemToast] = useState('');

const handleLogout = () => {
        localStorage.removeItem('auth_token');
        navigate('/login');
    };

const atualizarContadores = (texto) => {
    setContadorCaracteres(texto.length);
    const palavras = texto.trim().split(/\s+/).filter(palavra => palavra.length > 0);
    setContadorPalavras(palavras.length);
};

 const exibirToast = (tipo, mensagem) => {
        setTipoToast(tipo);
        setMensagemToast(mensagem);
        setMostrarToast(true);
        
        setTimeout(() => {
            setMostrarToast(false);
        }, 4000);
    };

 const handleEnviarRedacao = (e) => {
    e.preventDefault(); 

  const tema = document.getElementById('tema').value;
        const titulo = document.getElementById('titulo').value;
        const redacao = document.getElementById('redacao').value;
        
        if (!tema) {
            exibirToast('erro', 'Por favor, selecione um tema!');
            return;
        }
        
        if (!redacao.trim()) {
            exibirToast('erro', 'Por favor, escreva sua redação!');
            return;
        }
        
        if (contadorPalavras < 20) {
            exibirToast('erro', 'Sua redação está muito curta. Mínimo de 20 palavras.');
            return;
        }
        
        //simulação envio
        console.log('Enviando redação:', { tema, titulo, redacao });
        exibirToast('sucesso', 'Redação enviada com sucesso! ✓');


     setTimeout(() => {
            document.getElementById('tema').value = '';
            document.getElementById('titulo').value = '';
            document.getElementById('redacao').value = '';
            setContadorCaracteres(0);
            setContadorPalavras(0);
        }, 2000);
 };

const handleSalvarRascunho = () => {
        const tema = document.getElementById('tema').value;
        const titulo = document.getElementById('titulo').value;
        const redacao = document.getElementById('redacao').value;
        
        if (!tema && !redacao.trim()) {
            exibirToast('erro', 'Não há conteúdo para salvar!');
            return;
        }

        //simulação rascunho
        console.log('Salvando rascunho:', { tema, titulo, redacao });
        exibirToast('rascunho', 'Rascunho salvo com sucesso! 💾');
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
                    <Link to="/escreva" className="item clicado">
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
                <div className = "form-redacao-container">
                <h2 className='nome-escreva'>Escreva sua Redação ✍️</h2>
                    <form className='form-redacao' onSubmit={handleEnviarRedacao}>

                        <div className='form-itens'>
                            <label htmlFor='tema' className='form-label'>Tema da Redação </label>
                            <select id='tema' className='form-select' defaultValue="">
                                <option value="" disabled> Selecione o tema de escrita da sua redação! ⬇</option>
                                {temasRedacao.map((item, index) => (
                                    <option key={index} value={item.tema}>{item.tema}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className='form-itens'>
                             <label htmlFor='titulo' className='form-label'>Título da Redação (opcional)</label>
                             <input type='text' id='titulo' className='form-input' placeholder='Digite o título da sua redação'/>
                        </div>

                        <div className='form-itens'>
                            <label htmlFor='redacao' className='form-label'>Redação</label>
                            <div className='edicao'>
                                <span className='edicao-linhas'>Mínimo: 7 linhas | Máximo: 30 linhas</span>
                            </div>
                            <textarea id='redacao' className='form-texto' placeholder='Escreva sua redação aqui...' rows="30" onChange={(e) => atualizarContadores(e.target.value)}></textarea>
                            <div className='contador'>
                                <span className='contador-item'> 
                                    Caracteres: {contadorCaracteres} | Palavras: {contadorPalavras}
                                </span>
                            </div>
                        </div>
                        
                        <div className='form-botoes'>
                            <button type='button' className='btn-salvar' onClick={handleSalvarRascunho}>Salvar Rascunho</button>
                            <button type='submit' className='btn-enviar'>Enviar Redação</button>
                        </div>
                    </form>
                </div>

                 {mostrarToast && (
                    <div className={`toast toast-${tipoToast}`}>
                        <div className="toast-conteudo">
                            <span className="toast-icone">
                                {tipoToast === 'sucesso' && '✓'}
                                {tipoToast === 'erro' && '✕'}
                                {tipoToast === 'rascunho' && '💾'}
                            </span>
                            <span className="toast-mensagem">{mensagemToast}</span>
                        </div>
                        <div className="toast-progresso"></div>
                    </div>
                )}

            </main>
        </div>
    );
}

export default Escreva;
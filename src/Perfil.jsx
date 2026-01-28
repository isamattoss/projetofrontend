
import { useState, useEffect, useRef } from 'react';
import { User, GraduationCap, Save, Home, PencilLine, Camera, ChevronDown, Check, Mail, Phone, MessagesSquare, CheckCheck, BotMessageSquare, Bell, LogOut, Trophy} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './perfil.style.css';
import { cursosGraduacao } from './cursos';
import logo from './logo2.png';

const Perfil = () => { //dados perfil
    const navigate = useNavigate();
    const [perfil, setPerfil] = useState({
        nome: '',
        email: '',
        telefone: '',
        cursoSonho: ''
    });

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        navigate('/login');
    };

    const [buscaCurso, setBuscaCurso] = useState('');
    const [sugestoesCursos, setSugestoesCursos] = useState([]);
    const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
    const foraSugestoes = useRef(null);

    useEffect(() => {
        const dadosSalvos = localStorage.getItem('user_profile');//pega do navegador
        if (dadosSalvos) {
            const parsed = JSON.parse(dadosSalvos);//transforma em objeto
            const initialPerfil = {
                ...parsed,
                nome: parsed.nome || '',
                email: parsed.email || '',
                telefone: parsed.telefone || '',
                cursoSonho: parsed.cursoSonho || '' //atualiza estados ou deixa vazio
            };
            setPerfil(initialPerfil);
            setBuscaCurso(initialPerfil.cursoSonho);
        }
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {//fecha sugestões se foi clicado fora
            if (foraSugestoes.current && !foraSugestoes.current.contains(event.target)) {
                setMostrarSugestoes(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [foraSugestoes]);

    const formatPhoneNumber = (value) => {//formata número tel/whats
        const numbers = value.replace(/\D/g, '');

        if (numbers.length <= 2) {
            return numbers;
        } else if (numbers.length <= 7) {
            return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
        } else if (numbers.length <= 11) {
            return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
        }
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'telefone') {
            const formatted = formatPhoneNumber(value);
            setPerfil(prev => ({ ...prev, [name]: formatted }));
        } else {
            setPerfil(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleCursoChange = (e) => { //cursos
        const valor = e.target.value;
        setBuscaCurso(valor);
        setSugestoesCursos(
            cursosGraduacao.filter(curso =>
                curso.toLowerCase().includes(valor.toLowerCase())
            )
        );
        setMostrarSugestoes(true);
    };

    const selecionarCurso = (curso) => {
        setBuscaCurso(curso);
        setPerfil(prev => ({ ...prev, cursoSonho: curso }));
        setMostrarSugestoes(false);
    };

    const handleSave = (e) => { //salva dados
        e.preventDefault();
        const perfilAtualizado = { ...perfil, cursoSonho: buscaCurso };
        localStorage.setItem('user_profile', JSON.stringify(perfilAtualizado));
        setPerfil(perfilAtualizado);
        alert(`Dados atualizados com sucesso!`);
    };

    return (
        <div className="layout">
            <aside className="sidebar">
                <div className="logo">
                    <img src={logo} alt="RevisãoOnline" className="logo-image" />
                </div>

                <nav className="menu">
                    <Link to="/home" className="item">
                        <Home size={20} />
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
                    <div className="item clicado">
                        <User size={20} />
                        <span>Perfil</span>
                    </div>
                    <div className="item" onClick={handleLogout} style={{ marginTop: 'auto', marginBottom: '10px', cursor: 'pointer' }}>
                        <LogOut size={20} />
                        <span>Sair</span>
                    </div>
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

            <main className="conteudo">
                <header className="header">
                    <div className="titulo">
                        <h1>Minha Conta</h1>
                        <p>Atualize seus dados pessoais e educacionais</p>
                    </div>
                    <div className="dashboard">
                        <span className="current">Perfil</span>
                    </div>
                </header>

                <div className="conteudos">
                    <form onSubmit={handleSave} className="form-header">


                        <div className="perfil-header">
                            <div className="foto-perfil">
                                <div className="avatar">
                                    {perfil.nome ? perfil.nome.charAt(0).toUpperCase() : <User size={40} />}
                                </div>
                                <button type="button" className="botao-avatar" title="Alterar foto">
                                    <Camera size={16} />
                                </button>
                            </div>
                            <div className="info-perfil">
                                <div className="nome-perfil">
                                    <h2>{perfil.nome || 'Usuário sem nome'}</h2>
                                    {buscaCurso && (
                                        <span className="cursos">
                                            <GraduationCap size={16} />
                                            {buscaCurso}
                                        </span>
                                    )}
                                </div>
                                <p>{perfil.email || 'Email não cadastrado'}</p>
                            </div>
                        </div>


                        <div className="cards">
                            <h3>Informações Pessoais</h3>

                            <div className="form">
                                <div className="nome-completo">
                                    <label>Nome Completo</label>
                                    <div className="icon-nome">
                                        <User size={20} className="icon" />
                                        <input
                                            type="text"
                                            name="nome"
                                            value={perfil.nome}
                                            onChange={handleChange}
                                            placeholder="Digite seu nome completo"
                                            className="input-with-icon"
                                        />
                                    </div>
                                </div>

                                {/* Email e Telefone lado a lado com alturas iguais */}
                                <div className="form-group">
                                    <label>E-mail</label>
                                    <div className="input-icon-wrapper">
                                        <Mail size={20} className="icon" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={perfil.email}
                                            onChange={handleChange}
                                            placeholder="seu@email.com"
                                            className="input-with-icon"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Telefone / WhatsApp</label>
                                    <div className="icon-telefone">
                                        <Phone size={20} className="icon" />
                                        <input
                                            type="tel"
                                            name="telefone"
                                            value={perfil.telefone}
                                            onChange={handleChange}
                                            placeholder="(00) 00000-0000"
                                            className="input-with-icon"
                                        />
                                    </div>
                                </div>

                                {/* Curso ocupa largura total */}
                                <div className="form-group" ref={foraSugestoes}>
                                    <label>Curso de Interesse (Meta)</label>
                                    <div className="container">
                                        <div className="input-icon">
                                            <GraduationCap size={20} className="icon" />
                                            <input
                                                type="text"
                                                value={buscaCurso}
                                                onChange={handleCursoChange}
                                                onFocus={() => handleCursoChange({ target: { value: buscaCurso } })}
                                                placeholder="Busque por Medicina, Direito, Engenharia..."
                                                className="input"
                                            />
                                            <ChevronDown size={18} className="icone-c" />
                                        </div>

                                        {mostrarSugestoes && sugestoesCursos.length > 0 && (
                                            <ul className="lista-curso">
                                                {sugestoesCursos.map((curso, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => selecionarCurso(curso)}
                                                        className={curso === perfil.cursoSonho ? 'selected' : ''}
                                                    >
                                                        {curso}
                                                        {curso === perfil.cursoSonho && <Check size={16} />}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="action-bar">
                            <button type="submit" className="save">
                                <Save size={20} />
                                <span>SALVAR DADOS</span>
                            </button>
                        </div>

                    </form>
                </div>
            </main>
        </div>
    );
};

export default Perfil;
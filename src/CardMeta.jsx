import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { cursosComNotas } from './cursos'; 

const CardMeta = ({ notaAtual = 0, cursoInicial = '' }) => {
  const [cursoSelecionado, setCursoSelecionado] = useState(cursoInicial || '');
  const [aberto, setAberto] = useState(false);
  const [busca, setBusca] = useState('');
  const [animado, setAnimado] = useState(false);

  const cursoData = cursosComNotas.find(c => c.curso === cursoSelecionado);
  const notaCorte = cursoData?.nota_corte_estimada ?? 0;
  const maxEixo = notaCorte > 0 ? notaCorte : 1000;
  const porcentagem = notaCorte > 0 ? Math.min((notaAtual / notaCorte) * 100, 100) : 0;
  const faltam = notaCorte > 0 ? Math.max(notaCorte - notaAtual, 0) : 0;
  const atingiu = notaAtual >= notaCorte && notaCorte > 0;

  const cursosFiltrados = cursosComNotas.filter(c =>
    c.curso.toLowerCase().includes(busca.toLowerCase())
  );

  // Cor da barra conforme progresso
  const corBarra = () => {
    if (atingiu) return 'linear-gradient(90deg, #36a17a, #16de9c)';
    if (porcentagem >= 75) return 'linear-gradient(90deg, #3868d6, #17aabf)';
    if (porcentagem >= 50) return 'linear-gradient(90deg, #f59e0b, #fbbf24)';
    return 'linear-gradient(90deg, #ef4444, #f87171)';
  };

  // Re-anima a barra quando muda curso
  useEffect(() => {
    setAnimado(false);
    const t = setTimeout(() => setAnimado(true), 80);
    return () => clearTimeout(t);
  }, [cursoSelecionado, notaAtual]);

  return (
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerIcon}>
          <Target size={22} color="#fff" />
        </div>
        <div>
          <p style={styles.headerLabel}>Minha Meta</p>
          <p style={styles.headerSub}>Selecione seu curso e acompanhe</p>
        </div>
      </div>

      {/* Seletor de curso */}
      <div style={styles.seletor} onClick={() => setAberto(o => !o)}>
        <span style={{ color: cursoSelecionado ? '#1e293b' : '#94a3b8', fontSize: 14, fontWeight: 500 }}>
          {cursoSelecionado || 'Escolha seu curso...'}
        </span>
        {aberto ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
      </div>

      {aberto && (
        <div style={styles.dropdown}>
          <input
            style={styles.busca}
            placeholder="Buscar curso..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            onClick={e => e.stopPropagation()}
            autoFocus
          />
          <div style={styles.lista}>
            {cursosFiltrados.map(c => (
              <div
                key={c.curso}
                style={{
                  ...styles.listaItem,
                  background: c.curso === cursoSelecionado ? '#f0f9ff' : 'transparent',
                  fontWeight: c.curso === cursoSelecionado ? 600 : 400,
                }}
                onClick={() => {
                  setCursoSelecionado(c.curso);
                  setAberto(false);
                  setBusca('');
                }}
              >
                <span>{c.curso}</span>
                <span style={styles.notaTag}>{c.nota_corte_estimada}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progresso */}
      {cursoSelecionado && (
        <div style={styles.progresso}>
          {/* Números */}
          <div style={styles.numerosRow}>
            <div style={styles.numeroBloco}>
              <span style={styles.numeroLabel}>Sua nota</span>
              <span style={{ ...styles.numeroValor, color: '#3868d6' }}>{notaAtual}</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <TrendingUp size={18} color="#64748b" />
            </div>
            <div style={{ ...styles.numeroBloco, alignItems: 'flex-end' }}>
              <span style={styles.numeroLabel}>Nota de corte</span>
              <span style={{ ...styles.numeroValor, color: '#1e293b' }}>{notaCorte}</span>
            </div>
          </div>

          {/* Barra de progresso */}
          <div style={styles.barraContainer}>
            <div style={styles.barraTrack}>
              <div
                style={{
                  ...styles.barraFill,
                  width: animado ? `${porcentagem}%` : '0%',
                  background: corBarra(),
                }}
              />
              {/* Marcador da nota atual */}
              {porcentagem > 5 && (
                <div style={{ ...styles.marcador, left: `calc(${Math.min(porcentagem, 97)}% - 18px)` }}>
                  <span style={styles.marcadorTexto}>{notaAtual}</span>
                </div>
              )}
            </div>
            <div style={styles.barraLabels}>
              <span>0</span>
              <span>{notaCorte}</span>
            </div>
          </div>

          {/* Status */}
          <div style={{ ...styles.statusBox, background: atingiu ? '#f0fdf4' : '#f8fafc', borderColor: atingiu ? '#86efac' : '#e2e8f0' }}>
            {atingiu ? (
              <div style={styles.statusRow}>
                <Sparkles size={16} color="#10b981" />
                <span style={{ ...styles.statusTexto, color: '#10b981' }}>
                  Parabéns! Você já atingiu a nota de corte estimada! 🎉
                </span>
              </div>
            ) : (
              <div style={styles.statusRow}>
                <Target size={16} color="#64748b" />
                <span style={styles.statusTexto}>
                  Faltam <strong style={{ color: '#3868d6' }}>{faltam} pontos</strong> para atingir a nota de corte de{' '}
                  <strong>{cursoSelecionado}</strong>
                </span>
              </div>
            )}
          </div>

          {/* Mini legenda de cores */}
          <div style={styles.legenda}>
            {[
              { cor: '#ef4444', label: '< 50%' },
              { cor: '#f59e0b', label: '50–74%' },
              { cor: '#3868d6', label: '75–99%' },
              { cor: '#10b981', label: 'Meta!' },
            ].map(l => (
              <div key={l.label} style={styles.legendaItem}>
                <div style={{ ...styles.legendaDot, background: l.cor }} />
                <span style={styles.legendaLabel}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!cursoSelecionado && (
        <p style={styles.placeholder}>
          Selecione um curso acima para visualizar quanto falta para atingir a nota de corte estimada.
        </p>
      )}
    </div>
  );
};

/* ── Estilos inline para ser auto-contido ── */
const styles = {
  card: {
    background: '#fff',
    borderRadius: 16,
    padding: 24,
    boxShadow: '0 1px 3px rgba(0,0,0,0.10), 0 4px 16px rgba(56,104,214,0.07)',
    maxWidth: 520,
    width: '100%',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    position: 'relative',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: 'linear-gradient(135deg, #3868d6 0%, #31099d 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLabel: {
    margin: 0,
    fontSize: 16,
    fontWeight: 700,
    color: '#1e293b',
  },
  headerSub: {
    margin: 0,
    fontSize: 12,
    color: '#94a3b8',
  },
  seletor: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1.5px solid #e2e8f0',
    borderRadius: 10,
    padding: '10px 14px',
    cursor: 'pointer',
    userSelect: 'none',
    marginBottom: 4,
    transition: 'border-color 0.2s',
  },
  dropdown: {
    border: '1.5px solid #e2e8f0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    zIndex: 10,
    background: '#fff',
  },
  busca: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 14px',
    border: 'none',
    borderBottom: '1px solid #f1f5f9',
    outline: 'none',
    fontSize: 13,
    color: '#1e293b',
    background: '#f8fafc',
  },
  lista: {
    maxHeight: 200,
    overflowY: 'auto',
  },
  listaItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '9px 14px',
    fontSize: 13,
    color: '#1e293b',
    cursor: 'pointer',
    transition: 'background 0.15s',
  },
  notaTag: {
    fontSize: 11,
    color: '#64748b',
    background: '#f1f5f9',
    borderRadius: 6,
    padding: '2px 7px',
    fontWeight: 600,
  },
  progresso: {
    marginTop: 16,
  },
  numerosRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  numeroBloco: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  numeroLabel: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  numeroValor: {
    fontSize: 28,
    fontWeight: 800,
    lineHeight: 1,
  },
  barraContainer: {
    marginBottom: 14,
  },
  barraTrack: {
    position: 'relative',
    height: 18,
    background: '#f1f5f9',
    borderRadius: 99,
    overflow: 'visible',
    marginBottom: 4,
  },
  barraFill: {
    height: '100%',
    borderRadius: 99,
    transition: 'width 1.1s cubic-bezier(0.34, 1.56, 0.64, 1)',
    boxShadow: '0 2px 8px rgba(56,104,214,0.35)',
    minWidth: 0,
  },
  marcador: {
    position: 'absolute',
    top: -26,
    background: '#1e293b',
    color: '#fff',
    fontSize: 11,
    fontWeight: 700,
    padding: '2px 7px',
    borderRadius: 6,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
  },
  barraLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: 500,
    marginTop: 6,
  },
  statusBox: {
    borderRadius: 10,
    border: '1.5px solid',
    padding: '10px 14px',
    marginBottom: 12,
  },
  statusRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
  },
  statusTexto: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 1.5,
  },
  legenda: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
  },
  legendaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  legendaDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
  },
  legendaLabel: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: 500,
  },
  placeholder: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 1.6,
  },
};

export default CardMeta;
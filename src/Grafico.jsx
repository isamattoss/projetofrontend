import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import './grafico.style.css';

Chart.register(...registerables); //registra todos os componentes do Chart.js necessários para o gráfico

const Grafico = ({ redacoes }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        //filtra as redações corrigidas e ordena por data (+antigas primeiro)
        const redacoesCorrigidas = redacoes
            .filter(r => r.status === 'Corrigida' && r.nota !== null)
            .sort((a, b) => a.id - b.id) //ordem cronologica
            .slice(-5); //5 mais recentes

        if (chartRef.current && redacoesCorrigidas.length > 0) {
            //DESTRUIR gráfico anterior se existir
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            const grafico = chartRef.current.getContext('2d'); //cria o gráfico do contexto 2d do canvas

            chartInstanceRef.current = new Chart(grafico, {
                type: 'line', //linha do chart.js
                data: { //dados do gráfico
                    labels: redacoesCorrigidas.map(r => `Redação #${r.id}`),
                    datasets: [{//array dos dados do gráfico
                        label: 'Nota', //nomes do eixo x (linha horizontal)
                        data: redacoesCorrigidas.map(r => r.nota), //array dos valores do eixo y (linha vertical) - notas das redações
                        borderColor: '#2817bf',
                        backgroundColor: 'rgba(23, 170, 191, 0.1)',
                        borderWidth: 3,
                        fill: true, //estilo para preencher área abaixo da linha
                        tension: 0.4,//estilo curvatura da linha (0 = reta, 1 = muito curva)
                        pointBackgroundColor: '#17a3bf',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2, //estilo espessura da borda
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        pointHoverBackgroundColor: '#1757bf',
                        pointHoverBorderColor: '#fff',
                        pointHoverBorderWidth: 3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,//não mantém proporção fixa (permite altura customizada)
                    plugins: {
                        legend: {
                            display: false //oculta a legenda ("nota") => + limpo
                        },
                        tooltip: { //balãozinho de informações
                            backgroundColor: '#196cd9',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            padding: 12,
                            cornerRadius: 8,
                            displayColors: false,
                            callbacks: {
                                title: function(context) { //mostra o título da redação no topo do balãozinho
                                    const index = context[0].dataIndex;
                                    return redacoesCorrigidas[index].titulo;
                                },
                                label: function(context) { //nota: x pontos
                                    return `Nota: ${context.parsed.y} pontos`;
                                },
                                afterLabel: function(context) { //mostra o tema da redação
                                    const index = context.dataIndex;
                                    return `Tema: ${redacoesCorrigidas[index].tema}`;
                                }
                            }
                        }
                    },
                    scales: { //eixos
                        y: { //y vertical (notas)
                            beginAtZero: true,//começa do zero
                            max: 1000, //nota máxima mil
                            ticks: {
                                color: '#64748b',
                                font: {
                                    size: 12
                                },
                                callback: function(value) {
                                    return value;
                                }
                            },
                            grid: {
                                color: 'rgba(100, 116, 139, 0.1)',
                                drawBorder: false //não desenha borda do eixo
                            }
                        },
                        x: {// x horizontal (redações)
                            ticks: {
                                color: '#64748b',
                                font: {
                                    size: 12
                                }
                            },
                            grid: {
                                display: false,
                                drawBorder: false //não desenha borda do eixo
                            }
                        }
                    }
                }
            });
        }

        //executa quando o componente for desmontado ou redacoes mudarem  - destruir libera memória
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [redacoes]);

    const redacoesCorrigidas = redacoes.filter(r => r.status === "Corrigida" && r.nota !== null);

    if (redacoesCorrigidas.length === 0) { //se nenhuma redação corrigida - mensagem vazia
        return (
            <div className="chart-container">
                <div className="chart-header">
                    <h3>Evolução das Últimas 5 Redações</h3>
                    <p>Acompanhe seu progresso ao longo do tempo</p>
                </div>
                <div className="chart-empty">
                    <p>Ainda não há redações corrigidas para exibir o gráfico.</p>
                    <p>Continue praticando! 📝</p>
                </div>
            </div>
        );
    }

    return ( //redações corrigidas - gráfico
        <div className="chart-container">
            <div className="chart-header">
                <h3>Evolução das Últimas 5 Redações</h3>
                <p>Acompanhe seu progresso ao longo do tempo</p>
            </div>
            <div className="chart-wrapper">
                { <canvas ref={chartRef}></canvas> /*gráfico */}
            </div>
        </div>
    );
};

export default Grafico;
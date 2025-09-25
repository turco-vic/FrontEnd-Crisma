"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './PainelCoordenador.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaUsers, FaChalkboardTeacher, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { HiUserGroup, HiAcademicCap } from 'react-icons/hi';
import axios from 'axios';

export default function PainelCoordenador() {
    const router = useRouter();
    
    const [turmas, setTurmas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    const fetchTurmas = async () => {
        try {
            setLoading(true);
            setError(null);
            
            console.log('Fazendo requisição para: http://localhost:3000/api/turmas');
            const response = await axios.get('http://localhost:3000/api/turmas', {
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const turmasData = response.data;
            console.log('Dados recebidos:', turmasData);
            
            const turmasComCrismandos = await Promise.all(
                turmasData.map(async (turma) => {
                    try {
                        console.log(`Buscando crismandos para turma ${turma.id}`);
                        const crismandosResponse = await axios.get(`http://localhost:3000/api/turmas`, {
                            timeout: 5000,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        const numeroCrismandos = crismandosResponse.data.length;
                        
                        return {
                            id: turma.id,
                            nome: turma.name,
                            coordenador: turma.coordinator_name || 'Não definido',
                            numeroAlunos: numeroCrismandos,
                            horario: formatarHorario(turma.meeting_day, turma.meeting_time),
                            status: turma.status === 'active' ? 'Ativa' : 'Pausada',
                            ano: turma.year,
                            descricao: turma.description,
                            local: turma.classroom_location,
                            capacidadeMaxima: turma.max_capacity,
                            telefone: turma.coordinator_phone,
                            email: turma.coordinator_email,
                            dataInicio: turma.start_date,
                            dataFim: turma.end_date
                        };
                    } catch (error) {
                        console.error(`Erro ao buscar crismandos da turma ${turma.id}:`, error);
                        return {
                            id: turma.id,
                            nome: turma.name,
                            coordenador: turma.coordinator_name || 'Não definido',
                            numeroAlunos: 0,
                            horario: formatarHorario(turma.meeting_day, turma.meeting_time),
                            status: turma.status === 'active' ? 'Ativa' : 'Pausada',
                            ano: turma.year,
                            descricao: turma.description,
                            local: turma.classroom_location,
                            capacidadeMaxima: turma.max_capacity,
                            telefone: turma.coordinator_phone,
                            email: turma.coordinator_email,
                            dataInicio: turma.start_date,
                            dataFim: turma.end_date
                        };
                    }
                })
            );
            
            setTurmas(turmasComCrismandos);
        } catch (error) {
            console.error('Erro ao carregar turmas:', error);
            console.error('Detalhes do erro:', error.response?.data || error.message);
            setError('Erro ao conectar com o backend. Verifique se o servidor está funcionando.');
            setTurmas([]);
        } finally {
            setLoading(false);
        }
    };

    const formatarHorario = (dia, hora) => {
        if (!dia || !hora) return 'Não definido';
        
        const diasSemana = {
            'monday': 'Segunda-feira',
            'tuesday': 'Terça-feira', 
            'wednesday': 'Quarta-feira',
            'thursday': 'Quinta-feira',
            'friday': 'Sexta-feira',
            'saturday': 'Sábado',
            'sunday': 'Domingo'
        };
        
        const diaFormatado = diasSemana[dia.toLowerCase()] || dia;
        const horaFormatada = hora.substring(0, 5);
        
        return `${diaFormatado}s ${horaFormatada}`;
    };

    useEffect(() => {
        fetchTurmas();
    }, []);

    const handleTurmaClick = (turmaId) => {
        router.push(`/painel-controle/turmas/${turmaId}`);
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className={styles.container}>
                    <div className={styles.hero}>
                        <h1 className={styles.title}>Painel do Coordenador</h1>
                        <p className={styles.subtitle}>Carregando...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className={styles.container}>
                    <div className={styles.hero}>
                        <h1 className={styles.title}>Painel do Coordenador</h1>
                        <p className={styles.subtitle}>{error}</p>
                        <button 
                            onClick={fetchTurmas}
                            className={styles.retryButton}
                        >
                            Tentar Novamente
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const turmasAtivas = turmas.filter(turma => turma.status === "Ativa");
    const turmasPausadas = turmas.filter(turma => turma.status === "Pausada");
    const totalAlunos = turmas.reduce((total, turma) => total + turma.numeroAlunos, 0);

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.hero}>
                    <h1 className={styles.title}>Painel do Coordenador</h1>
                    <p className={styles.subtitle}>
                        Gerencie as turmas de crisma e acompanhe o desenvolvimento dos crismandos
                    </p>
                </div>

                <div className={styles.content}>
                    <div className={styles.statsContainer}>
                        <div className={styles.statCard}>
                            <HiUserGroup className={styles.statIcon} />
                            <div className={styles.statInfo}>
                                <h3 className={styles.statNumber}>{turmas.length}</h3>
                                <p className={styles.statLabel}>Total de Turmas</p>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <FaUsers className={styles.statIcon} />
                            <div className={styles.statInfo}>
                                <h3 className={styles.statNumber}>{totalAlunos}</h3>
                                <p className={styles.statLabel}>Total de Crismandos</p>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <HiAcademicCap className={styles.statIcon} />
                            <div className={styles.statInfo}>
                                <h3 className={styles.statNumber}>{turmasAtivas.length}</h3>
                                <p className={styles.statLabel}>Turmas Ativas</p>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <FaChalkboardTeacher className={styles.statIcon} />
                            <div className={styles.statInfo}>
                                <h3 className={styles.statNumber}>{turmas.filter(t => t.coordenador !== 'Não definido').length}</h3>
                                <p className={styles.statLabel}>Coordenadores</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.turmasSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Turmas Ativas</h2>
                            <p className={styles.sectionDescription}>
                                {turmas.length === 0 
                                    ? "Nenhuma turma encontrada. Verifique se o backend está conectado."
                                    : "Clique em uma turma para ver os detalhes e crismandos"
                                }
                            </p>
                        </div>

                        {turmasAtivas.length === 0 ? (
                            <div className={styles.noData}>
                                <p>Nenhuma turma ativa encontrada.</p>
                            </div>
                        ) : (
                            <div className={styles.turmasGrid}>
                                {turmasAtivas.map((turma) => (
                                    <div
                                    key={turma.id}
                                    className={styles.turmaCard}
                                    onClick={() => handleTurmaClick(turma.id)}
                                    >
                                    <div className={styles.turmaHeader}>
                                        <h3 className={styles.turmaNome}>{turma.nome}</h3>
                                        <div className={styles.turmaStatus}>
                                            <span className={styles.statusBadge}>{turma.status}</span>
                                        </div>
                                    </div>

                                    <div className={styles.turmaInfo}>
                                        <div className={styles.infoItem}>
                                            <FaChalkboardTeacher className={styles.infoIcon} />
                                            <span className={styles.infoText}>{turma.coordenador}</span>
                                        </div>

                                        <div className={styles.infoItem}>
                                            <FaUsers className={styles.infoIcon} />
                                            <span className={styles.infoText}>{turma.numeroAlunos} crismandos</span>
                                        </div>

                                        <div className={styles.infoItem}>
                                            <FaCalendarAlt className={styles.infoIcon} />
                                            <span className={styles.infoText}>{turma.horario}</span>
                                        </div>

                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Ano:</span>
                                            <span className={styles.infoText}>{turma.ano}</span>
                                        </div>
                                    </div>

                                    <div className={styles.turmaFooter}>
                                        <span className={styles.viewDetails}>Ver Detalhes</span>
                                        <FaArrowRight className={styles.arrowIcon} />
                                    </div>
                                </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {turmasPausadas.length > 0 && (
                        <div className={styles.turmasSection}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTitle}>Turmas Pausadas</h2>
                                <p className={styles.sectionDescription}>Turmas temporariamente inativas</p>
                            </div>

                            <div className={styles.turmasGrid}>
                                {turmasPausadas.map((turma) => (
                                    <div
                                        key={turma.id}
                                        className={`${styles.turmaCard} ${styles.turmaCardPausada}`}
                                        onClick={() => handleTurmaClick(turma.id)}
                                    >
                                        <div className={styles.turmaHeader}>
                                            <h3 className={styles.turmaNome}>{turma.nome}</h3>
                                            <div className={styles.turmaStatus}>
                                                <span className={`${styles.statusBadge} ${styles.statusPausada}`}>{turma.status}</span>
                                            </div>
                                        </div>

                                        <div className={styles.turmaInfo}>
                                            <div className={styles.infoItem}>
                                                <FaChalkboardTeacher className={styles.infoIcon} />
                                                <span className={styles.infoText}>{turma.coordenador}</span>
                                            </div>

                                            <div className={styles.infoItem}>
                                                <FaUsers className={styles.infoIcon} />
                                                <span className={styles.infoText}>{turma.numeroAlunos} crismandos</span>
                                            </div>

                                            <div className={styles.infoItem}>
                                                <FaCalendarAlt className={styles.infoIcon} />
                                                <span className={styles.infoText}>{turma.horario}</span>
                                            </div>

                                            <div className={styles.infoItem}>
                                                <span className={styles.infoLabel}>Ano:</span>
                                                <span className={styles.infoText}>{turma.ano}</span>
                                            </div>
                                        </div>

                                        <div className={styles.turmaFooter}>
                                            <span className={styles.viewDetails}>Ver Detalhes</span>
                                            <FaArrowRight className={styles.arrowIcon} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

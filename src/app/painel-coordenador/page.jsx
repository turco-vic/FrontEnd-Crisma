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

    const getMockData = () => {
        return [
            {
                id: 1,
                nome: "Turma São Francisco",
                coordenador: "Padre João Silva",
                numeroAlunos: 25,
                horario: "Sábados 14:00",
                status: "Ativa",
                ano: "2024",
                descricao: "Turma de crisma com foco na espiritualidade franciscana",
                local: "Sala 1 - Catequese",
                capacidadeMaxima: 25,
                telefone: "(11) 3456-7890",
                email: "joao.silva@paroquia.com",
                dataInicio: "2024-02-10",
                dataFim: "2024-11-30"
            },
            {
                id: 2,
                nome: "Turma Santa Clara",
                coordenador: "Catequista Maria Santos",
                numeroAlunos: 22,
                horario: "Domingos 15:30",
                status: "Ativa",
                ano: "2024",
                descricao: "Turma de crisma inspirada em Santa Clara de Assis",
                local: "Sala 2 - Catequese",
                capacidadeMaxima: 30,
                telefone: "(11) 9876-5432",
                email: "maria.santos@paroquia.com",
                dataInicio: "2024-02-11",
                dataFim: "2024-12-01"
            },
            {
                id: 3,
                nome: "Turma São José",
                coordenador: "Diácono Pedro Costa",
                numeroAlunos: 18,
                horario: "Sábados 16:00",
                status: "Ativa",
                ano: "2024",
                descricao: "Turma de crisma dedicada a São José",
                local: "Sala 3 - Catequese",
                capacidadeMaxima: 20,
                telefone: "(11) 2345-6789",
                email: "pedro.costa@paroquia.com",
                dataInicio: "2024-02-10",
                dataFim: "2024-11-30"
            },
            {
                id: 4,
                nome: "Turma Santo Antônio",
                coordenador: "Catequista Ana Rodrigues",
                numeroAlunos: 20,
                horario: "Domingos 08:30",
                status: "Ativa",
                ano: "2024",
                descricao: "Turma focada nos ensinamentos de Santo Antônio de Pádua",
                local: "Sala 4 - Catequese",
                capacidadeMaxima: 28,
                telefone: "(11) 8765-4321",
                email: "ana.rodrigues@paroquia.com",
                dataInicio: "2024-02-11",
                dataFim: "2024-12-01"
            },
            {
                id: 5,
                nome: "Turma São Paulo",
                coordenador: "Padre Carlos Mendes",
                numeroAlunos: 15,
                horario: "Sábados 09:00",
                status: "Pausada",
                ano: "2024",
                descricao: "Turma baseada nos ensinamentos do Apóstolo Paulo",
                local: "Salão Paroquial",
                capacidadeMaxima: 35,
                telefone: "(11) 5432-1098",
                email: "carlos.mendes@paroquia.com",
                dataInicio: "2024-02-10",
                dataFim: "2024-11-30"
            }
        ];
    };

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
                        const crismandosResponse = await axios.get(`http://localhost:3000/api/turmas/${turma.id}/crismandos`, {
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
            console.log('Usando dados mock como fallback...');
            setTurmas(getMockData());
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

    const handleSalaClick = (salaId) => {
        router.push(`/painel-coordenador/sala/${salaId}`);
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

    const salasAtivas = turmas.filter(sala => sala.status === "Ativa");
    const salasPausadas = turmas.filter(sala => sala.status === "Pausada");
    const totalAlunos = turmas.reduce((total, sala) => total + sala.numeroAlunos, 0);

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.hero}>
                    <h1 className={styles.title}>Painel do Coordenador</h1>
                    <p className={styles.subtitle}>
                        Gerencie as salas de crisma e acompanhe o desenvolvimento dos crismandos
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
                                <h3 className={styles.statNumber}>{salasAtivas.length}</h3>
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

                    <div className={styles.salasSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Turmas Ativas</h2>
                            <p className={styles.sectionDescription}>Clique em uma turma para ver os detalhes e crismandos</p>
                        </div>

                        <div className={styles.salasGrid}>
                            {salasAtivas.map((sala) => (
                                <div
                                    key={sala.id}
                                    className={styles.salaCard}
                                    onClick={() => handleSalaClick(sala.id)}
                                >
                                    <div className={styles.salaHeader}>
                                        <h3 className={styles.salaNome}>{sala.nome}</h3>
                                        <div className={styles.salaStatus}>
                                            <span className={styles.statusBadge}>{sala.status}</span>
                                        </div>
                                    </div>

                                    <div className={styles.salaInfo}>
                                        <div className={styles.infoItem}>
                                            <FaChalkboardTeacher className={styles.infoIcon} />
                                            <span className={styles.infoText}>{sala.coordenador}</span>
                                        </div>

                                        <div className={styles.infoItem}>
                                            <FaUsers className={styles.infoIcon} />
                                            <span className={styles.infoText}>{sala.numeroAlunos} crismandos</span>
                                        </div>

                                        <div className={styles.infoItem}>
                                            <FaCalendarAlt className={styles.infoIcon} />
                                            <span className={styles.infoText}>{sala.horario}</span>
                                        </div>

                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Ano:</span>
                                            <span className={styles.infoText}>{sala.ano}</span>
                                        </div>
                                    </div>

                                    <div className={styles.salaFooter}>
                                        <span className={styles.viewDetails}>Ver Detalhes</span>
                                        <FaArrowRight className={styles.arrowIcon} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {salasPausadas.length > 0 && (
                        <div className={styles.salasSection}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTitle}>Turmas Pausadas</h2>
                                <p className={styles.sectionDescription}>Turmas temporariamente inativas</p>
                            </div>

                            <div className={styles.salasGrid}>
                                {salasPausadas.map((sala) => (
                                    <div
                                        key={sala.id}
                                        className={`${styles.salaCard} ${styles.salaCardPausada}`}
                                        onClick={() => handleSalaClick(sala.id)}
                                    >
                                        <div className={styles.salaHeader}>
                                            <h3 className={styles.salaNome}>{sala.nome}</h3>
                                            <div className={styles.salaStatus}>
                                                <span className={`${styles.statusBadge} ${styles.statusPausada}`}>{sala.status}</span>
                                            </div>
                                        </div>

                                        <div className={styles.salaInfo}>
                                            <div className={styles.infoItem}>
                                                <FaChalkboardTeacher className={styles.infoIcon} />
                                                <span className={styles.infoText}>{sala.coordenador}</span>
                                            </div>

                                            <div className={styles.infoItem}>
                                                <FaUsers className={styles.infoIcon} />
                                                <span className={styles.infoText}>{sala.numeroAlunos} crismandos</span>
                                            </div>

                                            <div className={styles.infoItem}>
                                                <FaCalendarAlt className={styles.infoIcon} />
                                                <span className={styles.infoText}>{sala.horario}</span>
                                            </div>

                                            <div className={styles.infoItem}>
                                                <span className={styles.infoLabel}>Ano:</span>
                                                <span className={styles.infoText}>{sala.ano}</span>
                                            </div>
                                        </div>

                                        <div className={styles.salaFooter}>
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

"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './PainelControle.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaUsers, FaChalkboardTeacher, FaArrowRight } from 'react-icons/fa';
import { HiUserGroup, HiAcademicCap } from 'react-icons/hi';
import axios from 'axios';

export default function PainelControle() {
    const router = useRouter();
    
    const [turmas, setTurmas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalAlunos, setTotalAlunos] = useState(0);
    const [coordenadores, setCoordenadores] = useState([]);

    const fetchTurmas = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await axios.get('http://localhost:3000/api/turmas', {
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            try {
                const coordenadoresResponse = await axios.get('http://localhost:3000/api/coordenadores', {
                    timeout: 5000,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setCoordenadores(coordenadoresResponse.data || []);
            } catch (coordError) {
                setCoordenadores([]);
            }

            try {
                const crismandosResponse = await axios.get('http://localhost:3000/api/crismandos', {
                    timeout: 5000,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setTotalAlunos(crismandosResponse.data.length || 0);
            } catch (crismandosError) {
                setTotalAlunos(0);
            }
            
            const turmasData = response.data;
            
            const turmasComCrismandos = await Promise.all(
                turmasData.map(async (turma) => {
                    try {
                        const crismandosResponse = await axios.get(`http://localhost:3000/api/crismandos?turma_id=${turma.id}`, {
                            timeout: 5000,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        const numeroCrismandos = crismandosResponse.data.length;
                        
                        return {
                            id: turma.id,
                            nome: turma.name,
                            numeroAlunos: numeroCrismandos,
                            horario: formatarHorario(turma.meeting_day, turma.meeting_time),
                            status: turma.status === 'active' ? 'Ativa' : 'Pausada',
                            ano: turma.year,
                            descricao: turma.description,
                            local: turma.classroom_location,
                            dataInicio: turma.start_date,
                            dataFim: turma.end_date
                        };
                    } catch (error) {
                        return {
                            id: turma.id,
                            nome: turma.name,
                            numeroAlunos: 0,
                            horario: formatarHorario(turma.meeting_day, turma.meeting_time),
                            status: turma.status === 'active' ? 'Ativa' : 'Pausada',
                            ano: turma.year,
                            descricao: turma.description,
                            local: turma.classroom_location,
                            dataInicio: turma.start_date,
                            dataFim: turma.end_date
                        };
                    }
                })
            );
            
            setTurmas(turmasComCrismandos);
            
        } catch (error) {
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

    const handleCardClick = (categoria) => {
        router.push(`/painel-controle/${categoria}`);
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

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.hero}>
                    <h1 className={styles.title}>Painel de Controle</h1>
                    <p className={styles.subtitle}>Clique em uma categoria para ver os detalhes</p>
                </div>

                <div className={styles.content}>
                    <div className={styles.statsContainer}>
                        <div 
                            className={`${styles.statCard} ${styles.clickableCard}`}
                            onClick={() => handleCardClick('turmas')}
                        >
                            <HiUserGroup className={styles.statIcon} />
                            <div className={styles.statInfo}>
                                <h3 className={styles.statNumber}>{turmas.length}</h3>
                                <p className={styles.statLabel}>Total de Turmas</p>
                            </div>
                            <FaArrowRight className={styles.cardArrow} />
                        </div>

                        <div 
                            className={`${styles.statCard} ${styles.clickableCard}`}
                            onClick={() => handleCardClick('turmas-ativas')}
                        >
                            <HiAcademicCap className={styles.statIcon} />
                            <div className={styles.statInfo}>
                                <h3 className={styles.statNumber}>{turmasAtivas.length}</h3>
                                <p className={styles.statLabel}>Turmas Ativas</p>
                            </div>
                            <FaArrowRight className={styles.cardArrow} />
                        </div>

                        <div 
                            className={`${styles.statCard} ${styles.clickableCard}`}
                            onClick={() => handleCardClick('crismandos')}
                        >
                            <FaUsers className={styles.statIcon} />
                            <div className={styles.statInfo}>
                                <h3 className={styles.statNumber}>{totalAlunos}</h3>
                                <p className={styles.statLabel}>Total de Crismandos</p>
                            </div>
                            <FaArrowRight className={styles.cardArrow} />
                        </div>

                        <div 
                            className={`${styles.statCard} ${styles.clickableCard}`}
                            onClick={() => handleCardClick('coordenadores')}
                        >
                            <FaChalkboardTeacher className={styles.statIcon} />
                            <div className={styles.statInfo}>
                                <h3 className={styles.statNumber}>{coordenadores.length}</h3>
                                <p className={styles.statLabel}>Coordenadores</p>
                            </div>
                            <FaArrowRight className={styles.cardArrow} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

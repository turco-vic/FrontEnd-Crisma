"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './DetalheTurma.module.css';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import {
    FaArrowLeft,
    FaArrowRight,
    FaUsers,
    FaClock,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaUser,
    FaBirthdayCake,
    FaCalendarAlt,
    FaInfoCircle,
    FaExclamationTriangle
} from 'react-icons/fa';
import { HiAcademicCap, HiUserGroup } from 'react-icons/hi';
import Image from 'next/image';
import axios from 'axios';

export default function DetalheTurma() {
    function formatarData(dataStr) {
        if (!dataStr) return 'N/A';
        const data = new Date(dataStr);
        if (isNaN(data)) return 'N/A';
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}-${mes}-${ano}`;
    }
    const params = useParams();
    const router = useRouter();
    const id = parseInt(params.id);

    const [turma, setTurma] = useState(null);
    const [crismandos, setCrismandos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTurmaData = async () => {
            try {
                setLoading(true);
                setError(null);

                const turmaResponse = await axios.get(`http://localhost:3000/api/turmas/${id}`, { timeout: 5000 });
                const crismandosResponse = await axios.get(`http://localhost:3000/api/crismandos/turma/${id}`, { timeout: 5000 });

                console.log("AAAAAAAAAAAAAAAAAA");

                console.log(turmaResponse.data);

                setTurma(turmaResponse.data);
                setCrismandos(crismandosResponse.data || []);
            } catch (err) {
                console.error('Erro ao carregar dados da turma:', err);
                setError('Não foi possível conectar ao servidor. Verifique se o backend está funcionando.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchTurmaData();
        }
    }, [id]);

    function calcularIdade(birthday) {
        if (!birthday) return null;
        const nascimento = new Date(birthday);
        const hoje = new Date();
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const m = hoje.getMonth() - nascimento.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    }

    if (loading) {
        return (
            <>
                <Header />
                <div className={styles.container}>
                    <div className={styles.loading}>
                        <HiAcademicCap className={styles.loadingIcon} />
                        <h2>Carregando dados da turma...</h2>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error || !turma) {
        return (
            <>
                <Header />
                <div className={styles.container}>
                    <div className={styles.notFound}>
                        <FaExclamationTriangle className={styles.errorIcon} />
                        <h1>Turma não encontrada</h1>
                        <p>{error || 'A turma solicitada não foi encontrada ou o servidor não está disponível.'}</p>
                        <button
                            onClick={() => router.push('/painel-controle')}
                            className={styles.backButton}
                        >
                            <FaArrowLeft />
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.hero}>
                    <button
                        onClick={() => router.push('/painel-controle')}
                        className={styles.backButton}
                    >
                        <FaArrowLeft />
                    </button>
                    <HiAcademicCap className={styles.heroIcon} />
                    <h1 className={styles.title}>{turma.name || turma.nome}</h1>
                    <p className={styles.subtitle}>
                        <span className={`${styles.status} ${turma.status === 'Ativa' ? styles.active : styles.inactive}`}>
                            {turma.status || 'Ativa'}
                        </span>
                    </p>
                </div>

                <div className={styles.content}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <FaInfoCircle className={styles.sectionIcon} />
                            Informações da Turma
                        </h2>
                        <div className={styles.infoGrid}>

                            <div className={styles.infoCard}>
                                <FaUsers className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Número de Crismandos</h3>
                                    <p className={styles.cardText}>{turma.total_crismandos || 0}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaClock className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Horário</h3>
                                    <p className={styles.cardText}>{turma.meeting_time || turma.horario || 'N/A'}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaMapMarkerAlt className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Local</h3>
                                    <p className={styles.cardText}>{turma.classroom_location || 'N/A'}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaCalendarAlt className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Início</h3>
                                    <p className={styles.cardText}>
                                        {formatarData(turma.start_date)}
                                    </p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaCalendarAlt className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Fim</h3>
                                    <p className={styles.cardText}>{formatarData(turma.end_date)}</p>
                                </div>
                            </div>
                        </div>

                        {turma.description && (
                            <div className={styles.description}>
                                <h3 className={styles.descriptionTitle}>Descrição</h3>
                                <p className={styles.descriptionText}>{turma.description}</p>
                            </div>
                        )}
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <HiUserGroup className={styles.sectionIcon} />
                            Lista de Crismandos ({turma.total_crismandos || 0})
                        </h2>

                        {turma.total_crismandos === 0 ? (
                            <div className={styles.emptyCrismandos}>
                                <HiUserGroup className={styles.emptyIcon} />
                                <h3>Nenhum crismando cadastrado</h3>
                                <p>Esta turma ainda não possui crismandos cadastrados no sistema.</p>
                            </div>
                        ) : (
                            <div className={styles.crismandosGrid}>
                                {crismandos.map((crismando, idx) => (
                                    <div
                                        key={crismando.id}
                                        className={styles.crismandoCard}
                                        onClick={() => router.push(`/painel-controle/turmas/${id}/crismandos/${crismando.id}`)}
                                    >
                                        <div className={styles.crismandoAvatar}>{idx + 1}</div>
                                        <div className={styles.crismandoInfo}>
                                            {/* <Image
                                                src={crismando.profile_photo || '/default-avatar.png'}
                                                alt={`${crismando.name} ${crismando.surname}`}
                                                width={64}
                                                height={64}
                                            /> */}
                                            <div className={styles.nameSurname}>
                                                <span className={styles.crismandoIcon}><FaUser /></span>
                                                <h4 className={styles.crismandoName}>
                                                    {crismando.name}
                                                </h4>
                                                <h4 className={styles.crismandoSurname}>
                                                    {crismando.surname}
                                                </h4>
                                            </div>
                                            <p className={styles.crismandoDetails}>
                                                <span className={styles.crismandoIcon}><FaBirthdayCake /></span>
                                                {
                                                    crismando.age ? `${crismando.age} anos`
                                                        : crismando.idade ? `${crismando.idade} anos`
                                                            : crismando.birthday ? `${calcularIdade(crismando.birthday)} anos`
                                                                : 'Idade não informada'
                                                }
                                            </p>
                                            <p className={styles.crismandoContact}>
                                                <span className={styles.crismandoIcon}><FaPhone /></span>
                                                {crismando.phone_number || crismando.telefone || 'Telefone não informado'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

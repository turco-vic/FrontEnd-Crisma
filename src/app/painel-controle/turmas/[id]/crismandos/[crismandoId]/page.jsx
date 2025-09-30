"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './DetalheCrismando.module.css';
import Header from '../../../../../../components/Header';
import Footer from '../../../../../../components/Footer';
import { 
    FaArrowLeft, 
    FaUser, 
    FaBirthdayCake, 
    FaPhone, 
    FaEnvelope, 
    FaMapMarkerAlt, 
    FaCalendarAlt,
    FaIdCard,
    FaChalkboardTeacher,
    FaWhatsapp,
    FaInstagram,
    FaRoad,
    FaHashtag,
    FaBuilding,
    FaMapMarkedAlt,
    FaCity,
    FaClock,
    FaCheckCircle,
    FaPlay,
    FaStop,
    FaInfoCircle
} from 'react-icons/fa';
import { HiAcademicCap, HiUserGroup } from 'react-icons/hi';
import axios from 'axios';

export default function DetalheCrismando() {
    const params = useParams();
    const router = useRouter();
    const turmaId = parseInt(params.id);
    const crismandoId = parseInt(params.crismandoId);

    const [crismando, setCrismando] = useState(null);
    const [turma, setTurma] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCrismandoData = async () => {
            try {
                setLoading(true);
                setError(null);

                const turmaResponse = await axios.get(`http://localhost:3000/api/turmas/${turmaId}`, { timeout: 5000 });
                const crismandosResponse = await axios.get(`http://localhost:3000/api/crismandos/${crismandoId}`, { timeout: 5000 });

                const turmaData = turmaResponse.data;
                const crismandoData = crismandosResponse.data

                console.log("Dados da turma:", turmaData);
                console.log("Dados dos crismandos:", crismandoData);

                setTurma(turmaData);
                setCrismando(crismandoData);
                
            } catch (err) {
                console.error('Erro ao carregar dados do crismando:', err);
                setError('Não foi possível conectar ao servidor. Verifique se o backend está funcionando.');
            } finally {
                setLoading(false);
            }
        };

        if (turmaId && crismandoId) {
            fetchCrismandoData();
        }
    }, [turmaId, crismandoId]);

    const formatWhatsAppLink = (telefone) => {
        const cleanPhone = telefone.replace(/\D/g, '');
        return `https://wa.me/55${cleanPhone}`;
    };

    // Função para formatar data de nascimento como DD/MM/AAAA
    const formatarData = (data) => {
        if (!data) return 'N/A';
        const d = new Date(data);
        if (isNaN(d.getTime())) return 'N/A';
        const dia = String(d.getDate()).padStart(2, '0');
        const mes = String(d.getMonth() + 1).padStart(2, '0');
        const ano = d.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    // Função para calcular idade a partir da data de nascimento
    const calcularIdade = (data) => {
        if (!data) return 'N/A';
        const nascimento = new Date(data);
        if (isNaN(nascimento.getTime())) return 'N/A';
        const hoje = new Date();
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const m = hoje.getMonth() - nascimento.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className={styles.container}>
                    <div className={styles.loading}>
                        <HiAcademicCap className={styles.loadingIcon} />
                        <h2>Carregando dados do crismando...</h2>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error || !crismando || !turma) {
        return (
            <>
                <Header />
                <div className={styles.container}>
                    <div className={styles.notFound}>
                        <h1>Crismando não encontrado</h1>
                        <p>{error || 'O crismando solicitado não foi encontrado ou o servidor não está disponível.'}</p>
                        <button 
                            onClick={() => router.push(`/painel-controle/turma/${turmaId}`)} 
                            className={styles.backButton}
                        >
                            <FaArrowLeft /> Voltar para a Turma
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
                        onClick={() => router.push(`/painel-controle/turmas/${turmaId}`)} 
                        className={styles.backButton}
                    >
                        <FaArrowLeft />  {turma.nome}
                    </button>
                    <HiAcademicCap className={styles.heroIcon} />
                    <h1 className={styles.title}>{crismando.nome || crismando.name}</h1>
                    <p className={styles.subtitle}>Crismando da {turma.name}</p>
                </div>

                <div className={styles.content}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <FaUser className={styles.sectionIcon} />
                            Informações Pessoais
                        </h2>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoCard}>
                                <FaIdCard className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Nome Completo</h3>
                                    <p className={styles.cardText}>{crismando.name && crismando.surname ? `${crismando.name} ${crismando.surname}` : 'N/A'}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaBirthdayCake className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Data de Nascimento</h3>
                                    <p className={styles.cardText}>{formatarData(crismando.birthday)}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaCalendarAlt className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Idade</h3>
                                    <p className={styles.cardText}>{calcularIdade(crismando.birthday) !== 'N/A' ? `${calcularIdade(crismando.birthday)} anos` : 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <FaPhone className={styles.sectionIcon} />
                            Contato
                        </h2>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoCard}>
                                <FaPhone className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Telefone</h3>
                                    <p className={styles.cardText}>{crismando.phone_number || 'N/A'}</p>
                                    {(crismando.phone_number) && (
                                        <a 
                                            href={formatWhatsAppLink(crismando.phone_number)} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={styles.whatsappLink}
                                        >
                                            <FaWhatsapp /> WhatsApp
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaEnvelope className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>E-mail</h3>
                                    <p className={styles.cardText}>
                                        {crismando.email ? (
                                            <a href={`mailto:${crismando.email}`} className={styles.emailLink}>
                                                {crismando.email}
                                            </a>
                                        ) : 'N/A'}
                                    </p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaMapMarkerAlt className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>CEP</h3>
                                    <p className={styles.cardText}>{crismando.cep || 'N/A'}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaRoad className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Rua</h3>
                                    <p className={styles.cardText}>{crismando.road || 'N/A'}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaHashtag className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Número</h3>
                                    <p className={styles.cardText}>{crismando.house_number || 'N/A'}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaBuilding className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Complemento</h3>
                                    <p className={styles.cardText}>{crismando.complement || 'N/A'}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaMapMarkedAlt className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Bairro</h3>
                                    <p className={styles.cardText}>{crismando.neighborhood || 'N/A'}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaCity className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Cidade</h3>
                                    <p className={styles.cardText}>{crismando.city || 'N/A'}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaInstagram className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Instagram</h3>
                                    <p className={styles.cardText}>{crismando.instagram || 'N/A'}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaUser className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Responsável</h3>
                                    <p className={styles.cardText}>{crismando.responsible_person || 'N/A'}</p>
                                </div>
                            </div>
                            
                            <div className={styles.infoCard}>
                                <FaPhone className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Telefone - Responsável</h3>
                                    <p className={styles.cardText}>{crismando.responsible_person_phone || 'N/A'}</p>
                                    {(crismando.responsible_person_phone) && (
                                        <a 
                                            href={formatWhatsAppLink(crismando.responsible_person_phone)} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={styles.whatsappLink}
                                        >
                                            <FaWhatsapp /> WhatsApp
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <FaChalkboardTeacher className={styles.sectionIcon} />
                            Turma
                        </h2>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoCard}>
                                <FaChalkboardTeacher className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Turma</h3>
                                    <p className={styles.cardText}>{turma.name}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaCalendarAlt className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Ano</h3>
                                    <p className={styles.cardText}>{turma.year}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaCalendarAlt className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Dia de Encontro</h3>
                                    <p className={styles.cardText}>{turma.meeting_day}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaClock className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Horário de Encontro</h3>
                                    <p className={styles.cardText}>{turma.meeting_time}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaMapMarkerAlt className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Localização</h3>
                                    <p className={styles.cardText}>{turma.classroom_location}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaCheckCircle className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Status</h3>
                                    <p className={styles.cardText}>{turma.status}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaPlay className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Começo</h3>
                                    <p className={styles.cardText}>{formatarData(turma.start_date)}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaStop className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Fim</h3>
                                    <p className={styles.cardText}>{formatarData(turma.end_date)}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaInfoCircle className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Descrição</h3>
                                    <p className={styles.cardText}>{turma.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

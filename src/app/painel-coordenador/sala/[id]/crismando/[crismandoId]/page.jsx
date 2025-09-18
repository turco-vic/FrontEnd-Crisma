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
    FaWhatsapp
} from 'react-icons/fa';
import { HiAcademicCap, HiUserGroup } from 'react-icons/hi';
import axios from 'axios';

export default function DetalheCrismando() {
    const params = useParams();
    const router = useRouter();
    const salaId = parseInt(params.id);
    const crismandoId = parseInt(params.crismandoId);

    const [crismando, setCrismando] = useState(null);
    const [sala, setSala] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCrismandoData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [salaResponse, crismandosResponse] = await Promise.all([
                    axios.get(`http://localhost:3000/api/turmas`, { timeout: 3000 }),
                    axios.get(`http://localhost:3000/api/turmas/${salaId}/crismandos`, { timeout: 3000 })
                ]);

                const salaData = salaResponse.data.find(s => s.id === salaId);
                const crismandoData = crismandosResponse.data.find(c => c.id === crismandoId);

                if (salaData && crismandoData) {
                    setSala({
                        nome: salaData.name,
                        coordenador: salaData.coordinator_name
                    });
                    setCrismando(crismandoData);
                } else {
                    throw new Error('Dados não encontrados');
                }
            } catch (err) {
                console.error('Erro ao carregar dados do crismando:', err);
                setError('Não foi possível conectar ao servidor. Verifique se o backend está funcionando.');
            } finally {
                setLoading(false);
            }
        };

        if (salaId && crismandoId) {
            fetchCrismandoData();
        }
    }, [salaId, crismandoId]);

    const formatWhatsAppLink = (telefone) => {
        const cleanPhone = telefone.replace(/\D/g, '');
        return `https://wa.me/55${cleanPhone}`;
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

    if (error || !crismando || !sala) {
        return (
            <>
                <Header />
                <div className={styles.container}>
                    <div className={styles.notFound}>
                        <h1>Crismando não encontrado</h1>
                        <p>{error || 'O crismando solicitado não foi encontrado ou o servidor não está disponível.'}</p>
                        <button 
                            onClick={() => router.push(`/painel-coordenador/sala/${salaId}`)} 
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
                        onClick={() => router.push(`/painel-coordenador/sala/${salaId}`)} 
                        className={styles.backButton}
                    >
                        <FaArrowLeft /> Voltar para {sala.nome}
                    </button>
                    <HiAcademicCap className={styles.heroIcon} />
                    <h1 className={styles.title}>{crismando.nome || crismando.name}</h1>
                    <p className={styles.subtitle}>Crismando da {sala.nome}</p>
                </div>

                <div className={styles.content}>
                    {/* Informações Pessoais */}
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
                                    <p className={styles.cardText}>{crismando.nome || crismando.name}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaBirthdayCake className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Data de Nascimento</h3>
                                    <p className={styles.cardText}>{crismando.nascimento || crismando.birth_date || 'N/A'}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaCalendarAlt className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Idade</h3>
                                    <p className={styles.cardText}>{crismando.idade || 'N/A'} anos</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contato */}
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
                                    <p className={styles.cardText}>{crismando.telefone || crismando.phone || 'N/A'}</p>
                                    {(crismando.telefone || crismando.phone) && (
                                        <a 
                                            href={formatWhatsAppLink(crismando.telefone || crismando.phone)} 
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
                                    <h3 className={styles.cardTitle}>Endereço</h3>
                                    <p className={styles.cardText}>{crismando.endereco || crismando.address || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Informações da Turma */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <FaChalkboardTeacher className={styles.sectionIcon} />
                            Turma
                        </h2>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoCard}>
                                <HiUserGroup className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Turma</h3>
                                    <p className={styles.cardText}>{sala.nome}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaChalkboardTeacher className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Coordenador</h3>
                                    <p className={styles.cardText}>{sala.coordenador}</p>
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

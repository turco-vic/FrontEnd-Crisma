"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './DetalheTurma.module.css';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import { FaArrowLeft, FaUsers, FaChalkboardTeacher, FaCalendarAlt, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBirthdayCake, FaIdCard } from 'react-icons/fa';
import { HiUserGroup, HiAcademicCap } from 'react-icons/hi';

export default function DetalheSala() {
    const params = useParams();
    const router = useRouter();
    const salaId = parseInt(params.id);

    const [sala, setSala] = useState(null);
    const [crismandos, setCrismandos] = useState([]);

    useEffect(() => {
        const salasData = {
            1: {
                id: 1,
                nome: "Sala São Francisco",
                coordenador: "Pe. João Silva",
                numeroAlunos: 25,
                idade: "14-16 anos",
                horario: "Sábados 09:00-10:30",
                status: "Ativa",
                descricao: "Sala dedicada à formação de jovens de 14 a 16 anos, focando nos valores franciscanos de simplicidade e amor ao próximo.",
                local: "Sala 1 - Segundo Andar",
                contato: {
                    telefone: "(19) 3258-2263",
                    email: "joao.silva@paroquia.com"
                }
            },
            2: {
                id: 2,
                nome: "Sala Santa Clara",
                coordenador: "Irmã Maria Santos",
                numeroAlunos: 22,
                idade: "15-17 anos",
                horario: "Sábados 10:45-12:15",
                status: "Ativa",
                descricao: "Sala inspirada em Santa Clara, promovendo a oração contemplativa e o serviço aos necessitados.",
                local: "Sala 2 - Primeiro Andar",
                contato: {
                    telefone: "(19) 3258-2264",
                    email: "maria.santos@paroquia.com"
                }
            },
            3: {
                id: 3,
                nome: "Sala Santo Antônio",
                coordenador: "Carlos Mendes",
                numeroAlunos: 18,
                idade: "16-18 anos",
                horario: "Sábados 14:00-15:30",
                status: "Ativa",
                descricao: "Focada na evangelização e missão, preparando jovens para serem verdadeiros missionários.",
                local: "Sala 3 - Térreo",
                contato: {
                    telefone: "(19) 3258-2265",
                    email: "carlos.mendes@paroquia.com"
                }
            },
            4: {
                id: 4,
                nome: "Sala Nossa Senhora",
                coordenador: "Ana Paula Costa",
                numeroAlunos: 20,
                idade: "14-15 anos",
                horario: "Sábados 15:45-17:15",
                status: "Ativa",
                descricao: "Dedicada à devoção mariana e formação dos valores cristãos fundamentais.",
                local: "Capela Lateral",
                contato: {
                    telefone: "(19) 3258-2266",
                    email: "ana.costa@paroquia.com"
                }
            },
            5: {
                id: 5,
                nome: "Sala São José",
                coordenador: "Roberto Lima",
                numeroAlunos: 15,
                idade: "17-19 anos",
                horario: "Domingos 08:00-09:30",
                status: "Pausada",
                descricao: "Temporariamente pausada para reestruturação do cronograma de atividades.",
                local: "Salão Principal",
                contato: {
                    telefone: "(19) 3258-2267",
                    email: "roberto.lima@paroquia.com"
                }
            },
            6: {
                id: 6,
                nome: "Sala Santa Teresinha",
                coordenador: "Luciana Oliveira",
                numeroAlunos: 28,
                idade: "14-16 anos",
                horario: "Domingos 10:00-11:30",
                status: "Ativa",
                descricao: "Inspirada no 'pequeno caminho' de Santa Teresinha, enfatizando a simplicidade e confiança em Deus.",
                local: "Sala 4 - Segundo Andar",
                contato: {
                    telefone: "(19) 3258-2268",
                    email: "luciana.oliveira@paroquia.com"
                }
            }
        };

        const crismandosData = {
            1: [
                { id: 1, nome: "Ana Silva Santos", idade: 15, telefone: "(19) 99876-5432", email: "ana.santos@email.com", endereco: "Rua das Flores, 123", nascimento: "15/03/2009" },
                { id: 2, nome: "Bruno Costa Lima", idade: 16, telefone: "(19) 98765-4321", email: "bruno.lima@email.com", endereco: "Av. Principal, 456", nascimento: "22/07/2008" },
                { id: 3, nome: "Carla Fernandes", idade: 15, telefone: "(19) 97654-3210", email: "carla.fernandes@email.com", endereco: "Rua São João, 789", nascimento: "10/11/2009" },
                { id: 4, nome: "Diego Oliveira", idade: 14, telefone: "(19) 96543-2109", email: "diego.oliveira@email.com", endereco: "Rua Santa Maria, 321", nascimento: "05/12/2009" },
                { id: 5, nome: "Eduarda Pereira", idade: 16, telefone: "(19) 95432-1098", email: "eduarda.pereira@email.com", endereco: "Av. das Palmeiras, 654", nascimento: "18/01/2008" }
            ],
            2: [
                { id: 6, nome: "Felipe Rodrigues", idade: 16, telefone: "(19) 94321-0987", email: "felipe.rodrigues@email.com", endereco: "Rua dos Pinheiros, 147", nascimento: "30/04/2008" },
                { id: 7, nome: "Gabriela Martins", idade: 17, telefone: "(19) 93210-9876", email: "gabriela.martins@email.com", endereco: "Rua da Esperança, 258", nascimento: "14/09/2007" },
                { id: 8, nome: "Henrique Alves", idade: 15, telefone: "(19) 92109-8765", email: "henrique.alves@email.com", endereco: "Av. São Paulo, 369", nascimento: "25/06/2009" },
                { id: 9, nome: "Isabela Costa", idade: 16, telefone: "(19) 91098-7654", email: "isabela.costa@email.com", endereco: "Rua Nova, 741", nascimento: "12/02/2008" }
            ],
            3: [
                { id: 10, nome: "João Pedro Silva", idade: 17, telefone: "(19) 90987-6543", email: "joao.silva@email.com", endereco: "Rua Central, 852", nascimento: "08/08/2007" },
                { id: 11, nome: "Larissa Santos", idade: 18, telefone: "(19) 89876-5432", email: "larissa.santos@email.com", endereco: "Av. Liberdade, 963", nascimento: "03/05/2006" },
                { id: 12, nome: "Marcos Vieira", idade: 16, telefone: "(19) 88765-4321", email: "marcos.vieira@email.com", endereco: "Rua do Comércio, 174", nascimento: "19/10/2007" }
            ],
            4: [
                { id: 13, nome: "Natália Ferreira", idade: 14, telefone: "(19) 87654-3210", email: "natalia.ferreira@email.com", endereco: "Rua Boa Vista, 285", nascimento: "27/03/2010" },
                { id: 14, nome: "Otávio Mendes", idade: 15, telefone: "(19) 86543-2109", email: "otavio.mendes@email.com", endereco: "Av. Brasil, 396", nascimento: "16/07/2009" },
                { id: 15, nome: "Patrícia Lima", idade: 14, telefone: "(19) 85432-1098", email: "patricia.lima@email.com", endereco: "Rua Alegria, 407", nascimento: "21/11/2009" }
            ],
            5: [
                { id: 16, nome: "Rafael Souza", idade: 18, telefone: "(19) 84321-0987", email: "rafael.souza@email.com", endereco: "Rua da Paz, 518", nascimento: "09/01/2006" },
                { id: 17, nome: "Sofia Barbosa", idade: 17, telefone: "(19) 83210-9876", email: "sofia.barbosa@email.com", endereco: "Av. Paulista, 629", nascimento: "24/04/2007" }
            ],
            6: [
                { id: 18, nome: "Thiago Cardoso", idade: 15, telefone: "(19) 82109-8765", email: "thiago.cardoso@email.com", endereco: "Rua Harmonia, 730", nascimento: "13/08/2009" },
                { id: 19, nome: "Valentina Rocha", idade: 16, telefone: "(19) 81098-7654", email: "valentina.rocha@email.com", endereco: "Av. das Nações, 841", nascimento: "06/12/2008" },
                { id: 20, nome: "William Castro", idade: 14, telefone: "(19) 80987-6543", email: "william.castro@email.com", endereco: "Rua Vitória, 952", nascimento: "28/02/2010" }
            ]
        };

        setSala(salasData[salaId] || null);
        setCrismandos(crismandosData[salaId] || []);
    }, [salaId]);

    if (!sala) {
        return (
            <>
                <Header />
                <div className={styles.container}>
                    <div className={styles.notFound}>
                        <h1>Sala não encontrada</h1>
                        <button onClick={() => router.push('/painel-coordenador')} className={styles.backButton}>
                            <FaArrowLeft /> Voltar ao Painel
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
                    <button onClick={() => router.push('/painel-coordenador')} className={styles.backButton}>
                        <FaArrowLeft /> Voltar ao Painel
                    </button>
                    <HiUserGroup className={styles.heroIcon} />
                    <h1 className={styles.title}>{sala.nome}</h1>
                    <p className={styles.subtitle}>{sala.descricao}</p>
                </div>

                <div className={styles.content}>
                    <div className={styles.salaInfoSection}>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoCard}>
                                <FaChalkboardTeacher className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Coordenador</h3>
                                    <p className={styles.cardText}>{sala.coordenador}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaUsers className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Crismandos</h3>
                                    <p className={styles.cardText}>{sala.numeroAlunos} alunos</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaCalendarAlt className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Horário</h3>
                                    <p className={styles.cardText}>{sala.horario}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaMapMarkerAlt className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Local</h3>
                                    <p className={styles.cardText}>{sala.local}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaPhone className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Telefone</h3>
                                    <p className={styles.cardText}>{sala.contato.telefone}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <FaEnvelope className={styles.cardIcon} />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>E-mail</h3>
                                    <p className={styles.cardText}>{sala.contato.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.crismandosSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Crismandos da Sala</h2>
                            <div className={styles.statusBadge}>
                                <span className={`${styles.status} ${sala.status === 'Ativa' ? styles.statusAtiva : styles.statusPausada}`}>
                                    {sala.status}
                                </span>
                            </div>
                        </div>

                        <div className={styles.crismandosGrid}>
                            {crismandos.map((crismando) => (
                                <div key={crismando.id} className={styles.crismandoCard}>
                                    <div className={styles.crismandoHeader}>
                                        <HiAcademicCap className={styles.crismandoIcon} />
                                        <h3 className={styles.crismandoNome}>{crismando.nome}</h3>
                                    </div>

                                    <div className={styles.crismandoInfo}>
                                        <div className={styles.crismandoItem}>
                                            <FaBirthdayCake className={styles.itemIcon} />
                                            <span className={styles.itemLabel}>Idade:</span>
                                            <span className={styles.itemValue}>{crismando.idade} anos</span>
                                        </div>

                                        <div className={styles.crismandoItem}>
                                            <FaIdCard className={styles.itemIcon} />
                                            <span className={styles.itemLabel}>Nascimento:</span>
                                            <span className={styles.itemValue}>{crismando.nascimento}</span>
                                        </div>

                                        <div className={styles.crismandoItem}>
                                            <FaPhone className={styles.itemIcon} />
                                            <span className={styles.itemLabel}>Telefone:</span>
                                            <span className={styles.itemValue}>{crismando.telefone}</span>
                                        </div>

                                        <div className={styles.crismandoItem}>
                                            <FaEnvelope className={styles.itemIcon} />
                                            <span className={styles.itemLabel}>E-mail:</span>
                                            <span className={styles.itemValue}>{crismando.email}</span>
                                        </div>

                                        <div className={styles.crismandoItem}>
                                            <FaMapMarkerAlt className={styles.itemIcon} />
                                            <span className={styles.itemLabel}>Endereço:</span>
                                            <span className={styles.itemValue}>{crismando.endereco}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

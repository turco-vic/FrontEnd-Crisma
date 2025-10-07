"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from './Categoria.module.css';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { FaUsers, FaChalkboardTeacher, FaCalendarAlt, FaArrowRight, FaArrowLeft, FaSearch } from 'react-icons/fa';
import { HiUserGroup, HiAcademicCap } from 'react-icons/hi';
import axios from 'axios';

export default function DetalhesCategoria() {
    const router = useRouter();
    const params = useParams();
    const categoria = params.categoria;
    
    const [dados, setDados] = useState([]);
    const [dadosFiltrados, setDadosFiltrados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [titulo, setTitulo] = useState('');
    const [termoPesquisa, setTermoPesquisa] = useState('');

    const calcularIdade = (birthday) => {
        const nascimento = new Date(birthday);
        const hoje = new Date();
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        
        return idade;
    };

    const filtrarDados = (termo) => {
        if (!termo.trim()) {
            setDadosFiltrados(dados);
            return;
        }

        const termoLower = termo.toLowerCase();
        const dadosFiltrados = dados.filter(item => {
            if (categoria === 'crismandos') {
                return item.nome.toLowerCase().includes(termoLower) ||
                       item.turma.toLowerCase().includes(termoLower) ||
                       item.telefone.includes(termo) ||
                       item.email.toLowerCase().includes(termoLower);
            }
            return item.nome.toLowerCase().includes(termoLower);
        });
        
        setDadosFiltrados(dadosFiltrados);
    };

    const handlePesquisaChange = (e) => {
        const termo = e.target.value;
        setTermoPesquisa(termo);
        filtrarDados(termo);
    };

    const fetchDados = async () => {
        try {
            setLoading(true);
            setError(null);
            
            let response;
            let dadosFormatados = [];
            
            switch (categoria) {
                case 'turmas':
                case 'turmas-ativas':
                    response = await axios.get('http://localhost:3000/api/turmas');
                    const turmasData = response.data;
                    
                    if (categoria === 'turmas-ativas') {
                        dadosFormatados = turmasData.filter(turma => turma.status === 'active');
                        setTitulo('Turmas Ativas');
                    } else {
                        dadosFormatados = turmasData;
                        setTitulo('Todas as Turmas');
                    }
                    
                    dadosFormatados = await Promise.all(dadosFormatados.map(async (turma) => {
                        try {
                            const crismandosResponse = await axios.get(`http://localhost:3000/api/crismandos?turma_id=${turma.id}`);
                            const numeroCrismandos = crismandosResponse.data.length;
                            
                            return {
                                id: turma.id,
                                nome: turma.name,
                                status: turma.status === 'active' ? 'Ativa' : 'Pausada',
                                horario: formatarHorario(turma.meeting_day, turma.meeting_time),
                                ano: turma.year,
                                local: turma.classroom_location,
                                numeroCrismandos: numeroCrismandos,
                                descricao: turma.description
                            };
                        } catch (error) {
                            return {
                                id: turma.id,
                                nome: turma.name,
                                status: turma.status === 'active' ? 'Ativa' : 'Pausada',
                                horario: formatarHorario(turma.meeting_day, turma.meeting_time),
                                ano: turma.year,
                                local: turma.classroom_location,
                                numeroCrismandos: 0,
                                descricao: turma.description
                            };
                        }
                    }));
                    break;
                    
                case 'crismandos':
                    response = await axios.get('http://localhost:3000/api/crismandos');
                    const turmasResponse = await axios.get('http://localhost:3000/api/turmas');
                    const turmasMap = turmasResponse.data.reduce((acc, turma) => {
                        acc[turma.id] = turma.name;
                        return acc;
                    }, {});

                    dadosFormatados = response.data.map(crismando => ({
                        id: crismando.id,
                        nome: `${crismando.name} ${crismando.surname}`,
                        idade: calcularIdade(crismando.birthday),
                        turma: turmasMap[crismando.turma_id] || 'Sem turma',
                        turmaId: crismando.turma_id,
                        telefone: crismando.phone_number,
                        email: crismando.email,
                        endereco: `${crismando.road}, ${crismando.house_number}${crismando.complement ? ` - ${crismando.complement}` : ''}, ${crismando.neighborhood}, ${crismando.city}`,
                        responsavel: crismando.responsible_person,
                        telefoneResponsavel: crismando.responsible_person_phone,
                        instagram: crismando.instagram,
                        dataMatricula: new Date(crismando.enrollment_date).toLocaleDateString('pt-BR'),
                        status: crismando.status === 'active' ? 'Ativo' : 'Inativo'
                    }));
                    setTitulo('Todos os Crismandos');
                    break;
                    
                case 'coordenadores':
                    response = await axios.get('http://localhost:3000/api/coordenadores');
                    dadosFormatados = response.data.map(coord => ({
                        id: coord.id,
                        nome: `${coord.nome} ${coord.sobrenome}`,
                        email: coord.email,
                        telefone: coord.telefone,
                        fotoPerfil: coord.foto_perfil,
                        dataCadastro: new Date(coord.created_at).toLocaleDateString('pt-BR')
                    }));
                    setTitulo('Coordenadores');
                    break;
                    
                default:
                    setError('Categoria não encontrada');
                    return;
            }
            
            setDados(dadosFormatados);
            setDadosFiltrados(dadosFormatados);
            
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            setError('Erro ao carregar dados. Tente novamente.');
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

    const handleItemClick = (item) => {
        if (categoria === 'turmas' || categoria === 'turmas-ativas') {
            router.push(`/painel-controle/turmas/${item.id}`);
        } else if (categoria === 'crismandos' && item.turmaId) {
            router.push(`/painel-controle/turmas/${item.turmaId}/crismandos/${item.id}`);
        } else if (categoria === 'coordenadores') {
            // Por enquanto apenas log, pode implementar página de detalhes depois
            console.log('Clicou no coordenador:', item);
        }
    };

    useEffect(() => {
        setTermoPesquisa('');
        fetchDados();
    }, [categoria]);

    if (loading) {
        return (
            <>
                <Header />
                <div className={styles.container}>
                    <div className={styles.hero}>
                        <h1 className={styles.title}>Carregando...</h1>
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
                        <h1 className={styles.title}>Erro</h1>
                        <p className={styles.subtitle}>{error}</p>
                        <button 
                            onClick={() => router.back()}
                            className={styles.retryButton}
                        >
                            Voltar
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
                        onClick={() => router.back()}
                        className={styles.backButton}
                    >
                        <FaArrowLeft />
                    </button>
                    <h1 className={styles.title}>{titulo}</h1>
                    <p className={styles.subtitle}>Total de {dadosFiltrados.length} registro(s)</p>
                </div>

                {categoria === 'crismandos' && (
                    <div className={styles.searchContainer}>
                        <div className={styles.searchBox}>
                            <FaSearch className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Pesquisar crismando..."
                                value={termoPesquisa}
                                onChange={handlePesquisaChange}
                                className={styles.searchInput}
                            />
                        </div>
                    </div>
                )}

                <div className={styles.content}>
                    {dadosFiltrados.length === 0 ? (
                        <div className={styles.noData}>
                            <p>{termoPesquisa ? 'Nenhum resultado encontrado para sua pesquisa.' : 'Nenhum registro encontrado.'}</p>
                        </div>
                    ) : (
                        <div className={styles.detalhesGrid} data-categoria={categoria}>
                            {dadosFiltrados.map((item) => {
                                const isClickable = categoria === 'turmas' || categoria === 'turmas-ativas' || categoria === 'crismandos' || categoria === 'coordenadores';
                                const cardClasses = isClickable 
                                    ? `${styles.detalheCard} ${styles.clickableCard}` 
                                    : styles.detalheCard;
                                
                                return (
                                    <div
                                        key={item.id}
                                        className={cardClasses}
                                        data-categoria={categoria}
                                        onClick={() => handleItemClick(item)}
                                    >
                                    <div className={styles.cardHeader}>
                                        <h3 className={styles.cardTitle}>{item.nome}</h3>
                                        {item.status && (
                                            <span className={
                                                item.status === 'Ativa' || item.status === 'Ativo' 
                                                    ? `${styles.statusBadge} ${styles.statusAtiva}`
                                                    : `${styles.statusBadge} ${styles.statusPausada}`
                                            }>
                                                {item.status}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className={styles.cardContent}>
                                        {categoria === 'turmas' || categoria === 'turmas-ativas' ? (
                                            <>
                                                <p><strong>Horário:</strong> {item.horario}</p>
                                                <p><strong>Ano:</strong> {item.ano}</p>
                                                <p><strong>Local:</strong> {item.local}</p>
                                            </>
                                        ) : categoria === 'crismandos' ? (
                                            <>
                                                <p><strong>Idade:</strong> {item.idade} anos</p>
                                                <p><strong>Turma:</strong> {item.turma}</p>
                                                <p><strong>Telefone:</strong> {item.telefone}</p>
                                            </>
                                        ) : categoria === 'coordenadores' ? (
                                            <>
                                                <p><strong>Email:</strong> {item.email}</p>
                                                <p><strong>Telefone:</strong> {item.telefone}</p>
                                                <p><strong>Cadastro:</strong> {item.dataCadastro}</p> 
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

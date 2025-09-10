"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import styles from "./Saibamaisevento.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { 
  HiCalendar, 
  HiClock, 
  HiLocationMarker, 
  HiInformationCircle, 
  HiArrowLeft,
  HiPhone,
  HiPhotograph
} from 'react-icons/hi';
import { FaChurch, FaInstagram } from 'react-icons/fa';

const eventDetails = {
  1: {
    id: 1,
    title: "Preparação para Crisma 2025",
    description: "Jornada de fé que fortalece a vida cristã dos jovens",
    date: "Fevereiro 2025 - Fevereiro 2026",
    startTime: "09h00",
    endTime: "10h30",
    location: "Paróquia Sant'Ana Sousas",
    address: "R. Siqueira Campos, 90 - Sousas, Campinas/SP",
    image: "/images/crisma-preparacao.jpg",
    about: "O Sacramento da Crisma representa um momento especial na vida cristã. Nossa preparação oferece formação sólida e significativa para jovens que desejam confirmar sua fé e receber os dons do Espírito Santo."
  },
  2: {
    id: 2,
    title: "Retiro Espiritual",
    description: "Fim de semana de reflexão e fortalecimento da fé",
    date: "05-07 de Outubro",
    startTime: "19h00 (Sexta)",
    endTime: "18h00 (Domingo)",
    location: "Casa de Retiros São Francisco", 
    address: "Estrada Municipal, Km 15 - Zona Rural, Campinas/SP",
    image: "/images/retiro-espiritual.jpg",
    about: "O Retiro Espiritual é um momento privilegiado de encontro com Deus e reflexão. Durante três dias, os participantes vivenciam experiências profundas de oração e partilha em ambiente propício ao crescimento espiritual."
  },
  3: {
    id: 3,
    title: "Celebração da Crisma",
    description: "Cerimônia solene de confirmação com presença do Bispo",
    date: "26 de Outubro",
    startTime: "10h00",
    endTime: "12h00",
    location: "Igreja Matriz Sant'Ana",
    address: "R. Siqueira Campos, 90 - Sousas, Campinas/SP",
    image: "/images/celebracao-crisma.jpg",
    about: "A Celebração da Crisma é o momento culminante do processo formativo. Nesta cerimônia solene, presidida pelo Bispo, os jovens recebem o Sacramento da Confirmação e são fortalecidos pelo Espírito Santo."
  },
  4: {
    id: 4,
    title: "Encontro de Jovens",
    description: "Momentos de partilha e formação entre jovens da comunidade",
    date: "Todo 1º Sábado do mês",
    startTime: "18h00",
    endTime: "22h30",
    location: "Salão Paroquial Sant'Ana",
    address: "R. Siqueira Campos, 90 - Sousas, Campinas/SP",
    image: "/images/encontro-jovens.jpg",
    about: "Os Encontros de Jovens são momentos especiais de convivência fraterna e formação. Destinados aos jovens da comunidade, fortalecem laços de amizade cristã e proporcionam crescimento pessoal e espiritual."
  }
};

function EventDetailsContent() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('id') || '1';
  const event = eventDetails[eventId] || eventDetails[1];

  return (
    <>
      <Header />
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <button 
              className={styles.backButton}
              onClick={() => window.history.back()}
            >
              <HiArrowLeft />
            </button>
            <div className={styles.heroText}>
              <h1 className={styles.title}>{event.title}</h1>
              <p className={styles.subtitle}>{event.description}</p>
              <div className={styles.eventMeta}>
                <div className={styles.metaItem}>
                  <HiCalendar className={styles.metaIcon} />
                  <span>{event.date}</span>
                </div>
                <div className={styles.metaItem}>
                  <HiClock className={styles.metaIcon} />
                  <span>{event.startTime}</span>
                </div>
                <div className={styles.metaItem}>
                  <HiLocationMarker className={styles.metaIcon} />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.imageSection}>
          <div className={styles.imageContainer}>
            <div className={styles.imagePlaceholder}>
              <HiPhotograph className={styles.placeholderIcon} />
              <p>Imagem do Evento</p>
              <span>({event.title})</span>
            </div>
          </div>
        </section>

        <main className={styles.content}>
          <section className={styles.section}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <HiInformationCircle className={styles.cardIcon} />
                <h2>Sobre o Evento</h2>
              </div>
              <div className={styles.cardContent}>
                <p>{event.about}</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.twoColumns}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <HiLocationMarker className={styles.cardIcon} />
                  <h2>Local e Endereço</h2>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.locationInfo}>
                    <h3>{event.location}</h3>
                    <p>{event.address}</p>
                  </div>
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <HiClock className={styles.cardIcon} />
                  <h2>Cronograma</h2>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.scheduleInfo}>
                    <div className={styles.scheduleItem}>
                      <div className={styles.scheduleLabel}>
                        <strong>Data:</strong>
                      </div>
                      <div className={styles.scheduleValue}>
                        {event.date}
                      </div>
                    </div>
                    <div className={styles.scheduleItem}>
                      <div className={styles.scheduleLabel}>
                        <strong>Início:</strong>
                      </div>
                      <div className={styles.scheduleValue}>
                        {event.startTime}
                      </div>
                    </div>
                    <div className={styles.scheduleItem}>
                      <div className={styles.scheduleLabel}>
                        <strong>Término:</strong>
                      </div>
                      <div className={styles.scheduleValue}>
                        {event.endTime}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <HiPhone className={styles.cardIcon} />
                <h2>Informações e Contato</h2>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.contactInfo}>
                  <a 
                    href="https://instagram.com/paroquia_santana_sousas" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${styles.contactItem} ${styles.instagramContainer}`}
                  >
                    <FaInstagram className={styles.contactIcon} />
                    <div>
                      <strong>Instagram:</strong>
                      <p>@paroquia_santana_sousas</p>
                    </div>
                  </a>
                  <div className={styles.contactItem}>
                    <HiLocationMarker className={styles.contactIcon} />
                    <div>
                      <strong>Secretaria Paroquial:</strong>
                      <p>Segunda a Sexta: 8h às 17h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
 
          <section className={styles.ctaSection}>
            <div className={styles.ctaCard}>
              <FaChurch className={styles.ctaIcon} />
              <h2>Interessado em participar?</h2>
              <p>Entre em contato conosco para mais informações e inscrições.</p>
              <div className={styles.ctaButtons}>
                <button 
                  className={styles.ctaButton}
                  onClick={() => window.location.href = '/contato'}
                >
                  Entre em Contato
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default function SaibaMoreEvento() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <EventDetailsContent />
    </Suspense>
  );
}

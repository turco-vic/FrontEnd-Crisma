"use client";

import styles from "./Contato.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { HiLocationMarker, HiPhone, HiMail, HiClock, HiUsers, HiHeart } from 'react-icons/hi';
import { FaChurch, FaCross } from 'react-icons/fa';

export default function Contato() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title1}>Entre em Contato</h1>
          <p className={styles.subtitle1}>
            Estamos aqui para acompanhar você em sua jornada de fé
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.mainInfo}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <FaChurch className={styles.cardIcon} />
                <h2>Paróquia Sant'Ana Sousas</h2>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.contactItem}>
                  <HiLocationMarker className={styles.icon} />
                  <div className={styles.contactText}>
                    <h3>Endereço</h3>
                    <p>R. Siqueira Campos, 90</p>
                    <p>Sousas - Campinas/SP</p>
                    <p>CEP: 13106-006</p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <HiPhone className={styles.icon} />
                  <div className={styles.contactText}>
                    <h3>Telefone</h3>
                    <p>(19) 3258-2263</p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <HiMail className={styles.icon} />
                  <div className={styles.contactText}>
                    <h3>E-mails</h3>
                    <p>crismamatrizsousas@gmail.com</p>
                    <p>santanasousas@arquidiocesecampinas.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <HiClock className={styles.cardIcon} />
                <h2>Horários da Crisma</h2>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.scheduleItem}>
                  <div className={styles.scheduleDay}>
                    <span className={styles.day}>Sábados</span>
                    <span className={styles.time}>09h00 às 10h30</span>
                  </div>
                </div>
                <div className={styles.scheduleNote}>
                  <p><strong>Importante:</strong> Compareça pontualmente aos encontros para um melhor aproveitamento da formação.</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.sideInfo}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <HiUsers className={styles.cardIcon} />
                <h2>Como Participar</h2>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.participationSteps}>
                  <div className={styles.step}>
                    <div className={styles.stepNumber}>1</div>
                    <div className={styles.stepContent}>
                      <h4>Entre em Contato</h4>
                      <p>Ligue ou envie um e-mail para se informar sobre as inscrições</p>
                    </div>
                  </div>
                  <div className={styles.step}>
                    <div className={styles.stepNumber}>2</div>
                    <div className={styles.stepContent}>
                      <h4>Faça sua Inscrição</h4>
                      <p>Compareça na paróquia com os documentos necessários</p>
                    </div>
                  </div>
                  <div className={styles.step}>
                    <div className={styles.stepNumber}>3</div>
                    <div className={styles.stepContent}>
                      <h4>Participe dos Encontros</h4>
                      <p>Compareça aos sábados para a formação</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.callToAction}>
          <HiHeart className={styles.ctaIcon} />
          <h2 className={styles.title2}>Venha fazer parte da nossa comunidade!</h2>
          <p>Entre em contato conosco e dê o próximo passo em sua caminhada cristã.</p>
          <button className={styles.ctaButton} onClick={() => window.location.href = 'tel:(19)3258-2263'}>
            Entre em Contato
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
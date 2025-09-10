"use client";
import Link from 'next/link';
import styles from './Inscreverse.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaUser, FaUserTie, FaArrowRight, FaUserPlus } from 'react-icons/fa';

export default function Inscreverse() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Escolha o Tipo de Inscrição</h1>
          <p className={styles.subtitle}>
            Selecione o tipo de inscrição adequado para continuar
          </p>
        </section>

        <main className={styles.content}>
          <div className={styles.optionsGrid}>
            
            <Link href="/inscrevercrismando" className={styles.optionCard}>
              <div className={styles.cardContent}>
                <div className={styles.cardIcon}>
                  <FaUser />
                </div>
                <h2 className={styles.cardTitle}>Inscrever-se como Crismando</h2>
                <p className={styles.cardDescription}>
                  Para jovens que desejam receber o Sacramento da Crisma.
                  Preencha seus dados pessoais, documentos e informações do responsável.
                </p>
                <div className={styles.cardFeatures}>
                  <span>• Formulário completo de inscrição</span>
                  <span>• Upload de documentos necessários</span>
                  <span>• Dados do responsável</span>
                  <span>• Criação de conta pessoal</span>
                </div>
                <div className={styles.cardAction}>
                  <span>Continuar como Crismando</span>
                  <FaArrowRight />
                </div>
              </div>
            </Link>

            <Link href="/inscrevercoordenador" className={styles.optionCard}>
              <div className={styles.cardContent}>
                <div className={styles.cardIcon}>
                  <FaUserTie />
                </div>
                <h2 className={styles.cardTitle}>Inscrever-se como Coordenador</h2>
                <p className={styles.cardDescription}>
                  Para adultos que desejam ser coordenadores na preparação dos crismandos.
                  Cadastre-se para ajudar na organização e acompanhamento.
                </p>
                <div className={styles.cardFeatures}>
                  <span>• Cadastro simplificado</span>
                  <span>• Foto de perfil</span>
                  <span>• Dados de contato</span>
                  <span>• Acesso à área de coordenação</span>
                </div>
                <div className={styles.cardAction}>
                  <span>Continuar como Coordenador</span>
                  <FaArrowRight />
                </div>
              </div>
            </Link>

          </div>

          <div className={styles.infoSection}>
            <h3 className={styles.infoTitle}>Informações Importantes</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <h4>Para Crismandos</h4>
                <p>A idade mínima para a Crisma é de 14 anos. É necessário ter recebido o Batismo e a Primeira Eucaristia.</p>
              </div>
              <div className={styles.infoCard}>
                <h4>Para Coordenadores</h4>
                <p>Pessoas interessadas em auxiliar na preparação espiritual e organizacional dos grupos de Crisma.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

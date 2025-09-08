import styles from './Home.module.css';
import Header from '../../components/Header';
import Footer from "../../components/Footer";
import CarouselComponent from '../../components/Carousel';
import { FaCross, FaHeart, FaPray, FaUsers, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { HiAcademicCap, HiLightBulb, HiSparkles } from 'react-icons/hi';

export default function Home() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Bem-vindo(a) ao site da Crisma Sousas!</h1>
          <p className={styles.subtitle}>
            Acompanhe nossos principais eventos e faça parte desta jornada de fé!
          </p>
        </div>
        
        <main className={styles.main}>
        <section className={styles.carouselSection}>
          <CarouselComponent />
        </section>

        <section className={styles.aboutSection}>
          <div className={styles.aboutHeader}>
            <FaCross className={styles.aboutIcon} />
            <h2 className={styles.aboutTitle}>Crisma Sousas</h2>
          </div>
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <p>
                Acompanhamos jovens em sua jornada de fé, 
                preparando-os para receber o Sacramento da Confirmação.
                Nossa comunidade é um espaço de crescimento espiritual, 
                onde cada jovem encontra apoio e orientação para 
                fortalecer sua relação com Deus.
              </p>
              <p>
                Nossa missão é fortalecer a comunidade cristã através 
                da formação espiritual e do testemunho de vida.
                Acreditamos que a Crisma não é apenas um sacramento a ser recebido,
                mas um comprometimento contínuo com os valores cristãos e 
                com o serviço ao próximo.
              </p>
              <p>
                Através de encontros dinâmicos, reflexões profundas e 
                experiências comunitárias, preparamos nossos jovens para 
                se tornarem verdadeiros discípulos missionários,
                prontos para levar a Boa Nova ao mundo.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.featuresSection}>
          <h2 className={styles.featuresTitle}>O que oferecemos</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <HiAcademicCap className={styles.featureIcon} />
              <h3>Formação Espiritual</h3>
              <p>Encontros semanais com reflexões bíblicas e ensinamentos da Igreja</p>
            </div>
            <div className={styles.featureCard}>
              <FaUsers className={styles.featureIcon} />
              <h3>Comunidade</h3>
              <p>Ambiente acolhedor onde jovens compartilham experiências e crescem juntos</p>
            </div>
            <div className={styles.featureCard}>
              <FaPray className={styles.featureIcon} />
              <h3>Vida de Oração</h3>
              <p>Momentos de oração, adoração e fortalecimento da vida espiritual</p>
            </div>
            <div className={styles.featureCard}>
              <HiSparkles className={styles.featureIcon} />
              <h3>Atividades Especiais</h3>
              <p>Retiros, missas especiais e eventos que marcam a caminhada</p>
            </div>
            <div className={styles.featureCard}>
              <FaHeart className={styles.featureIcon} />
              <h3>Serviço ao Próximo</h3>
              <p>Projetos sociais e ações solidárias que colocam a fé em prática</p>
            </div>
            <div className={styles.featureCard}>
              <HiLightBulb className={styles.featureIcon} />
              <h3>Preparação para a Vida</h3>
              <p>Orientações práticas para viver os valores cristãos no dia a dia</p>
            </div>
          </div>
        </section>

        <section className={styles.joinSection}>
          <div className={styles.joinContent}>
            <h2 className={styles.joinTitle}>Venha fazer parte!</h2>
            <p className={styles.joinText}>
              Se você tem entre 14 e 17 anos e deseja se preparar para receber 
              o Sacramento da Confirmação, venha conhecer nossa comunidade.
            </p>
            <div className={styles.joinInfo}>
              <div className={styles.joinItem}>
                <FaCalendarAlt className={styles.joinIcon} />
                <span>Encontros aos sábados, das 09h00 às 10h30</span>
              </div>
              <div className={styles.joinItem}>
                <FaMapMarkerAlt className={styles.joinIcon} />
                <span>Paróquia Sant'Ana Sousas</span>
              </div>
            </div>
            <a href="/contato" className={styles.joinButton}>
              Entre em Contato
            </a>
          </div>
        </section>
        </main>
      </div>
      <Footer />
    </>
  );
}  

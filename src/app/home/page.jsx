import styles from './Home.module.css';
import Header from '../../components/Header';
import Footer from "../../components/Footer";
import CarouselComponent from '../../components/Carousel';

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Bem-vindos ao site Crisma Sousas!</h1>
          <p className={styles.subtitle}>
            Acompanhe nossos principais eventos e faça parte desta jornada de fé!
          </p>
        </section>
        
        <section className={styles.carouselSection}>
          <CarouselComponent />
        </section>
      </main>
      <Footer />
    </div>
  );
}  

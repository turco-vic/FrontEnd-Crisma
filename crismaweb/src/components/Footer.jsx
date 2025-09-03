import styles from '../styles/Footer.module.css';
import { HiLocationMarker, HiPhone, HiMail, HiClock } from 'react-icons/hi';

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Contato</h3>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <HiLocationMarker className={styles.icon} />
              <div className={styles.contactText}>
                <p>Paróquia Sant'Ana Sousas</p>
                <p>R. Siqueira Campos, 90</p>
                <p>Sousas - Campinas/SP</p>
                <p>CEP: 13106-006</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <HiPhone className={styles.icon} />
              <div className={styles.contactText}>
                <p>(19) 3258-2263</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <HiMail className={styles.icon} />
              <div className={styles.contactText}>
                <p>crismamatrizsousas@gmail.com</p>
                <p>santanasousas@arquidiocesecampinas.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Horários da Crisma</h3>
          <div className={styles.scheduleInfo}>
            <div className={styles.scheduleItem}>
              <HiClock className={styles.icon} />
              <div className={styles.scheduleText}>
                <div className={styles.scheduleDay}>
                  <strong>Sábados</strong>
                  <span>09h00 às 10h30</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Crisma Sousas</h3>
          <div className={styles.aboutText}>
            <p>
              Acompanhamos jovens em sua jornada de fé, 
              preparando-os para receber o Sacramento da Confirmação.
            </p>
            <p>
              Nossa missão é fortalecer a comunidade cristã através 
              da formação espiritual e do testemunho de vida.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomContent}>
          <p>&copy; 2025 Paróquia Sant'Ana Sousas - Todos os direitos reservados</p>
          <p>Desenvolvido por Enzo Turcovic</p>
        </div>
      </div>
    </footer>
  );
}

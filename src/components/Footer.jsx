import styles from '../styles/Footer.module.css';
import { FaInstagram, FaFacebook, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { HiClock, HiHeart } from 'react-icons/hi';

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Siga-nos nas Redes Sociais</h3>
          <div className={styles.socialInfo}>
            <p className={styles.socialDescription}>
              Acompanhe nossos momentos especiais, reflexões e 
              atividades da comunidade Crisma Sousas.
            </p>
            <div className={styles.socialLinks}>
              <a 
                href="https://instagram.com/crismasousas" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <FaInstagram className={styles.socialIcon} />
                <span>@crismasousas</span>
              </a>
              <a 
                href="mailto:crismamatrizsousas@gmail.com" 
                className={styles.socialLink}
              >
                <FaEnvelope className={styles.socialIcon} />
                <span>E-mail</span>
              </a>
              <a 
                href="https://wa.me/5519982634578" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <FaWhatsapp className={styles.socialIcon} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Informações Úteis</h3>
          <div className={styles.infoContainer}>
            <div className={styles.infoItem}>
              <HiClock className={styles.infoIcon} />
              <div className={styles.infoText}>
                <strong>Encontros da Crisma</strong>
                <span>Sábados, 09h00 às 10h30</span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <HiHeart className={styles.infoIcon} />
              <div className={styles.infoText}>
                <strong>Idade para participar</strong>
                <span>14 a 17 anos</span>
              </div>
            </div>
            <div className={styles.quickAction}>
              <p>Quer participar? <a href="/contato" className={styles.contactLink}>Entre em contato</a></p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomContent}>
          <p>&copy; 2025 Paróquia Sant'Ana Sousas - Todos os direitos reservados</p>
          <p className={styles.developerText}>
            Desenvolvido por Enzo Turcovic 
            <a 
              href="https://instagram.com/turco.vic" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.instagramLink}
            >
              <FaInstagram className={styles.instagramIcon} />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

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
                href="https://wa.me/5519981853201" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <FaWhatsapp className={styles.socialIcon} />
                <span>WhatsApp</span>
              </a>
            </div>
            
            <div className={styles.quickLinksContainer}>
              <div className={styles.quickLinks}>
                <a href="/" className={styles.quickLink}>Home</a>
                <a href="/sobre" className={styles.quickLink}>Login</a>
                <a href="/inscreverse" className={styles.quickLink}>Inscrever-se</a>
                <a href="/contato" className={styles.quickLink}>Contato</a>
                <a href="/sobre" className={styles.quickLink}>Sobre</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.callToAction}>
        <div className={styles.ctaContent}>
          <HiHeart className={styles.ctaIcon} />
          <p>Quer participar? <a href="/inscreverse" className={styles.contactLink}>Inscreva-se</a></p>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomContent}>
          <p>&copy; 2025 Paróquia Sant'Ana Sousas - Todos os direitos reservados</p>
          <p className={styles.developerText}>
            <a 
              href="https://instagram.com/turco.vic" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.developerLink}
            >
              Desenvolvido por Enzo Turcovic 
              <FaInstagram className={styles.instagramIcon} />
              <span>@turco.vic</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

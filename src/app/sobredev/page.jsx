"use client";
import styles from './Sobredev.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaUser, FaGraduationCap, FaCode, FaLinkedin, FaGithub, FaEnvelope, FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaInstagram } from 'react-icons/fa';
import { SiJavascript, SiNextdotjs, SiTailwindcss, SiPostgresql, SiVercel } from 'react-icons/si';
import Image from 'next/image';

export default function SobreDev() {
  return (
    <>
      <Header />
      <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroIcon}>
          <FaUser />
        </div>
        <h1 className={styles.title}>Sobre o Desenvolvedor</h1>
        <p className={styles.subtitle}>
          Conheça a pessoa por trás do desenvolvimento deste projeto
        </p>
      </section>

      <main className={styles.content}>
        <section className={styles.section}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <FaUser className={styles.cardIcon} />
              <h2>Apresentação</h2>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.profileInfo}>
                <div className={styles.profilePhoto}>
                      <Image 
                        src="/images/profile/perfil7.jpg" 
                        alt="Foto de Enzo Turcovic" 
                        width={192} 
                        height={192}
                        className={styles.profileImage}
                      />
                </div>
                <div className={styles.profileText}>
                  <h3>Enzo Turcovic</h3>
                  <p className={styles.role}>Desenvolvedor</p>
                  <p>
                    Estudante apaixonado por tecnologia e desenvolvimento web, com foco em criar 
                    experiências digitais significativas e funcionais. Este projeto foi desenvolvido 
                    como parte do meu aprendizado em React e Next.js, combinando conhecimentos 
                    técnicos com valores cristãos.
                  </p>
                  <p>
                    Acredito que a tecnologia pode ser uma ferramenta poderosa para conectar pessoas 
                    e fortalecer comunidades, especialmente quando aplicada a causas que fazem 
                    diferença na vida das pessoas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <FaGraduationCap className={styles.cardIcon} />
              <h2>Formação</h2>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.educationList}>
                <div className={styles.educationItem}>
                  <div className={styles.educationIcon}>
                    <FaGraduationCap />
                  </div>
                  <div className={styles.educationContent}>
                    <h4>Desenvolvimento de Sistemas</h4>
                    <p className={styles.institution}>Curso Técnico - SENAI Valinhos</p>
                    <p className={styles.description}>
                      Formação técnica focada em desenvolvimento de software, 
                      programação e tecnologias web modernas.
                    </p>
                  </div>
                </div>
                <div className={styles.educationItem}>
                  <div className={styles.educationIcon}>
                    <FaCode />
                  </div>
                  <div className={styles.educationContent}>
                    <h4>Desenvolvimento Web</h4>
                    <p className={styles.institution}>Estudos Autodidatas</p>
                    <p className={styles.description}>
                      Aprendizado contínuo em tecnologias front-end, incluindo 
                      React, Next.js, JavaScript e CSS moderno.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <FaCode className={styles.cardIcon} />
              <h2>Tecnologias</h2>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.techGrid}>
                <div className={styles.techCategory}>
                  <h4>Frontend</h4>
                  <div className={styles.techList}>
                    <div className={styles.techItem}>
                      <SiJavascript className={styles.techIcon} />
                      <span>JavaScript</span>
                    </div>
                    <div className={styles.techItem}>
                      <FaReact className={styles.techIcon} />
                      <span>React</span>
                    </div>
                    <div className={styles.techItem}>
                      <SiNextdotjs className={styles.techIcon} />
                      <span>Next.js</span>
                    </div>
                    <div className={styles.techItem}>
                      <SiTailwindcss className={styles.techIcon} />
                      <span>CSS Modules</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.techCategory}>
                  <h4>Backend</h4>
                  <div className={styles.techList}>
                    <div className={styles.techItem}>
                      <FaNodeJs className={styles.techIcon} />
                      <span>Node.js</span>
                    </div>
                    <div className={styles.techItem}>
                      <SiPostgresql className={styles.techIcon} />
                      <span>PostgreSQL</span>
                    </div>
                    <div className={styles.techItem}>
                      <FaDatabase className={styles.techIcon} />
                      <span>APIs REST</span>
                    </div>
                  </div>
                </div>

                <div className={styles.techCategory}>
                  <h4>Ferramentas</h4>
                  <div className={styles.techList}>
                    <div className={styles.techItem}>
                      <FaGitAlt className={styles.techIcon} />
                      <span>Git</span>
                    </div>
                    <div className={styles.techItem}>
                      <SiVercel className={styles.techIcon} />
                      <span>Vercel</span>
                    </div>
                    <div className={styles.techItem}>
                      <FaCode className={styles.techIcon} />
                      <span>VS Code</span>
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
              <FaCode className={styles.cardIcon} />
              <h2>Sobre este Projeto</h2>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.projectInfo}>
                <p>
                  Este site foi desenvolvido como um projeto real para demonstrar conhecimentos 
                  em desenvolvimento web moderno, utilizando React e Next.js. O projeto combina:
                </p>
                <ul className={styles.projectFeatures}>
                  <li>Design responsivo e moderno</li>
                  <li>Componentização com React</li>
                  <li>Roteamento dinâmico do Next.js</li>
                  <li>CSS Modules para estilização</li>
                  <li>Ícones da React Icons</li>
                  <li>Animações e transições suaves</li>
                  <li>Otimização para SEO</li>
                  <li>Acessibilidade web</li>
                </ul>
                <p>
                  O tema escolhido reflete meus valores pessoais e a importância da fé na 
                  minha jornada como desenvolvedor, mostrando que tecnologia e espiritualidade 
                  podem caminhar juntas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.callToAction}>
            <div className={styles.ctaIcon}>
              <FaEnvelope />
            </div>
            <h2 className={styles.ctaTitle}>Vamos Conversar?</h2>
            <p className={styles.ctaText}>
              Estou sempre aberto a novas oportunidades, colaborações e 
              conversas sobre tecnologia e desenvolvimento web.
            </p>
            <div className={styles.contactLinks}>
              <button 
                className={styles.contactLink}
                onClick={() => {
                  navigator.clipboard.writeText('enzoturcovic@gmail.com').then(() => {
                    alert('Email copiado para a área de transferência!\n\nEmail: enzoturcovic@gmail.com\n\nVocê pode colar em seu cliente de email favorito.');
                  }).catch(() => {
                    alert('Email: enzoturcovic@gmail.com\n\nPor favor, copie este email manualmente.');
                  });
                }}
                title="Copiar email: enzoturcovic@gmail.com"
              >
                <FaEnvelope className={styles.contactIcon} />
                <span>Email</span>
              </button>
              <a href="https://www.linkedin.com/in/enzo-alves-turcovic-10b7ab201/" className={styles.contactLink} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className={styles.contactIcon} />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/turco-vic" className={styles.contactLink} target="_blank" rel="noopener noreferrer">
                <FaGithub className={styles.contactIcon} />
                <span>GitHub</span>
              </a>
              <a href="https://www.instagram.com/turco.vic/?next=%2F" className={styles.contactLink} target="_blank" rel="noopener noreferrer">
                <FaInstagram className={styles.contactIcon} />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
    <Footer />
    </>
  );
}
